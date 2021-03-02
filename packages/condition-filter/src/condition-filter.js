import ElButton from 'setaria-ui/packages/button';
import ElCollapseTransition from 'setaria-ui/src/transitions/collapse-transition';
import ElDivider from 'setaria-ui/packages/divider';
import ElForm from 'setaria-ui/packages/form';
import ElIcon from 'setaria-ui/packages/icon';
import ElRadioGroup from 'setaria-ui/packages/radio-group';
import ElRadioButton from 'setaria-ui/packages/radio-button';
import ElTagSelect from 'setaria-ui/packages/tag-select';
import ElTagSelectItem from 'setaria-ui/packages/tag-select-item';
import ElTooltip from 'setaria-ui/packages/tooltip';
import ElJsonForm from 'setaria-ui/packages/json-form';
import { arrayFind, arrayFindIndex, coerceTruthyValueToArray } from 'setaria-ui/src/utils/util';

export default {
  name: 'ElConditionFilter',

  componentName: 'ElConditionFilter',

  components: {
    ElButton,
    ElCollapseTransition,
    ElDivider,
    ElForm,
    ElIcon,
    ElRadioGroup,
    ElRadioButton,
    ElTagSelect,
    ElTagSelectItem,
    ElTooltip,
    ElJsonForm
  },

  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    value: {
      required: true,
      type: Object,
      default() {
        return {};
      }
    },
    expand: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Object,
      default() {
        return null;
      }
    },
    showSeniorConditionResult: {
      type: Boolean,
      default: true
    },
    showControlButton: {
      type: Boolean,
      default: true
    },
    columns: Number,
    schema: {
      type: Object
    },
    uiSchema: {
      type: Object,
      default() {
        return {
        };
      }
    }
  },

  data() {
    return {
      quickConditionValue: '',
      seniorConditionValue: {},
      seniorConditionValidateMessage: {},
      innerExpand: true
    };
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        const v = val === undefined || val === null ? {} : val;
        const { quickCondition, seniorCondition } = v;
        this.quickConditionValue =
          quickCondition === undefined || quickCondition === null ? [] : quickCondition;
        this.seniorConditionValue =
          seniorCondition === undefined || seniorCondition === null ? [] : seniorCondition;
      }
    },
    quickConditionValue: {
      handler(val) {
        this.emitValue();
      }
    },
    seniorConditionValue: {
      deep: true,
      handler(val) {
        this.emitValue();
      }
    },
    expand: {
      immediate: true,
      handler(val) {
        this.reactExpand(val);
      }
    }
  },

  methods: {
    reactExpand(val) {
      const { quickCondition = [], seniorCondition = {} } = this.data;
      const { multipleCondition = [] } = seniorCondition;
      // 没有设置快捷筛选项目和条件筛选多选项目的场合，不允许收起条件筛选区域
      if (quickCondition.length === 0 && multipleCondition.length === 0) {
        this.innerExpand = true;
      } else if (typeof val === 'boolean') {
        this.innerExpand = val;
      }
    },
    handleQuickConditionChange(val) {
      this.quickConditionValue = val;
      // 在emit-value后触发事件，便于在对应触发的事件函数中可以取到最新的v-model值
      this.$nextTick(() => {
        this.$emit('quick-search', val);
      });
    },
    handleExpand() {
      this.innerExpand = !this.innerExpand;
      this.$emit('update:expand', this.innerExpand);
    },
    handleMultipleConditionChange(name) {
      return (val) => {
        let currentTagValue = [];
        // TODO TagSelect存在问题，会返回值为null的元素
        if (val && val.length > 0) {
          currentTagValue = val.filter(item => item !== null);
        }
        if (this.seniorConditionValue[name] === undefined ||
          this.seniorConditionValue[name] === null) {
          this.$set(this.seniorConditionValue, name, currentTagValue);
        } else {
          this.seniorConditionValue[name] = {};
          this.seniorConditionValue[name] = currentTagValue;
        }
      };
    },
    handleClear() {
      const seniorConditionKeys = [];
      // 必须输入的查询项目key-value数组
      const requiredConditionValueObjects = [];
      // 保存必须输入项目的值不变且取得需要清除的项目key数组
      this.$refs.seniorConditionForm.fields.forEach(field => {
        if (field.isRequired) {
          requiredConditionValueObjects.push({
            key: field.prop,
            value: this.seniorConditionValue[field.prop]
          });
        } else {
          seniorConditionKeys.push(field.prop);
        }
      });
      // 清空条件筛选中表单项目的值
      this.$refs.seniorConditionForm.resetFields();
      this.$nextTick(() => {
        // 必须输入的查询项目值不允许被清空
        if (requiredConditionValueObjects.length > 0) {
          requiredConditionValueObjects.forEach(item => {
            this.seniorConditionValue[item.key] = item.value;
          });
        }
      });
      // 清空多选条件的值
      Object.keys(this.seniorConditionValue).forEach(key => {
        const { seniorCondition = {} } = this.data;
        const { multipleCondition = {} } = seniorCondition;
        const index = arrayFindIndex(Object.keys(multipleCondition), conditionKey => {
          return conditionKey === key;
        });
        // 必须输入的多选条件不允许被清空
        if (index !== -1 && multipleCondition[key].required !== true) {
          seniorConditionKeys.push(key);
          this.seniorConditionValue[key] = [];
        }
      });
      // 触发clear事件
      this.$nextTick(() => {
        this.$emit('clear', seniorConditionKeys);
      });
    },
    /**
     * @public
     */
    search() {
      this.handleSearch();
    },
    handleSearch() {
      const { seniorConditionValue } = this;
      this.validate().then(() => {
        this.quickConditionValue = '';
        // 在emit-value后触发事件，便于在对应触发的事件函数中可以取到最新的v-model值
        this.$nextTick(() => {
          this.$emit('senior-search', seniorConditionValue);
        });
      });
    },
    handleFormKeyUp(event) {
      if (event.key && event.key.toLowerCase() === 'enter') {
        this.handleSearch();
        event.preventDefault();
        event.stopPropagation();
      }
    },
    validate() {
      return new window.Promise((resolve, reject) => {
        let ret = true;
        const { seniorCondition = {} } = this.data;
        const { multipleCondition } = seniorCondition;
        if (multipleCondition) {
          const { seniorConditionValidateMessage } = this;
          Object.keys(multipleCondition).forEach(conditionKey => {
            if (multipleCondition[conditionKey].required) {
              const conditionValue = this.seniorConditionValue[conditionKey];
              if (conditionValue === undefined ||
                  conditionValue === null ||
                  conditionValue === '' ||
                  (conditionValue && conditionValue.length === 0)) {
                seniorConditionValidateMessage[conditionKey] = `请选择${multipleCondition[conditionKey].label}`;
                ret = false;
              } else {
                seniorConditionValidateMessage[conditionKey] = null;
              }
            }
          });
          this.seniorConditionValidateMessage = {};
          this.seniorConditionValidateMessage = seniorConditionValidateMessage;
        }

        if (!ret) {
          reject();
        }
        this.$refs.seniorConditionForm.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    /**
     * 清空指定条件筛选结果项目
     *
     * @param {*} key
     * @param {*} value
     * @returns
     */
    handleItemClose(key, value) {
      return (event) => {
        let isCleared = false;
        const conditionObj = this.seniorConditionValue[key];
        if (conditionObj === undefined || conditionObj === null) {
          return;
        }
        // 筛选项目的值为数组的场合
        if (Array.isArray(conditionObj)) {
          const index = arrayFindIndex(coerceTruthyValueToArray(conditionObj), v => v === value);
          if (index !== -1) {
            conditionObj.splice(index, 1);
            isCleared = true;
          }
        }
        // 为其他类型的场合
        // 某些组件的值虽然为数组类型，但是显示值为单一值(Cascader)
        const componentName = this.getSeniorConditionFormItemComponentName(key);
        if (isCleared === false) {
          // 数字输入框的场合
          if (componentName === 'ElInputNumber') {
            // 保证清空后输入框不为0
            this.seniorConditionValue[key] = undefined;
          } else {
            this.seniorConditionValue[key] = null;
          }
        }
        this.$nextTick(() => {
          this.$emit('clear', [ key ]);
        });
      };
    },
    getSeniorConditionFormItemComponentName(key) {
      const fields = this.$refs.seniorConditionForm.fields;
      if (fields) {
        // FormItem组件
        const item = arrayFind(coerceTruthyValueToArray(fields), component => component.prop === key);
        if (item && item.$children && item.$children[0].$options) {
          // 子组件名称
          return item.$children[0].$options.componentName;
        }
      }
      return null;
    },
    emitValue() {
      const { quickConditionValue, seniorConditionValue } = this;
      const current = {
        quickCondition: quickConditionValue,
        seniorCondition: seniorConditionValue
      };
      this.$emit('input', current);
      this.$emit('change', current);
    },
    /**
     * 根据快捷筛选设置进行快捷筛选部分的渲染
     */
    renderQuickCondition(h, config) {
      return config.map((item, index) => {
        const radioButton = (
          <ElRadioButton label={item.value}
            style={{'margin-right': '10px', 'margin-left': '0px'}}>{item.label}</ElRadioButton>
        );
        if (item.tooltip && item.tooltip !== '') {
          return (
            <ElTooltip content={item.tooltip} placement="top">
              { radioButton }
            </ElTooltip>
          );
        }
        return radioButton;
      });
    },
    /**
     * 根据条件筛选多选选项设置进行条件筛选多选项目的渲染
     */
    renderSeniorMultipleCondition(h, config) {
      const {
        handleMultipleConditionChange,
        seniorConditionValue = {},
        seniorConditionValidateMessage
      } = this;
      return Object.keys(config).map(key => {
        const item = config[key];
        const { label, data = [], required } = item;
        const tagSelectItemList = data.map(tagSelectItem =>
          (
            <ElTagSelectItem
              label={tagSelectItem.value}
              tooltip={tagSelectItem.tooltip}>
              {tagSelectItem.label}
            </ElTagSelectItem>
          )
        );
        return (
          <div class={[
            'senior-multiple-condition',
            required ? 'is-required' : ''
          ]}>
            <label class="senior-multiple-condition__label">{label}：</label>
            <div class="senior-multiple-condition__item">
              <ElTagSelect value={seniorConditionValue[key]}
                onInput={handleMultipleConditionChange(key)}>
                { tagSelectItemList }
              </ElTagSelect>
              {
                seniorConditionValidateMessage[key] ? (
                  <div class="item-error">
                    { seniorConditionValidateMessage[key] }
                  </div>
                ) : ''
              }
            </div>
          </div>
        );
      });
    },
    /**
     * 渲染允许多选值的条件筛选Label
     */
    renderMultipleLabelItem(h, key, label, value, isLastChild, isRequired) {
      return (
        <div class="item-value">
          <span>{label}</span>
          { !isRequired ? <i class="value-clear-icon el-icon-close" name="close" onClick={this.handleItemClose(key, value)}></i> : null }
          { isLastChild ? <ElDivider direction="vertical"></ElDivider> : null }
        </div>
      );
    },
    /**
     * 渲染当前输入的条件筛选项目值
     */
    renderSeniorConditionResultItem(h, key, value, config) {
      const { multipleCondition = {} } = config;
      let ret = null;
      let item = null;
      let valueList = null;
      // 多选条件的场合
      if (multipleCondition[key]) {
        const itemValue = value || [];
        if (Array.isArray(itemValue) && itemValue.length === 0) {
          return null;
        }
        item = multipleCondition[key];
        valueList = itemValue.map((v, index) => {
          const conditionObj = arrayFind(item.data, ({value}) => value === v);
          if (conditionObj === undefined || conditionObj === null) {
            return '';
          }
          return this.renderMultipleLabelItem(h, key, conditionObj.label, v, index !== value.length - 1, item.required);
        });
        ret = (
          <div class="senior-result__item is-array">
            <span class="item-label">{item.label}：</span>
            { valueList }
          </div>
        );
      // 其他条件的场合
      } else if (this.$refs.seniorConditionForm) {
        const fields = this.$refs.seniorConditionForm.fields;
        // FormItem组件
        item = arrayFind(coerceTruthyValueToArray(fields), component => component.prop === key);
        if (item) {
          if (Array.isArray(value) && value.length === 0) {
            return null;
          }
          if (item.$children) {
            const formItemComponent = item.$children.length > 1 ? item.$children[1] : item.$children[0];
            const childComponentName = formItemComponent.$options.componentName;
            // 可以多选的组件，排除级联选择器
            if (Array.isArray(value) && value.length > 0 &&
              childComponentName !== 'ElCascader' &&
              childComponentName !== 'ElDatePicker') {
              const itemValue = value || [];
              let valueList = null;
              // 可以多选的选择器(ElSelect)
              if (childComponentName === 'ElSelect') {
                valueList = itemValue.map((v, index) => {
                  const label = formItemComponent.getOption(v).label;
                  if (label && label !== '') {
                    return this.renderMultipleLabelItem(h, key, label, v, index !== itemValue.length - 1, item.isRequired);
                  }
                });
              }
              ret = (
                <div class="senior-result__item is-array">
                  <span class="item-label">{item.label}：</span>
                  { valueList }
                </div>
              );
            } else {
              let displayValue = value;
              // 选择器
              if (childComponentName === 'ElSelect') {
                displayValue = formItemComponent.getOption(value).label;
              // 级联选择器
              } else if (childComponentName === 'ElCascader') {
                displayValue = formItemComponent.presentText;
              } else if (childComponentName === 'ElDatePicker') {
                const currentValue = formItemComponent.value;
                if (typeof currentValue === 'string') {
                  displayValue = currentValue;
                } else if (Array.isArray(currentValue)) {
                  displayValue = currentValue.length > 0 ? currentValue.join(' - ') : '';
                }
              // 单选框
              } else if (childComponentName === 'ElRadioGroup') {
                if (formItemComponent.$children) {
                  formItemComponent.$children.forEach(radio => {
                    if (radio.model === radio.label) {
                      displayValue = radio.getDisplayLabel();
                    }
                  });
                }
              } else if (formItemComponent && typeof formItemComponent.getDisplayLabel === 'function') {
                displayValue = formItemComponent.getDisplayLabel();
              }
              if (item !== undefined && item !== null && value && value !== '') {
                ret = (
                  <div class="senior-result__item">
                    <span class="item-label">{item.label}：</span>
                    <div class="item-value">
                      <span>{displayValue}</span>
                      { !item.isRequired ? <i class="value-clear-icon el-icon-close" name="close" onClick={this.handleItemClose(key)}></i> : null }
                    </div>
                  </div>
                );
              }
            }
          }
        }
      }
      return ret;
    }
  },

  render(h) {
    const {
      columns,
      quickConditionValue,
      innerExpand,
      seniorConditionValue = {},
      showSeniorConditionResult,
      showControlButton,
      schema,
      uiSchema
    } = this;
    const { quickCondition = [], seniorCondition = {} } = this.data;
    const { multipleCondition = {} } = seniorCondition;
    // 快捷筛选
    // 快捷搜索条件选项
    const quickConditionSelectItemList = this.renderQuickCondition(h, quickCondition);
    // 条件筛选
    // 条件筛选多选选项
    const seniorMultipleConditionList = this.renderSeniorMultipleCondition(h, multipleCondition);
    // 条件筛选结果
    const seniorResultList = Object.keys(seniorConditionValue).map(key => {
      return this.renderSeniorConditionResultItem(h, key, seniorConditionValue[key], seniorCondition);
    });

    const quickConditionNode = (quickConditionSelectItemList && quickConditionSelectItemList.length > 0)
      ? (
        <div class="el-condition-filter__quick">
          <div class="quick-label">快捷搜索：</div>
          <ElRadioGroup
            class="el-condition-filter__quick-container"
            value={quickConditionValue}
            onInput={this.handleQuickConditionChange}
            size="small"
            split="5px">
            { quickConditionSelectItemList }
          </ElRadioGroup>
        </div>
      ) : null;
    // 条件筛选表单
    let conditionForm = null;
    if (schema) {
      conditionForm = (<ElJsonForm
        model={seniorConditionValue}
        label-width="auto"
        ref="seniorConditionForm"
        class="senior-condition-form"
        positionErrorField={false}
        nativeOnKeyup={this.handleFormKeyUp}
        schema={schema}
        uiSchema={uiSchema}
        columns={columns}>
      </ElJsonForm>);
    } else {
      conditionForm = (<ElForm
        model={seniorConditionValue}
        ref="seniorConditionForm"
        class="senior-condition-form"
        rules={this.rules}
        positionErrorField={false}
        nativeOnKeyup={this.handleFormKeyUp}
        labelWidth="auto">
        { this.$slots.default }
      </ElForm>);
    }
    // const isShowSeniorConditionLabel = showSeniorConditionResult || quickConditionSelectItemList.length > 0 || seniorMultipleConditionList.length > 0;
    return (
      <div class="el-condition-filter">
        { quickConditionNode }
        { quickConditionNode !== null ? <ElDivider customClass={['el-quick__divider', 'el-condition-filter__divider']}></ElDivider> : null }
        <div class="el-condition-filter__senior">
          {
            showSeniorConditionResult ? (
              <div class="senior-result">
                <div class="senior-result__label">条件搜索：</div>
                <div class="senior-result__detail">
                  {seniorResultList}
                </div>
                {
                  showSeniorConditionResult ? (
                    <a class="senior-expander" onClick={this.handleExpand}>
                      { innerExpand ? '收起' : '展开' }
                      <i class={{ 'el-icon-arrow-down': !innerExpand, 'el-icon-arrow-up': innerExpand }}></i>
                    </a>
                  ) : null
                }
              </div>
            ) : null
          }
          {/* {
            isShowSeniorConditionLabel ? (
              <ElDivider customClass={['el-condition-filter__divider']} dashed></ElDivider>
            ) : null
          } */}
          <ElCollapseTransition>
            <div v-show={innerExpand} class="el-condition-filter__senior-expand-container">
              { seniorMultipleConditionList }
              { conditionForm }
              <div class="el-condition-filter__button" v-show={showControlButton}>
                <ElButton onClick={this.handleClear} icon="el-icon-refresh-left">重置</ElButton>
                <ElButton onClick={this.handleSearch} type="primary" icon="el-icon-search">查询</ElButton>
              </div>
            </div>
          </ElCollapseTransition>
        </div>
      </div>
    );
  }
};
