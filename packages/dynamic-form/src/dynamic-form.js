import ElForm from 'setaria-ui/packages/form/src/form';
import ElFormItem from 'setaria-ui/packages/form/src/form-item';
import ElSelect from 'setaria-ui/packages/select';
import ElInput from 'setaria-ui/packages/input';

const UI_WIDGET = 'ui:widget';
const UI_OPTIONS = 'ui:options';

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
    uiSchema: Object
  },
  watch: {
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
    const formItemArray = [];
    const formEvents = {
      on: {}
    };
    formEvents.on.submit = () => {
      this.onSubmit();
    };
    if (this.schema && this.schema.properties) {
      Object.keys(this.schema.properties).forEach(key => {
        const property = this.schema.properties[key];
        let component = null;
        const events = {
          on: {
          }
        };
        // 因render 函数中没有与 v-model 相应的 api, 实现v-model逻辑。
        events.on.input = (val) => {
          this.model[key] = val;
        };
        if (property.enum || property.oneOf || property.anyOf) {
          const optionList = [];
          let list = null;
          let multiple = false;
          if (property.oneOf !== undefined) {
            list = property.oneOf;
          } else if (property.anyOf !== undefined) {
            list = property.anyOf;
            multiple = true;
          } else {
            list = property.enum.map(e => {
              return { title: e, 'const': e };
            });
          }
          list.forEach(item => {
            optionList.push({
              label: item.title,
              value: item.const
            });
          });
          component = <el-select class="el-dynamic-form--component" multiple={ multiple } value={ this.model[key] } {...events}>
            {
              optionList.map(o => {
                return <el-option label={ o.label } value={ o.value }></el-option>;
              })
            }
          </el-select>;
        } else if (property.type === 'string') {
          if (property.format === 'date' || property.format === 'date-time') {
            events.on.change = (val) => {
              this.model[key] = val;
            };
            let type = 'date';
            if (property.format === 'date-time') {
              type = 'datetime';
            }
            component = <el-date-picker class="el-dynamic-form--component" type={ type } value={ this.model[key] } {...events}></el-date-picker>;
          } else {
            let type = 'text';
            let options = {
              attrs: {}
            };
            if (this.uiSchema !== undefined && this.uiSchema !== null) {
              const ui = this.uiSchema[key] || {};
              const widgetType = ui[UI_WIDGET];
              if (widgetType !== undefined) {
                const widgetOption = ui[UI_OPTIONS] || {};
                if (widgetType === 'password') {
                  type = 'password';
                } else if (widgetType === 'textarea') {
                  type = 'textarea';
                  if (typeof widgetOption.rows === 'number') {
                    options.attrs.rows = widgetOption.rows;
                  }
                }
              }
            }
            component = <el-input type={ type } value={ this.model[key] } {...options} {...events}></el-input>;
          }
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
          };
          component = <el-input value={ this.model[key] } {...events}></el-input>;
          // component = <el-input-number class="el-dynamic-form--component"
          //   value={ this.model[key] }
          //   {...events}
          //   controls={ false }>
          // </el-input-number>;
        }
        formItemArray.push(<el-form-item label={ property.title } prop={ key }>
          { component }
        </el-form-item>);
      });
    }
    return <el-form
      model={ this.model }
      rules={ this.rules }
      labelPosition={ this.labelPosition }
      labelWidth={ this.labelWidth }
      labelSuffix={ this.labelSuffix }
      inline={ this.inline }
      showMessage={ this.showMessage }
      isPrevent={ this.isPrevent }
      {...formEvents}>
      {
        formItemArray
      }
      { this.$slots.button }
    </el-form>;
  },
  components: {
    ElForm,
    ElFormItem,
    ElSelect,
    ElInput
  }
};
