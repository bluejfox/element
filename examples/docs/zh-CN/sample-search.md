## TemplateBaseSearch 检索页面模板

通过定义检索条件和检索结果的结构，可以快速构建一个常用的检索页面。

### 基本使用

基本使用

::: demo
```html
<div>
  <el-card>
    <div slot="header">
      <span>搜索条件</span>
      <div style="display: inline-block; float: right;">
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <el-pro-form 
      type="queryFilter"
      :model="form1"
      :schema="schema"
      :ui-schema="uiSchema"
      label-width="100px"
      label-suffix=":"
      :after-submit="onSubmit">
    </el-pro-form>
  </el-card>
  <el-pro-table
    ref="proTable"
    :schema="schema"
    :ui-schema="uiSchema"
    row-key="id"
    :request="onRequest"
    @selection-change="handleSelectionChange">
  </el-pro-table>
</div>
<script>
  const total = parseInt(Math.random() * 100, 10);

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
    computed: {
      isBatchButtonEnable() {
        return this.multipleSelection.length > 0;
      }
    },
    mounted() {
      this.$refs.proTable.fetch();
    },
    methods: {
      onSubmit() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$message.success('表单提交成功');
            resolve();
          }, 1000);
        });
      },
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
      },
      handleUpdateButtonClick({ row }) {
        this.$message.warning(`修改 ${row.id} 数据!`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
```
:::