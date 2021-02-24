## QueryCriteriaForm 条件查询表单

QueryCriteriaForm

前提：
1.默认先只支持一层结构且条件通过And连接

输入：

{
  ...JSON Schema,
  // 未定义时应用所有支持的操作符
  operator: []
}

输出：

### 基本使用

::: demo
```html
<div>
  <el-query-criteria-form :schema="schema"
                          :exclude-operators="excludeOperators"
                          v-model="value1">
    <template slot="location" slot-scope="scope">
      <el-input v-model="scope.criteria.value"/>
    </template>
  </el-query-criteria-form>
  <p>result:</p>
  <div>
    {{ this.value1 }}
  </div>
</div>
<script>
  export default {
    data() {
      return {
        value1: [
          {
            "field": "birth",
            "operator": "0",
            "value": "2021-02-16"
          }
        ],
        schema: {
          "properties": {
            "userName": {
              "description": "用户姓名",
              "type": "string",
              "title": "用户姓名"
            },
            "phone": {
              "type": "number",
              "title": "手机号"
            },
            "birth": {
              "title": "出生年月日",
              "type": "string",
              "format": "date"
            },
            "location": {
              "title": "居住地",
              "type": "string"
            }
          }
        },
        excludeOperators: {
          "location": ['12']
        }
      };
    }
  }
</script>
```
:::