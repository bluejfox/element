## TemplateBaseSearch 检索页面模板

通过定义检索条件和检索结果的结构，可以快速构建一个常用的检索页面。

### 基本使用

基本使用

::: demo
```html
<div>
  <el-template-base-search
    ref="searchDataList"
    :condition-schema="conditionSchema"
    :condition="condition"
    :result-schema="resultSchema"
    :result-ui-schema="resultUiSchema"
    :get-result="doGetResult"
    pagination="simple"
    :page-size="pageSize"
    row-selectable
    show-multi-row-control-tips
    result-column-auto-align
    @selection-change="doSelectionChange"
    @next-page-data-empty="doShowNoExistDataError"
    @handle-multi-table-data="doHandleMultiTableData">
    <div slot="tableButton">
      <el-button size="small" type="primary" plain>新增</el-button>
    </div>
    <div slot="tableRowButton" slot-scope="props">
      <el-button type="text" @click="doUpdate(props.row)">修改</el-button>
      <span class="button-separator">|</span>
      <el-button type="text">删除</el-button>
    </div>
    <template slot="columnActiveFlag" slot-scope="props">
      <span :class="{ invalid: props.row.activeFlag === '无效' }">{{ props.row.activeFlag }}</span>
    </template>
  </el-template-base-search>
</div>
<script>
  export default {
    data() {
      return {
        // 检索条件对象
        condition: {
          name: '',
          theFetchStart: 0,
          theFetchSize: 10
        },
        // 检索条件表单Schema定义
        conditionSchema: {
          name: {
            type: 'string',
            title: '用户姓名'
          }
        },
        // 检索结果一览Schema定义
        resultSchema: {
          name: {
            type: 'string',
            title: '姓名'
          },
          gender: {
            type: 'string',
            title: '性别'
          },
          birth: {
            type: 'string',
            title: '出生日期',
            format: 'date'
          },
          mobile: {
            type: 'integer',
            title: '手机号'
          },
          activeFlag: {
            type: 'string',
            title: '状态'
          }
        },
        resultUiSchema: {
          birth: {
            'ui:minWidth': '120px'
          },
          mobile: {
            'ui:minWidth': '120px',
            'ui:headerAlign': 'left'
          }
        },
        // 检索结果一览数据对象
        tableData: [],
        // 检索结果一览每页数据数量
        pageSize: 10,
        // 选中的行
        selectionRows: [],
      };
    },
    methods: {
      /**
       * 检索结果一览数据取得事件处理
       * @event
       */
      doGetResult(val, currentPage) {
        this.condition.theFetchStart = (currentPage === 1) ? 0 :
          (currentPage - 1) * this.condition.theFetchSize;
        return new Promise((resolve) => {
          let ret = null;
          if (currentPage === 1) {
            ret = [
              {
                name: '管理员',
                gender: '男',
                mobile: '13910000001',
                birth: '1979-03-08',
                activeFlag: '有效'
              },
              {
                name: '赵三',
                gender: '男',
                mobile: '13910000002',
                birth: '1982-08-19',
                activeFlag: '无效'
              }
            ];
          }
          resolve(ret);
        });
      },
      doShowNoExistDataError() {
        this.$message('没有更多的数据了。');
      },
      doUpdate({ name }) {
        this.$message(`修改 ${name} 数据。`);
      },
      doSelectionChange(val) {
        this.selectionRows = val;
        console.log(this.selectionRows);
      },
      doHandleMultiTableData(val) {
        const nameArray = [];
        val.forEach(i => nameArray.push(i.name));
        this.$message(`已选择 ${nameArray.join(',')}`);
      },
    }
  }
</script>
```
:::

### TemplateBaseSearch Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| condition-schema   | 检索条件表单项目定义 | object |                  —                |  — |
| condition    | 检索条件对象 | object | — | — |
| result-schema    | 检索结果表格项目定义 | object | — | — |
| get-result | 检索结果表格数据取得回调钩子函数 | Function(condition, currengPageNo) | — | — |
| pagination | 翻页组件模式 | string | simple, full | — |
| page-size | 检索结果表格显示的行数 | number | — | — |
| row-selectable  | 检索结果表格内的行是否可被选择 | boolean | — | false |
| show-multi-row-control-tips  | 同时操纵多行数据提示是否显示 | boolean | — | false |
| result-column-auto-align  | 是否根据检索结果项目类型自动设置对齐方式(数字和日期右对齐) | boolean | — | false |
| result-max-height  | 检索结果表格的最大高度，如果不设置，则会自动根据page-size设置max-height | number | — | (page-size + 1) * 40) |

### Condition-UI-Schema Attributes

同Dynamic-Form的UI-Schema Attributes

### Result-UI-Schema Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| ui:minWidth | 同Table-Column的min-width，对应列的最小宽度，会把剩余宽度按比例分配给设置了 min-width 的列 | String | —  | — |
| ui:align | 同Table-Column的align，对齐方式 | String | left/center/right | left |
| ui:headerAlign | 同Table-Column的header-align，表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | — |
| ui:resizable | 同Table-Column的align，对应列是否可以通过拖动改变宽度 | boolean | — | true |

### TemplateBaseSearch Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| next-page-data-empty  | 检索结果表格数据为空时回调 | — |
| selection-change  | 检索结果表格内的数据行选中时回调 | selection:Array 选中的行 |
| current-page-change  | 翻页时回调 | currengPageNo:number 当前页号 |
| handle-multi-table-data  | 操作多行按钮点击时回调 | multipleSelection:Array 选中的行 |

### TemplateBaseSearch Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| refreshData | 对检索结果进行刷新的方法 | — |

### TemplateBaseSearch Slot
| name | 说明 |
|------|--------|
| tableButton | 用于放置新增，拷贝，打印等按钮 |
| tableRowButton | 用于在检索结果表格的行尾插入按钮（此处建议放置修改，删除等对行级数据操作的按钮）, 可通过props.row取得当前行的数据 |
| column[:id] | 可通过此Slot对cell的显示进行customize |
