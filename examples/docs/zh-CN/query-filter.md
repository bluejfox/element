## QueryFilter 筛选器
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
                       :after-submit="afterSubmit"
                       @clear="handleClear">
    <template slot="projectName" slot-scope="scope">
      <el-input v-model="scope.data.projectName" suffix-icon="el-icon-search"/>
    </template>
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
            },
            "projectName": {
              "type": "string",
              "title": "项目名称"
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
        console.log('afterSubmit', val);
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('查询执行成功');
            resolve();
          }, 1000);
        });
      },
      handleClear(key) {
        this.$message.success(`搜索条件${key}重置成功`);
      }
    }
  }
</script>
```
:::


### 没有定义普通搜索的场合

::: demo
```html
<div>
  <el-query-filter v-model="value"
                       class="filter"
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
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('查询执行成功');
            resolve();
          }, 2000);
        });
      }
    }
  }
</script>
```
:::

### QueryFilter Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | Object | 结构参考下表 | — |
| expand | 条件筛选是否展开，支持.sync修饰符 | Boolean | — | false |
| columns | 表单的列数 | number | — | 3 |
| rules    | 表单验证规则 | object | — | — |
| normal-schema | 普通搜索Schema，与高级搜索Schema至少有一个不为空 | Object | — | — |
| normal-ui-schema | 普通搜索UiSchema | Object | — | — |
| advance-schema | 高级搜索Schema | Object | — | — |
| advance-ui-schema | 高级搜索UiSchema | Object | — | — |
| after-submit | 搜索按钮点击后的回调函数，函数需要返回Promise | Function | — | — |
### QueryFilter Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 筛选条件变化时被触发 | 当前条件筛选值 |
| clear  | 条件筛选项目值被清空（点击条件筛选Label右侧筛选项目的 `X` 图标或点击清空按钮） | 被清空的筛选项目key |

### QueryFilter Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
|  search | 执行查询 | — |
