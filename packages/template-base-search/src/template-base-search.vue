<template>
  <div class="el-template-base-search">
    <el-json-form
      :inline="true"
      :model="condition"
      :schema="internalConditionSchema"
      :ui-schema="internalConditionUISchema"
      @submit="doConditionSubmit"
      class="el-template-base-search__search-condition">
      <span slot="button">
        <el-button type="primary" native-type="submit"
          class="el-template-base-search__search-button">
          <i class="el-icon-search"></i> 检索
        </el-button>
      </span>
    </el-json-form>
    <el-alert
      :title="rowSelectedTip"
      type="info"
      :show-icon="false"
      v-if="showMultiRowControlTips && rowSelectable && multipleSelection.length > 0"
      class="el-template-base-search__list-selected-tip"
      :closable="false">
      <slot>
        <el-button type="text" @click="doToggleRowSelection">
          {{ rowSelectedTipCloseText }}
        </el-button>
        <el-button type="text"
          class="tip-button"
          @click="doMultiData">
          {{ multiActionText }}
        </el-button>
      </slot>
    </el-alert>
    <el-row type="flex" align="middle"
      class="el-template-base-search__table-button-container">
      <el-col :span="24">
        <div
          class="table-data-button">
          <slot name="tableButton"></slot>
        </div>
        <el-button icon="el-icon-setting" 
          size="small" 
          class="table-assist-button"
          @click="isShowColumnVisibilityStatusDialog = true">
        </el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      class="el-template-base-search__result-table"
      ref="resultTable"
      :data="tableData"
      :max-height="resultMaxHeight"
      @selection-change="doSelectionChange">
      <el-table-column type="selection" v-if="rowSelectable">
      </el-table-column>
      <el-table-column
        v-for="( colValue, colKey ) in internalResultSchema.properties"
        v-if="resultColumnVisibility[colKey].visibility === true"
        :label="internalResultSchema.properties[colKey].title"
        :key="internalResultSchema.properties[colKey].title"
        :prop="colKey"
        :min-width="getUIProperty(colKey, 'ui:minWidth', null)"
        :align="getColumnAlign(colKey)"
        :header-align="getUIProperty(colKey, 'ui:headerAlign', null)"
        :resizable="getUIProperty(colKey, 'ui:resizable', true)">
        <template slot-scope="scope">
          <slot
            v-if="isExistColumnSlots(colKey)"
            :name="getColumnSlotsName(colKey)"
            :row="scope.row"></slot>
          <template v-else>{{ scope.row[colKey] }}</template>
        </template>
      </el-table-column>
      <el-table-column label="操作"
        v-if="isControlColumnSlotExist"
        :min-width="resultControlColumnMinWidth"
        class-name="control-column">
        <template slot-scope="scope">
          <slot name="tableRowButton" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="isTableDataNotEmpty">
      <el-simple-pagination
        v-if="pagination === 'simple'"
        @current-change="doCurrentPageChange"
        :current-page="currentPage">
      </el-simple-pagination>
      <el-pagination
        v-else
        :layout="paginationLayout"
        :total="pageSize">
      </el-pagination>
    </template>
    <el-dialog
      :visible.sync="isShowColumnVisibilityStatusDialog"
      :close-on-click-modal="false"
      title="自定义列表项"
      :modal-append-to-body="true"
      size="tiny">
      <column-visibility-status-list v-model="resultColumnVisibility">
      </column-visibility-status-list>
      <span slot="footer">
        <el-button type="primary" @click="isShowColumnVisibilityStatusDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import ColumnVisibilityStatusList from './column-visibility-status-list';

  const UI_PROPERTY_PREFIX = 'ui:';

  export default {
    name: 'ElTemplateBaseSearch',
    props: {
      conditionSchema: {
        type: Object
      },
      conditionUiSchema: {
        type: Object,
        default() {
          return {};
        }
      },
      condition: {
        type: Object
      },
      resultSchema: {
        type: Object
      },
      resultUiSchema: {
        type: Object,
        default() {
          return {};
        }
      },
      rowSelectable: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: String,
        default: 'simple',
        validator(val) {
          return [
            'simple',
            'full'
          ].indexOf(val) !== -1;
        }
      },
      paginationLayout: {
        type: String
      },
      pageSize: {
        type: Number
      },
      getResult: Function,
      multiActionText: {
        type: String,
        default: '执行'
      },
      resultControlColumnMinWidth: {
        type: String,
        default: '120px'
      },
      showMultiRowControlTips: {
        type: Boolean,
        default: false
      },
      resultColumnAutoAlign: {
        type: Boolean,
        default: false
      },
      resultMaxHeight: {
        type: Number,
        default() {
          if (typeof this.pageSize === 'number') {
            return (this.pageSize + 1) * 40;
          } else {
            return null;
          }
        }
      }
    },
    data() {
      return {
        internalConditionSchema: null,
        internalResultSchema: null,
        tableData: null,
        multipleSelection: [],
        currentPage: 1,
        resultColumnVisibility: {},
        isShowColumnVisibilityStatusDialog: false
      };
    },
    watch: {
      conditionSchema: {
        immediate: true,
        handler(val = {}) {
          if (val.title === undefined ||
            val.title === null ||
            val.title === '') {
            this.internalConditionSchema = {
              title: '检索条件表单Schema',
              description: '检索条件表单Schema',
              type: 'Object',
              properties: val
            };
          } else {
            this.internalConditionSchema = val;
          }
        }
      },
      resultSchema: {
        immediate: true,
        handler(val = {}) {
          if (val.title === undefined ||
            val.title === null ||
            val.title === '') {
            this.internalResultSchema = {
              title: '检索结果列表Schema',
              description: '检索结果列表Schema',
              type: 'Object',
              properties: val
            };
          } else {
            this.internalResultSchema = val;
          }
        }
      }
    },
    computed: {
      internalConditionUISchema() {
        return Object.assign({}, this.getUISchema(this.internalConditionSchema), this.conditionUiSchema);
      },
      internalResultUISchema() {
        return Object.assign({}, this.getUISchema(this.internalResultSchema), this.resultUiSchema);
      },
      isControlColumnSlotExist() {
        return this.$scopedSlots.tableRowButton;
      },
      isTableDataNotEmpty() {
        const tableData = this.tableData || [];
        return tableData.length > 0;
      },
      /**
       * 是否选中检索结果一览内全部项目
       * @return {Boolean}
       */
      isSelectAllRow() {
        const multipleSelection = this.multipleSelection || [];
        const tableData = this.tableData || [];
        return multipleSelection.length === tableData.length;
      },
      /**
       * 检索结果一览选中数量提示内容
       * @return {String}
       */
      rowSelectedTip() {
        const scope = this.isSelectAllRow ? '全部' : '当前页';
        return `已选${scope}${this.multipleSelection.length}项。`;
      },
      /**
       * 检索结果一览批量操作提示中按钮的标题
       * @return {String}
       */
      rowSelectedTipCloseText() {
        if (!this.isSelectAllRow) {
          return `选择全部${this.tableData.length}项`;
        }
        return '清除所选内容';
      }
    },
    created() {
      this.initResultColumnVisibility();
    },
    methods: {
      doConditionSubmit() {
        this.$emit('search', this.condition);
        this.currentPage = 1;
        this.refreshData();
      },
      doSelectionChange(val) {
        this.$emit('selection-change', val);
        this.multipleSelection = val;
      },
      doCurrentPageChange(val) {
        this.$emit('current-page-change', val);
        this.currentPage = val;
        this.refreshData(true);
      },
      doToggleRowSelection() {
        // 为选中全部项目时，选择全部数据
        if (this.multipleSelection.length < this.tableData.length) {
          this.toggleTableDataSelection(this.tableData);
        // 选择了全部数据时，清空所有选择项目
        } else {
          this.toggleTableDataSelection();
        }
      },
      refreshData(isPageChangeFlag) {
        if (typeof this.getResult === 'function') {
          const p = this.getResult(this.condition, this.currentPage);
          if (p && p.then) {
            p.then((res) => {
              if (res) {
                this.tableData = res;
              } else if (isPageChangeFlag) {
                if (this.currentPage > 1) {
                  this.currentPage = this.currentPage - 1;
                } else {
                  this.currentPage = 1;
                }
                this.$emit('next-page-data-empty', null);
              } else {
                this.currentPage = 1;
                this.tableData = [];
              }
            });
          }
        }
      },
      /**
       * 切换检索结果一览内项目的选择状态
       * @param  {Array}  [rows=[]]
       */
      toggleTableDataSelection(rows = []) {
        if (rows.length > 0) {
          rows.forEach(item => this.$refs.resultTable.toggleRowSelection(item, true));
        } else {
          this.$refs.resultTable.clearSelection();
        }
      },
      doMultiData() {
        this.$emit('handle-multi-table-data', this.multipleSelection);
      },
      getUIProperty(columnKey, property, defaultValue = null) {
        const columnUISchema = this.internalResultUISchema[columnKey] || {};
        return columnUISchema[property] !== undefined ? columnUISchema[property] : defaultValue;
      },
      getUISchema(val) {
        const ret = {};
        const tableColumnProperties = val.properties;
        Object.keys(tableColumnProperties).forEach((columnItemId) => {
          const columnItemObject = tableColumnProperties[columnItemId];
          Object.keys(columnItemObject).forEach((columnItemProperty) => {
            // UI属性的场合
            if (columnItemProperty.indexOf(UI_PROPERTY_PREFIX) === 0) {
              let uiObject = ret[columnItemId];
              if (!uiObject) {
                ret[columnItemId] = {};
                uiObject = ret[columnItemId];
              }
              uiObject[columnItemProperty] = columnItemObject[columnItemProperty];
            }
          });
        });
        return ret;
      },
      initResultColumnVisibility() {
        const properties = this.internalResultSchema.properties;
        Object.keys(properties).forEach((colId) => {
          this.resultColumnVisibility[colId] = {
            title: properties[colId].title,
            visibility: true
          };
        });
      },
      isExistColumnSlots(colKey) {
        const slotName = this.getColumnSlotsName(colKey);
        return typeof this.$scopedSlots[slotName] === 'function';
      },
      getColumnSlotsName(colKey) {
        const key = `${colKey.charAt(0).toUpperCase()}${colKey.substring(1)}`;
        return `column${key}`;
      },
      getColumnAlign(colKey) {
        let ret = this.getUIProperty(colKey, 'ui:align', null);
        if (this.resultColumnAutoAlign && ret === null) {
          const property = this.internalResultSchema.properties[colKey];
          const isNumberic = property.type === 'number' ||
            property.type === 'integer' ||
            property.format === 'date' ||
            property.format === 'data-time';
          ret = isNumberic ? 'right' : 'left';
        }
        return ret;
      }
    },
    components: {
      ColumnVisibilityStatusList
    }
  };
</script>