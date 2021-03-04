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

const NON_INITIAL = 'nonInitial';
const INITIALED = 'initialed';

const jsonFormInitialOptions = {
  attrs: {
    labelSuffix: '：',
    labelPosition: 'left',
    labelWidth: 'auto'
  }
};

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
    columns: {
      type: Number,
      default: 3
    },
    normalSchema: Object,
    normalUiSchema: Object,
    advanceSchema: {
      type: Object
    },
    advanceUiSchema: {
      type: Object,
      default() {
        return {
        };
      }
    }
  },

  data() {
    return {
      conditionValue: {},
      conditionValidateMessage: {},
      innerExpand: false,
      conditionResultItemKey: NON_INITIAL,
      advanceConditionFormKey: NON_INITIAL
    };
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        const v = val === undefined || val === null ? {} : val;
        this.conditionValue = v === undefined || v === null ? [] : v;
      }
    },
    conditionValue: {
      handler(val) {
        this.emitValue();
      }
    }
  },

  mounted() {
    // 初始化时，需要等自组件渲染完才能从子组件取得当前选择值
    // 刷新当前搜索条件值的显示
    this.conditionResultItemKey = INITIALED;
  },

  methods: {
    handleExpand() {
      this.innerExpand = !this.innerExpand;
      this.$emit('update:expand', this.innerExpand);
      if (this.advanceConditionFormKey === NON_INITIAL) {
        this.advanceConditionFormKey = INITIALED;
      }
    },
    handleClear() {
      const seniorConditionKeys = [];
      // 必须输入的查询项目key-value数组
      const requiredConditionValueObjects = [];
      // 保存必须输入项目的值不变且取得需要清除的项目key数组
      this.$refs.advanceConditionForm.fields.forEach(field => {
        if (field.isRequired) {
          requiredConditionValueObjects.push({
            key: field.prop,
            value: this.conditionValue[field.prop]
          });
        } else {
          seniorConditionKeys.push(field.prop);
        }
      });
      // 清空条件筛选中表单项目的值
      this.$refs.advanceConditionForm.resetFields();
      this.$nextTick(() => {
        // 必须输入的查询项目值不允许被清空
        if (requiredConditionValueObjects.length > 0) {
          requiredConditionValueObjects.forEach(item => {
            this.conditionValue[item.key] = item.value;
          });
        }
      });
      // 清空多选条件的值
      Object.keys(this.conditionValue).forEach(key => {
        const { seniorCondition = {} } = this.data;
        const { multipleCondition = {} } = seniorCondition;
        const index = arrayFindIndex(Object.keys(multipleCondition), conditionKey => {
          return conditionKey === key;
        });
        // 必须输入的多选条件不允许被清空
        if (index !== -1 && multipleCondition[key].required !== true) {
          seniorConditionKeys.push(key);
          this.conditionValue[key] = [];
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
      const { conditionValue } = this;
      this.validate().then(() => {
        this.quickConditionValue = '';
        // 在emit-value后触发事件，便于在对应触发的事件函数中可以取到最新的v-model值
        this.$nextTick(() => {
          this.$emit('senior-search', conditionValue);
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
          const { conditionValidateMessage } = this;
          Object.keys(multipleCondition).forEach(conditionKey => {
            if (multipleCondition[conditionKey].required) {
              const conditionValue = this.conditionValue[conditionKey];
              if (conditionValue === undefined ||
                  conditionValue === null ||
                  conditionValue === '' ||
                  (conditionValue && conditionValue.length === 0)) {
                conditionValidateMessage[conditionKey] = `请选择${multipleCondition[conditionKey].label}`;
                ret = false;
              } else {
                conditionValidateMessage[conditionKey] = null;
              }
            }
          });
          this.conditionValidateMessage = {};
          this.conditionValidateMessage = conditionValidateMessage;
        }

        if (!ret) {
          reject();
        }
        this.$refs.advanceConditionForm.validate((valid) => {
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
        const conditionObj = this.conditionValue[key];
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
            this.conditionValue[key] = undefined;
          } else {
            this.conditionValue[key] = null;
          }
        }
        this.$nextTick(() => {
          this.$emit('clear', [ key ]);
        });
      };
    },
    getSeniorConditionFormItemComponentName(key) {
      const fields = this.$refs.advanceConditionForm.fields;
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
      const { quickConditionValue, conditionValue } = this;
      const current = {
        quickCondition: quickConditionValue,
        seniorCondition: conditionValue
      };
      this.$emit('input', current);
      this.$emit('change', current);
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
    renderConditionResultItem(h, key, value) {
      let ret = null;
      let item = null;
      let fields = [];
      if (this.$refs.normalConditionForm) {
        fields = fields.concat(this.$refs.normalConditionForm.fields);
      }
      if (this.$refs.advanceConditionForm) {
        fields = fields.concat(this.$refs.advanceConditionForm.fields);
      }
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
              <div class="query-result__item is-array">
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
                <div class="query-result__item">
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
      return ret;
    },

    /**
     * 渲染普通搜索项目
     * @param {*} schema schema
     * @param {*} uiSchema uiSchema
     * @param {*} value 值
     */
    renderNormalCondition(schema, uiSchema, advanceConditionFormKey, value) {
      if (schema) {
        return (
          <ElJsonForm
            {...jsonFormInitialOptions}
            model={value}
            key={advanceConditionFormKey}
            ref="normalConditionForm"
            class="normal-condition-form"
            positionErrorField={false}
            // nativeOnKeyup={this.handleFormKeyUp}
            schema={schema}
            uiSchema={uiSchema}
            columns={3}>
          </ElJsonForm>
        );
      }
      return null;
    },

    /**
     * 渲染搜索项目当前输入值
     * @param {*} h h
     * @param {*} conditionValue 当前查询项目的值
     */
    renderConditionResultList(h, conditionValue) {
      return Object.keys(conditionValue).map(key => {
        return this.renderConditionResultItem(h, key, conditionValue[key]);
      });
    }
  },

  render(h) {
    const {
      columns,
      $slots,
      innerExpand,
      conditionValue = {},
      showControlButton,
      normalSchema,
      normalUiSchema,
      advanceSchema,
      advanceUiSchema,
      conditionResultItemKey,
      advanceConditionFormKey,
      renderConditionResultList,
      renderNormalCondition
    } = this;
    // 普通搜索
    let normalConditionNode = $slots.normalCondition
      ? $slots.normalCondition
      : renderNormalCondition(normalSchema, normalUiSchema, advanceConditionFormKey, conditionValue);
    // 高级搜索表单
    let advanceConditionForm = null;
    if (advanceSchema) {
      advanceConditionForm = (<ElJsonForm
        {...jsonFormInitialOptions}
        model={conditionValue}
        key={advanceConditionFormKey}
        ref="advanceConditionForm"
        class="advance-condition-form"
        positionErrorField={false}
        nativeOnKeyup={this.handleFormKeyUp}
        schema={advanceSchema}
        uiSchema={advanceUiSchema}
        columns={columns}>
      </ElJsonForm>);
    } else {
      advanceConditionForm = (<ElForm
        label-position="left"
        model={conditionValue}
        ref="advanceConditionForm"
        class="advance-condition-form"
        rules={this.rules}
        positionErrorField={false}
        nativeOnKeyup={this.handleFormKeyUp}
        labelWidth="auto">
        { this.$slots.default }
      </ElForm>);
    }
    return (
      <div class="el-condition-filter">
        { normalConditionNode ? (
          <div class="el-condition-filter__normal">
            { normalConditionNode }
            <div class="normal__toolbar">
              <ElButton
                type="text"
                onClick={this.handleExpand}
                class="toolbar__expand-button">{ innerExpand ? '普通搜索' : '高级搜索' }</ElButton>
              <i class="el-icon-setting toolbar-icon" style="font-size: 18px;"></i>
            </div>
          </div>
        ) : null }
        <div class="el-condition-filter__senior">
          <div class="query-result">
            <div class="query-result__icon">
              <i class="el-icon-search"></i>
            </div>
            <div class="query-result__detail" key={conditionResultItemKey}>
              {renderConditionResultList(h, conditionValue)}
            </div>
          </div>
          <ElCollapseTransition>
            <div v-show={innerExpand} class="el-condition-filter__senior-expand-container">
              { advanceConditionForm }
              <div class="el-condition-filter__button" v-show={showControlButton}>
                <ElButton onClick={this.handleClear} icon="el-icon-refresh-left">重置</ElButton>
                <ElButton onClick={this.handleSearch} type="primary" icon="el-icon-search">搜索</ElButton>
              </div>
            </div>
          </ElCollapseTransition>
        </div>
      </div>
    );
  }
};
