import ElForm from 'setaria-ui/packages/form/src/form';
import ElFormItem from 'setaria-ui/packages/form/src/form-item';
import ElSelect from 'setaria-ui/packages/select';
import ElInput from 'setaria-ui/packages/input';

const UI_WIDGET = 'ui:widget';
const UI_OPTIONS = 'ui:options';
const CLASSNAME = 'className';
const UI_DISABLED = 'ui:disabled';

export default {
  name: 'ElDynamicForm',
  componentName: 'ElDynamicForm',
  props: {
    model: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    // 表单提交是否重载页面
    isPrevent: {
      type: Boolean,
      default: true
    },
    schema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      default() {
        return {
        };
      }
    },
    columns: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
    };
  },
  computed: {
    rules() {
      const ret = {};
      const { required = [], properties = {} } = this.schema;
      // 必须输入
      required.forEach(key => {
        const item = properties[key];
        let itemName = '';
        if (item) {
          itemName = item.title;
        }
        if (!ret[key]) {
          ret[key] = [];
        }
        ret[key].push({
          required: true,
          message: `请输入${itemName}`,
          trigger: 'blur'
        });
      });
      // 文本框长度限制&类型
      Object.keys(properties).forEach(key => {
        const item = properties[key];
        let itemName = '';
        if (item) {
          itemName = item.title;
        }
        if (item.type === 'string') {
          const rule = {
            trigger: 'blur'
          };
          const minLength = item.minLength;
          const maxLength = item.maxLength;
          if (typeof minLength === 'number') {
            rule.min = minLength;
            rule.message = `长度必须大于${minLength}个字符`;
          }
          if (typeof maxLength === 'number') {
            rule.max = maxLength;
            if (typeof minLength === 'number') {
              rule.message = `长度只能在${minLength}-${maxLength}个字符之间`;
            } else {
              rule.message = `长度必须小于${maxLength}个字符`;
            }
          }
          if (rule.message !== '' && rule.message !== undefined) {
            if (!ret[key]) {
              ret[key] = [];
            }
            ret[key].push(rule);
          }
        } else if (item.type === 'integer' || item.type === 'number') {
          let message = `${itemName}必须为数字`;
          if (item.type === 'integer') {
            message = `${itemName}必须为整数`;
          }
          if (!ret[key]) {
            ret[key] = [];
          }
          ret[key].push({
            type: item.type,
            message: message
          });
        }
      });
      return ret;
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.model);
    }
  },
  render(h) {
    const self = this;
    const formItemArray = [];
    const formEvents = {
      on: {}
    };
    formEvents.on.submit = () => {
      this.onSubmit();
    };
    if (this.schema && this.schema.properties) {
      Object.keys(this.schema.properties).forEach(key => {
        const ui = this.uiSchema[key] || {};
        const className = ui[CLASSNAME] || '';
        let componentTagName = '';
        let componentProps = {
          'class': `el-dynamic-form--component ${className}`
        };
        const componentChildren = [];
        const props = {
          value: self.model[key],
          disabled: ui[UI_DISABLED] === true
        };
        const property = self.schema.properties[key];
        const events = {
          on: {
          }
        };
        // 因render 函数中没有与 v-model 相应的 api, 实现v-model逻辑。
        events.on.input = (val) => {
          this.model[key] = val;
          this.$emit('change', key, val, self.model);
        };
        if (property.enum || property.oneOf || property.anyOf) {
          if (property.oneOf && ui[UI_WIDGET] === 'radio') {
            componentTagName = 'el-radio-group';
          } else if (property.anyOf && ui[UI_WIDGET] === 'checkbox' && property.type === 'array') {
            componentTagName = 'el-checkbox-group';
          } else {
            componentTagName = 'el-select';
            props.multiple = false;
          }
          // 取得选择项一览
          let list = null;
          if (property.oneOf) {
            list = property.oneOf;
          } else if (property.anyOf) {
            list = property.anyOf;
            if (componentTagName === 'el-select') {
              props.multiple = true;
            }
          } else {
            list = property.enum.map(e => {
              return { title: e, 'const': e };
            });
          }
          const optionList = [];
          list.forEach(item => {
            optionList.push({
              label: item.title,
              value: item.const
            });
          });
          componentProps.props = props;
          componentProps.on = events.on;
          if (componentTagName === 'el-select') {
            optionList.forEach(item => {
              componentChildren.push(h(
                'el-option',
                {
                  props: {
                    label: item.label,
                    value: item.value
                  }
                }
              ));
            });
          } else if (componentTagName === 'el-radio-group') {
            optionList.forEach(item => {
              componentChildren.push(h(
                'el-radio',
                {
                  props: {
                    label: item.value
                  }
                },
                [item.label]
              ));
            });
          } else if (componentTagName === 'el-checkbox-group') {
            optionList.forEach(item => {
              componentChildren.push(h(
                'el-checkbox',
                {
                  props: {
                    label: item.value
                  }
                },
                [item.label]
              ));
            });
          }
        } else if (property.type === 'string') {
          if (property.format === 'date' || property.format === 'date-time') {
            componentTagName = 'el-date-picker';
            events.on.input = (val) => {
              this.model[key] = val;
            };
            events.on.change = (val) => {
              this.model[key] = val;
              this.$emit('change', key, val, self.model);
            };
            props.type = 'date';
            if (property.format === 'date-time') {
              props.type = 'datetime';
            }
          } else {
            componentTagName = 'el-input';
            if (this.uiSchema !== undefined && this.uiSchema !== null) {
              const ui = this.uiSchema[key] || {};
              const widgetType = ui[UI_WIDGET];
              if (widgetType !== undefined) {
                const widgetOption = ui[UI_OPTIONS] || {};
                if (widgetType === 'password') {
                  props.type = 'password';
                } else if (widgetType === 'textarea') {
                  props.type = 'textarea';
                  if (typeof widgetOption.rows === 'number') {
                    props.rows = widgetOption.rows;
                  }
                }
              }
            }
          }
          componentProps.style = {
            width: '100%'
          };
          componentProps.props = props;
          componentProps.on = events.on;
        } else if (property.type === 'integer' || property.type === 'number') {
          events.on.input = (val) => {
            let ret = val;
            // if (property.type === 'integer') {
            //   ret = parseInt(val, 10);
            // } else {
            ret = parseFloat(val);
            // }
            if (isNaN(ret)) {
              ret = '';
            }
            this.model[key] = ret;
            this.$emit('change', key, ret, self.model);
          };
          componentTagName = 'el-input';
          componentProps.props = props;
          componentProps.on = events.on;
        }
        const formItem = h(
          'el-form-item',
          {
            'class': `el-form-item-${key}`,
            props: {
              label: property.title,
              prop: key
            }
          },
          [h(componentTagName, componentProps, componentChildren)]
        );
        formItemArray.push(formItem);
      });
    }
    const formProps = {
      model: self.model,
      rules: self.rules,
      labelPosition: self.labelPosition,
      labelWidth: self.labelWidth,
      labelSuffix: self.labelSuffix,
      inline: self.inline,
      showMessage: self.showMessage,
      isPrevent: self.isPrevent
    };
    // 自适应设置
    const rowArray = [];
    let colArray = null;
    formItemArray.forEach((formItem, index) => {
      if (colArray === null) {
        colArray = [];
      }
      const span = 24 / self.columns;
      const column = h(
        'el-col',
        {
          props: {
            lg: span,
            md: span,
            sm: span,
            xs: 24
          }
        },
        [formItem]
      );
      colArray.push(column);
      if (((index + 1) % self.columns === 0 ||
        index === formItemArray.length - 1) && index !== 0) {
        const gutter = self.labelWidth === undefined || self.labelWidth === null ? 10 : 0;
        const row = h(
          'el-row',
          {
            props: {
              gutter: gutter
            }
          },
          [...colArray]
        );
        rowArray.push(row);
        colArray = null;
      }
    });
    return h(
      'el-form',
      {
        props: formProps,
        on: formEvents.on
      },
      [...rowArray, self.$slots.button]
    );
  },
  components: {
    ElForm,
    ElFormItem,
    ElSelect,
    ElInput
  }
};
