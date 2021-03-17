## ProForm 高级表单

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发一个表单。同时添加一些默认行为，让我们的表单默认好用。

根据 [JSON-Schema](https://json-schema.org/) 可渲染对应的表单用于数据的展示和编辑

### 何时使用

当你想快速实现一个表单但不想花太多时间去布局时 ProForm 是最好的选择。

### 基本使用

与 `JSON-FORM` 的不同之处为在其基础上增加了响应式功能，对于常见的分辨率进行了 `columns` 的预设置

::: demo
```html
<div>
  <el-pro-form
    :model="form1"
    :schema="schema"
    :ui-schema="uiSchema"
    :rules="rules"
    label-width="100px"
    :after-submit="onSubmit">
    <template slot="comment" slot-scope="scope">
      <el-input v-model="scope.data.comment" suffix-icon="el-icon-search"/>
    </template>
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
          id: '',
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
        rules: {
          id: [
            {
              validator: (rule, value, callback) => {
                console.log('validator');
                if (value !== 'abc') {
                  callback(new Error('必须输入abc'));
                }
              },
              trigger: 'blur'
            }
          ]
        },
        schema: {
          "required": [
            "id"
          ],
          "properties": {
            "id": {
              "description": "用户ID",
              "type": "string",
              "title": "用户ID",
              "minLength": 3,
              "maxLength": 6
            },
            "password": {
              "type": "string",
              "title": "密码"
            },
            "age": {
              "type": "integer",
              "title": "年龄"
            },
            "gender": {
              "type": "integer",
              "title": "性别",
              "oneOf": [
                {"const": 1, "title": "男"},
                {"const": 2, "title": "女"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "出生年月日",
              "format": "date"
            },
            "time": {
              "type": "array",
              "title": "时间",
              "format": "time"
            },
            "dateTime": {
              "type": "string",
              "title": "日期时间",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "兴趣",
              "anyOf": [
                {"const": "1", "title": "游戏"},
                {"const": "2", "title": "音乐"},
                {"const": "3", "title": "运动"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "备注"
            }
          }
        },
        uiSchema: {
          "interest": {
            "ui:colspan": 2
          }
        }
      }
    },
    methods: {
      onSubmit() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('表单提交成功');
            resolve();
          }, 1000);
        });
      }
    }
  }
</script>
```
:::

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
    :after-submit="onSubmit">
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
          id: '',
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
            "id"
          ],
          "properties": {
            "id": {
              "description": "用户ID",
              "type": "string",
              "title": "用户ID",
              "minLength": 3,
              "maxLength": 6
            },
            "password": {
              "type": "string",
              "title": "密码"
            },
            "age": {
              "type": "integer",
              "title": "年龄"
            },
            "gender": {
              "type": "integer",
              "title": "性别",
              "oneOf": [
                {"const": 1, "title": "男"},
                {"const": 2, "title": "女"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "出生年月日",
              "format": "date"
            },
            "time": {
              "type": "array",
              "title": "时间",
              "format": "time"
            },
            "dateTime": {
              "type": "string",
              "title": "日期时间",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "兴趣",
              "anyOf": [
                {"const": "1", "title": "游戏"},
                {"const": "2", "title": "音乐"},
                {"const": "3", "title": "运动"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "备注"
            }
          }
        },
        uiSchema: {
          "interest": {
            "ui:colspan": 2
          },
          "comment": {
            "ui:options": {
              type: 'textarea'
            },
            "ui:colspan": 2
          }
        }
      }
    },
    methods: {
      onSubmit() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('查询执行成功');
            resolve();
          }, 1000);
        });
      }
    }
  }
</script>
```
:::

### Card表单

::: demo
```html
<div>
  <el-pro-form
    type="cardForm"
    :model="form1"
    :schema="schema"
    :ui-schema="uiSchema"
    label-width="100px"
    :after-submit="onSubmit">
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
          id: '',
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
            "id"
          ],
          "properties": {
            "id": {
              "description": "用户ID",
              "type": "string",
              "title": "用户ID",
              "minLength": 3,
              "maxLength": 6
            },
            "password": {
              "type": "string",
              "title": "密码"
            },
            "age": {
              "type": "integer",
              "title": "年龄"
            },
            "gender": {
              "type": "integer",
              "title": "性别",
              "oneOf": [
                {"const": 1, "title": "男"},
                {"const": 2, "title": "女"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "出生年月日",
              "format": "date"
            },
            "time": {
              "type": "array",
              "title": "时间",
              "format": "time"
            },
            "dateTime": {
              "type": "string",
              "title": "日期时间",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "兴趣",
              "anyOf": [
                {"const": "1", "title": "游戏"},
                {"const": "2", "title": "音乐"},
                {"const": "3", "title": "运动"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "备注"
            }
          }
        },
        uiSchema: {
          "interest": {
            "ui:colspan": 2
          },
          "comment": {
            "ui:options": {
              type: 'textarea'
            },
            "ui:colspan": 2
          }
        }
      }
    },
    methods: {
      onSubmit() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('表单提交成功');
            resolve();
          }, 1000);
        });
      }
    }
  }
</script>
```
:::

### Modal表单

::: demo
```html
<div>
  <el-pro-form
    type="modalForm"
    :model="form1"
    :schema="schema"
    :ui-schema="uiSchema"
    label-width="100px"
    :after-submit="onSubmit"
    title="新建表单">
    <el-button type="primary">新建表单</el-button>
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
          id: '',
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
            "id"
          ],
          "properties": {
            "id": {
              "description": "用户ID",
              "type": "string",
              "title": "用户ID",
              "minLength": 3,
              "maxLength": 6
            },
            "password": {
              "type": "string",
              "title": "密码"
            },
            "age": {
              "type": "integer",
              "title": "年龄"
            },
            "gender": {
              "type": "integer",
              "title": "性别",
              "oneOf": [
                {"const": 1, "title": "男"},
                {"const": 2, "title": "女"}
              ]
            },
            "birth": {
              "type": "string",
              "title": "出生年月日",
              "format": "date"
            },
            "time": {
              "type": "array",
              "title": "时间",
              "format": "time"
            },
            "dateTime": {
              "type": "string",
              "title": "日期时间",
              "format": "date-time"
            },
            "interest": {
              "type": "array",
              "title": "兴趣",
              "anyOf": [
                {"const": "1", "title": "游戏"},
                {"const": "2", "title": "音乐"},
                {"const": "3", "title": "运动"}
              ]
            },
            "comment": {
              "type": "string",
              "title": "备注"
            }
          }
        },
        uiSchema: {
          "interest": {
            "ui:colspan": 2
          },
          "comment": {
            "ui:options": {
              type: 'textarea'
            },
            "ui:colspan": 2
          }
        }
      }
    },
    methods: {
      onSubmit() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('表单提交成功');
            resolve();
          }, 1000);
        });
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
