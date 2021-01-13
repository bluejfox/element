## JsonForm 动态表单

根据 [JSON-Schema](https://json-schema.org/) 可渲染对应的表单用于数据的展示和编辑

**JSON-Schema的文档稍后整理，在此之前可参考 [链接](https://imweb.io/topic/56b1b4bb5c49f9d377ed8ee9)**

### 典型表单

动态表单的基本使用

::: demo 根据标准JSON-Schema生成对应的表单
```html
<div>
  <el-pro-form
    ref="form1"
    :model="form1"
    :schema="schema"
    :ui-schema="uiSchema"
    label-width="100px"
    @change="onChange">
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
            "firstName",
            "lastName",
            "age"
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
        }
      }
    },
    methods: {
      onChange(key, value, object) {
        console.log(key, value, object);
        // if(object.profession === 2){
        //   this.schema.required=[
        //     "firstName",
        //     "lastName",
        //     "age","interest"
        //   ]
        // }else{
        //     this.schema.required=[
        //     "firstName",
        //     "lastName",
        //     "age","comment"
        //   ]
        // }
      },
      onSubmitForm1() {
        this.$refs.form1.validate((isValid) => {
          if (isValid) {
            this.$message.success('表单提交成功');
          }
        });
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
