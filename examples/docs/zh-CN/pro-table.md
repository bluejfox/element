## ProTable 高级表格

`ProTable` 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。

依托于 `ProForm` `的能力，ProForm` 拥有多种形态，可以切换查询表单类型，设置变形成为一个简单的 Form 表单，执行新建等功能。

根据 [JSON-Schema](https://json-schema.org/) 可渲染对应的表单用于数据的展示和编辑

### 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，`ProTable` 是不二选择。

### 基本使用

::: demo
```html
<div>
  <el-pro-table
    ref="proTable"
    :schema="schema"
    :request="onRequest">
    <div slot="action">
      <el-button type="primary" size="mini" icon="el-icon-plus">新建</el-button>
    </div>
  </el-pro-table>
</div>
<script>
  const total = parseInt(Math.random() * 100, 10);

  export default {
    data() {
      return {
        tableData: [
        ],
        schema: {
          "properties": {
            "id": {
              "description": "用户ID",
              "type": "string",
              "title": "用户ID",
              "minLength": 3,
              "maxLength": 6
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
            }
          }
        },
        uiSchema: {
          "birth": {
            "ui:options": {
              formatter(row, column, value) {
                return value.replace(/\-/g, '/');
              }
            }
          },
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
    mounted() {
      this.$refs.proTable.fetch();
    },
    methods: {
      onRequest(params) {
        console.log(params);
        const { pageNum, pageSize } = params;
        const tableData = [];
        const startIndex = ((pageNum - 1) * pageSize) + 1;
        const endIndex = (pageNum * pageSize) > total ? total : (pageNum * pageSize);
        for (let i = startIndex; i <= endIndex; i++) {
          tableData.push({
            no: i,
            id: `zhangsan${i}`,
            age: parseInt(Math.random() * 100, 10),
            gender: (parseInt(Math.random() * 10, 10) % 2) + 1,
            birth: '1990-10-01',
            interest: '1'
          });
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: tableData,
              total
            });
          }, 2000);
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
