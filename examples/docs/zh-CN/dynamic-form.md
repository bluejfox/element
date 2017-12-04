<script>
  export default {
    data() {
      return {
        form1: {
          firstName: 'first',
          lastName: 'last',
          password: '',
          age: null,
          gender: '1',
          birth: '',
          interest: [],
          comment: ''
        },
        form2: {
          firstName: 'first',
          lastName: 'last',
          password: '',
          age: null,
          gender: '1',
          birth: '',
          interest: [],
          comment: '',
          profession: ''
        },
        schema: {
          "title": "A registration form",
          "description": "A simple form example.",
          "type": "object",
          "required": [
            "firstName",
            "lastName"
          ],
          "properties": {
            "firstName": {
              "type": "string",
              "title": "First name",
              "minLength": 3,
              "maxLength": 6
            },
            "lastName": {
              "type": "string",
              "title": "Last name"
            },
            "password": {
              "type": "string",
              "title": "password"
            },
            "age": {
              "type": "integer",
              "title": "Age"
            },
            "gender": {
              "type": "string",
              "title": "gender",
              "oneOf": [
                {"const": "1", "title": "Male"},
                {"const": "2", "title": "FeMale"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "birth",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "interest",
              "anyOf": [
                {"const": "1", "title": "Game"},
                {"const": "2", "title": "Music"},
                {"const": "3", "title": "Sport"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "comment"
            },
            "profession": {
              "type": "string",
              "title": "profession",
              "oneOf": [
                { "const":1, "title":"teacher" },
                { "const":2, "title":"doctor" }
              ]
            }
          }
        },
        uiSchema: {
          "lastName": {
            "ui:disabled": true
          },
          "password": {
            "ui:widget": "password",
            "className": "password-class"
          },
          "comment": {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 5
            }
          },
          "gender": {
            "ui:widget": "radio"
          },
          "interest": {
            "ui:widget": "checkbox"
          },
          "profession": {
            "ui:options": {
              "clearable": true
            }
          }
        }
      };
    },
    methods: {
      onChange(id, value, object) {
        console.log(id, value, object);
      },
      onSubmit() {
        console.log('submit!');
        console.log(this.form1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>

<style>
  .demo-dynamic-form.demo-zh-CN {
    .el-form {
      width: 100%;
    }

    .line {
      text-align: center;
    }

    .demo-form-normal {
      width: 100%;
    }
    .demo-ruleForm {
      width: 460px;
    }
    .fr {
      float: right;
    }
  }
</style>

## DynamicForm 动态表单

根据JSON-Schema可渲染对应的表单用于数据的展示和编辑

### 典型表单

动态表单的基本使用

::: demo 根据标准JSON-Schema生成对应的表单
```html
<div>
  <el-dynamic-form ref="form" :model="form1" :schema="schema" label-width="100px" @submit="onSubmit" @change="onChange">
    <div slot="button">
      <el-button type="primary" native-type="submit">提交</el-button>
    </div>
  </el-dynamic-form>
  <p>result:</p>
  <div>
    {{ this.form1 }}
  </div>
</div>
<script>
  export default {
    data() {
      return {
        form1: {
          firstName: 'first',
          lastName: 'last',
          password: '',
          age: null,
          gender: '1',
          birth: '',
          interest: [],
          comment: ''
        },
        schema: {
          "title": "A registration form",
          "description": "A simple form example.",
          "type": "object",
          "required": [
            "firstName",
            "lastName"
          ],
          "properties": {
            "firstName": {
              "type": "string",
              "title": "First name",
              "minLength": 3,
              "maxLength": 6
            },
            "lastName": {
              "type": "string",
              "title": "Last name"
            },
            "password": {
              "type": "string",
              "title": "password"
            },
            "age": {
              "type": "integer",
              "title": "Age"
            },
            "gender": {
              "type": "string",
              "title": "gender",
              "oneOf": [
                {"const": "1", "title": "Male"},
                {"const": "2", "title": "FeMale"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "birth",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "interest",
              "anyOf": [
                {"const": "1", "title": "Game"},
                {"const": "2", "title": "Music"},
                {"const": "3", "title": "Sport"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "comment"
            }
          }
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        console.log(this.form1);
      }
    }
  }
</script>
```
:::

### 定制化表单

可用过传入ui-schema属性对表单的项目进行定制化。 

请注意: ui-options中的属性为各组件的特殊属性，即只有该组件才具有的属性。disabled等不在此列。

::: demo
```html
<div>
  <el-dynamic-form ref="form" :model="form2" :schema="schema" :ui-schema="uiSchema" label-width="100px" @submit="onSubmit">
    <div slot="button">
      <el-button type="primary" native-type="submit">提交</el-button>
    </div>
  </el-dynamic-form>
  <p>result:</p>
  <div>
    {{ this.form2 }}
  </div>
</div>
<script>
  export default {
    data() {
      return {
        form2: {
          firstName: 'first',
          lastName: 'last',
          password: '',
          age: null,
          gender: '1',
          birth: '',
          interest: [],
          comment: '',
          profession: ''
        },
        schema: {
          "title": "A registration form",
          "description": "A simple form example.",
          "type": "object",
          "required": [
            "firstName",
            "lastName"
          ],
          "properties": {
            "firstName": {
              "type": "string",
              "title": "First name",
              "minLength": 3,
              "maxLength": 6
            },
            "lastName": {
              "type": "string",
              "title": "Last name"
            },
            "password": {
              "type": "string",
              "title": "password"
            },
            "age": {
              "type": "integer",
              "title": "Age"
            },
            "gender": {
              "type": "string",
              "title": "gender",
              "oneOf": [
                {"const": "1", "title": "Male"},
                {"const": "2", "title": "FeMale"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "birth",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "interest",
              "anyOf": [
                {"const": "1", "title": "Game"},
                {"const": "2", "title": "Music"},
                {"const": "3", "title": "Sport"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "comment"
            },
            "profession": {
              "type": "string",
              "title": "profession",
              "oneOf": [
                { "const":1, "title":"teacher" },
                { "const":2, "title":"doctor" }
              ]
            }
          }
        },
        uiSchema: {
          "password": {
            "ui:widget": "password",
            "className": "password-class"
          },
          "comment": {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 5
            },
            "ui:disabled": true
          },
          "gender": {
            "ui:widget": "radio"
          },
          "interest": {
            "ui:widget": "checkbox"
          },
          "profession": {
            "ui:options": {
              "clearable": true
            }
          }
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        console.log(this.form1);
      }
    }
  }
</script>
```
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置 | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| schema | JSON Schema对象 | Object | — | - |
| ui-schema | 用于设置各个表单字段的组件类型(ui:widget)、是否可用(ui:disabled)等属性 (请参照下表) | Object | — | - |
| columns | 表单的列数。分辨率在768像素以下时表单列数固定为1 | Number | — | 2 |

### UI-Schema Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| ui:widget | 表单字段的组件类型 | string | password, textarea, select, checkbox, radio等  |  — |
| ui:disabled | 表单字段的组件是否可用 | boolean | - | false |
| ui:options | 表单字段的组件特殊属性 | object | setaria组件特殊属性 | - |

### Form Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| submit  | 表单提交后，校验成功时回调 | — |
| change  | 表单字段值变更时回调 | key 表单字段的Key, val 表单字段的值 |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法 | Function(callback: Function(boolean))
| validateField | 对部分表单字段进行校验的方法 | Function(prop: string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | -

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | bolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |
