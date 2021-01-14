## ProForm 高级表单

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发一个表单。同时添加一些默认行为，让我们的表单默认好用。

根据 [JSON-Schema](https://json-schema.org/) 可渲染对应的表单用于数据的展示和编辑

### 何时使用

当你想快速实现一个表单但不想花太多时间去布局时 ProForm 是最好的选择。


### 查询筛选

::: demo 设置 `type` 为 `queryFilter` 即可渲染查询筛选，主要用于查询页面的筛选条件。
```html
<div>
  <el-pro-form
    type="queryFilter"
    :model="form1"
    :schema="schema"
    :ui-schema="uiSchema"
    label-width="100px"
    @submit="onSubmit">
  </el-pro-form>
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
          gender: 2,
          birth: '',
          interest: [],
          comment: '',
          profession: '',
          dateTime: '',
          time: '',
        },
        schema: {
          "required": [
            "firstName"
          ],
          "properties": {
            "firstName": {
              "description": "First Name(名)",
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
              "type": "integer",
              "title": "gender",
              "oneOf": [
                {"const": 1, "title": "Male"},
                {"const": 2, "title": "FeMale"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "birth",
              "format": "date"
            },
            "time": {
              "type": "array",
              "title": "time",
              "format": "time"
            },
            "dateTime": {
              "type": "string",
              "title": "dateTime",
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
        },
        uiSchema: {
          "comment": {
            "ui:colspan": 2
          }
        }
      }
    },
    methods: {
      onSubmit() {
        this.$message.success('执行查询操作');
      }
    }
  }
</script>
```
:::

### ProForm Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |
| label-position | 表单域标签的位置 | string |  right/left/top            | top |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| schema | JSON Schema对象 | Object | — | - |
| ui-schema | 用于设置各个表单字段的组件类型(ui:widget)、是否可用(ui:disabled)等属性 (请参照下表) | Object | — | - |
| columns | 表单的列数。分辨率在768像素以下时表单列数固定为1 | Number | — | 5 |
| column-max-label-length | 以col为单位的form-label的最大长度，超过的部分则截取省略。此时Label外增加 `el-TOOLTIP` 可查看全部Label | Number | - | - |

### UI-Schema Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| ui:widget | 表单字段的组件类型 | string | password, textarea, select, checkbox, radio  |  — |
| ui:disabled | 表单字段的组件是否可用 | boolean | - | false |
| ui:hidden | 表单字段的组件是否可见 | boolean | - | false |
| ui:options | 表单字段的组件独有属性 | object | UI组件独有属性 | - |
| ui:colspan | 跨越的列数 | number | - | - |

### Form Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 表单字段值变更时回调 | key 表单字段的Key, val 表单字段的值 |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法 | Function(callback: Function(boolean))
| validateField | 对部分表单字段进行校验的方法 | Function(prop: string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | -
