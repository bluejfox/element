## ConditionFilter 筛选器
筛选器用于帮助用户快速查询所需数据，属于复合型组件。

筛选器一般包含快捷筛选和条件筛选，快捷筛选与快捷筛选互斥，即点击快捷筛选内的选项时，只使用被点击的选项进行查询。此时忽略条件筛选中设置的条件。同理，在点击条件筛选内的查询按钮时，使用当前条件筛选中设置的值进行查询，如果此时快捷筛选存在选中值，则自动被清除。

用户可以在筛选器中编辑设置筛选条件，支持单个条件或多个条件同时筛选。

### 基本使用

::: demo
```html
<div>
  <el-query-filter v-model="value"
                       class="filter"
                       :normal-schema="normalSchema"
                       :normal-ui-schema="normalUiSchema"
                       :advance-schema="advanceSchema"
                       :advance-ui-schema="advanceUiSchema"
                       :after-submit="afterSubmit">
  </el-query-filter>
</div>
<script>
  export default {
    data() {
      return {
        value: {
          procurementType: '1',
          createDate: [],
          publishFlag: '',
          procurementApplyType: '2',
          projectName: '',
          location: [],
          dateRange: null,
          amount: undefined,
          createBy: ''
        },
        normalSchema: {
          "properties": {
            "procurementType": {
              "type": "array",
              "title": "采购类型",
              "oneOf": [
                {"const": "1", "title": "前期类"},
                {"const": "2", "title": "工程类"},
                {"const": "3", "title": "营销类"}
              ]
            }
          }
        },
        normalUiSchema: {
        },
        advanceSchema: {
          "properties": {
            "createBy": {
              "type": "string",
              "title": "创建人"
            },
            "createDate": {
              "type": "array",
              "title": "创建期间",
              "format": "date"
            },
            "procurementApplyType": {
              "type": "string",
              "title": "采购申请类型",
              "oneOf": [
                {"const": "1", "title": "成本类"},
                {"const": "2", "title": "资本类"}
              ]
            }
          }
        },
        advanceUiSchema: {
          // "createBy": {
          //   "ui:options": {
          //     "suffix-icon": "search",
          //     "readonly": true
          //   },
          //   "ui:on": {
          //     "click": () => {
          //       alert("创建人 click");
          //     }
          //   }
          // },
          "createDate": {
            "ui:colspan": 2
          }
        }
      };
    },
    mounted() {
    },
    methods: {
      afterSubmit(val) {
        console.log('afterSubmit');
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
### ConditionFilter Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | Object | 结构参考下表 | — |
| data | 快捷筛选选项和条件筛选多选项的定义 | Object | 结构参考下表 | — |
| expand | 条件筛选是否展开，支持.sync修饰符 | Boolean | — | false |
| show-senior-condition-result | 是否始终显示条件筛选结果 | Boolean | — | false |
| show-control-button | 是否显示清空和查询按钮 | Boolean | — | true |
| rules    | 表单验证规则 | object | — | — |

### ConditionFilter Value Structure

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| quickCondition | 快捷筛选值 | * | — | — |
| seniorCondition | 条件筛选值 | Object | — | — |

### ConditionFilter Data Structure

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| quickCondition | 快捷筛选项目定义 | Array | [{ label:'显示值', value: '存储值' }] | — |
| seniorCondition.multipleCondition | 条件筛选多选项目定义 | Object | { '多选项目Key': { label: '多选项目Label(名称)', data: [{ label: '显示值', value: '存储值', tooltip: '文字提示' }] } } | — |

### ConditionFilter Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| quick-search  | 快捷筛选查询事件 | 当前快捷筛选值 |
| senior-search  | 条件筛选查询事件 | 当前条件筛选值 |
| change  | 筛选条件变化时被触发 | 当前条件筛选值 |
| clear  | 条件筛选项目值被清空（点击条件筛选Label右侧筛选项目的 `X` 图标或点击清空按钮） | 被清空的筛选项目key数组 |

### ConditionFilter Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
|  search | 执行查询 | — |
