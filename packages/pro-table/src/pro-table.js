import ElCard from 'setaria-ui/packages/card';
import ElPagination from 'setaria-ui/packages/pagination';
import ElTable from 'setaria-ui/packages/table';
import ElTableColumn from 'setaria-ui/packages/table-column';
import { arrayFind, getValueByPath, isEmpty } from 'setaria-ui/src/utils/util';

/**
 * 根据oneOf或anyOf结构取得值对应的label
 */
function createFormatter(schema) {
  const { oneOf, anyOf } = schema;
  let dictList = null;
  if (!isEmpty(oneOf)) {
    dictList = oneOf;
  } else {
    dictList = anyOf;
  }
  if (!isEmpty(dictList)) {
    return function(row, column, cellValue) {
      const dict = arrayFind(dictList, dict => dict.const === cellValue);
      return dict ? dict.title : cellValue;
    };
  }
}

/**
 * 动态表格，可根据传入的columns设置进行表格列内容的渲染
 */
export default {
  name: 'ElProTable',
  components: {
    ElCard,
    ElPagination,
    ElTable,
    ElTableColumn
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      default() {
        return {};
      }
    },
    // 查询结果数据
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否显示pager组件
    isShowPager: {
      type: Boolean,
      default: true
    },
    height: {
      type: String
    },
    maxHeight: {
      type: String
    },
    // 查询结果总数量
    total: null,
    // 当前显示页号
    pageNum: {
      type: Number,
      default: 1
    },
    // 当前每页显示数据数量
    pageSize: {
      type: Number,
      default: 10
    },
    // 含有multiple类型列的场合，必须设置此属性
    rowKey: null,
    rowClassName: null,
    // 获取表格数据
    request: Function,
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    headerTitle: {
      type: String,
      default: '查询结果'
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
      innerData: null,
      innerTotal: 0,
      current: 0,
      currentPageSize: 0,
      isLoading: false
    };
  },
  watch: {
    tableData: {
      immediate: true,
      handler(val) {
        this.innerData = val;
      }
    },
    total: {
      immediate: true,
      handler(val) {
        this.innerTotal = val;
      }
    },
    pageSize: {
      immediate: true,
      handler(val) {
        this.currentPageSize = val;
      }
    },
    pageNum: {
      immediate: true,
      handler(val) {
        this.current = val;
      }
    },
    current(val) {
      this.$emit('update:pageNum', val);
    },
    currentPageSize(val) {
      this.$emit('update:pageSize', val);
    },
    innerData(val) {
      this.$emit('update:tableData', val);
    },
    innerTotal(val) {
      this.$emit('update:total', val);
    }
  },
  computed: {
    columns() {
      const ret = [];
      const { schema, uiSchema } = this;
      const { properties } = schema;
      Object.keys(properties).forEach((key) => {
        const property = properties[key];
        // formatter
        let formatter = getValueByPath(uiSchema, `${key}.ui:options.formatter`);
        if (typeof formatter !== 'function') {
          formatter = createFormatter(property);
        }
        console.log(key, formatter, uiSchema);
        ret.push({
          title: property.title,
          key,
          formatter
        });
      });
      return ret;
    }
  },
  created() {
    let targetInstance = window;
    if (window.top !== targetInstance) {
      targetInstance = window.top;
    }
    if (
      targetInstance.proTablePageSizes &&
      typeof targetInstance.proTablePageSizes === 'string'
    ) {
      this.pageSizes = targetInstance.proTablePageSizes.split(',');
    }
  },
  methods: {
    fetch() {
      const {
        current,
        currentPageSize,
        params,
        request
      } = this;
      console.log('fetch');
      if (typeof request === 'function') {
        const requestParams = {
          pageNum: current,
          pageSize: currentPageSize,
          ...params
        };
        this.isLoading = true;
        request(requestParams).then((res = {}) => {
          const { data, total } = res;
          this.innerData = data;
          this.innerTotal = total;
          console.log(this.innerTotal);
          this.isLoading = false;
        }).catch((error) => {
          this.isLoading = false;
          throw error;
        });
      }
    },
    toggleRowSelection(row, selected) {
      this.$refs.proTable.toggleRowSelection(row, selected);
    },
    clearSelection() {
      this.$refs.proTable.clearSelection();
    },
    /**
     * 当前页号变更事件处理
     * @event
     * @param {Number} val 变更后的页号
     */
    onCurrentChange(val) {
      this.current = val;
      this.fetch();
      // this.$emit('current-change', val);
    },
    /**
     * 当前表格数据显示数量变更事件处理
     * @event
     * @param {Number} val 变更后的表格数据显示数量
     */
    onSizeChange(val) {
      this.currentPageSize = val;
      this.fetch();
    },
    /**
     * 当某一行被点击时会触发该事件
     * @event
     * @param {Object} row
     * @param {Object} event
     * @param {Object} column
     */
    onRowClick(row, event, column) {
      this.$emit('row-click', row, event, column);
    },
    /**
     * 选择项发生变化时事件处理
     * @event
     * @param {Array} val 当前的选择项
     */
    onSelectionChange(val) {
      this.$emit('selection-change', val);
    },
    /**
     * 渲染表格Column
     * @param {Object} props Column属性
     */
    renderColumn(props) {
      let ret = null;
      const { reserveelection, reserveSelection } = props;
      let columnReserveSelection = reserveelection;
      if (typeof columnReserveSelection !== 'boolean') {
        columnReserveSelection = reserveSelection;
      }
      if (props.type && props.type !== '') {
        ret = (
          <ElTableColumn
            type={props.type}
            label={props.label}
            index={props.index}
            fixed={props.fixed}
            width={props.width}
            min-width={props.minWidth}
            index={props.index}
            selectable={props.selectable}
            align={props.align}
            reserve-selection={columnReserveSelection}
          />
        );
      } else {
        let scopedSlots =
          typeof props.render === 'function'
            ? { default: (scope) => props.render(scope) }
            : null;
        const { renderHeader } = props;
        if (typeof renderHeader === 'function') {
          const header = (scope) => props.renderHeader(scope);
          if (scopedSlots === null) {
            scopedSlots = {
              header
            };
          } else {
            scopedSlots.header = header;
          }
        }
        ret = (
          <ElTableColumn
            label={props.title}
            fixed={props.fixed}
            prop={props.key}
            formatter={props.formatter}
            min-width={props.minWidth}
            width={props.width}
            align={props.align}
            scopedSlots={scopedSlots}
          />
        );
      }
      return ret;
    },
    getDefaultTableProperties() {
      const { $attrs } = this;
      return {
        border: true,
        'element-loading-text': '加载中',
        ...$attrs
      };
    }
  },
  /**
   * Vue实例渲染函数，生成组件模版
   */
  render() {
    const {
      $listeners,
      $slots,
      columns,
      current,
      currentPageSize,
      pageSizes,
      onCurrentChange,
      onRowClick,
      onSelectionChange,
      onSizeChange,
      renderColumn,
      isLoading,
      innerData = [],
      innerTotal,
      isShowPager,
      height,
      maxHeight,
      rowKey,
      rowClassName,
      getDefaultTableProperties,
      headerTitle
    } = this;
    const tableAttrs = getDefaultTableProperties();
    const inheritProps = {
      attrs: tableAttrs,
      listeners: $listeners
    };
    const directives = [
      { name: 'loading', value: isLoading }
    ];
    const renderColumns = [];
    columns.forEach((column) => {
      renderColumns.push(renderColumn(column));
    });
    console.log(renderColumns);
    return (
      <el-card class="el-pro-table">
        <div slot="header" class="clearfix">
          <div class="el-pro-table__header__title">{headerTitle}</div>
          <div style="float: right;" type="text">{$slots.toolbar}</div>
        </div>
        <el-table
          ref="proTable"
          {...inheritProps}
          {...$listeners}
          {...{
            directives
          }}
          data={innerData}
          loading={isLoading}
          height={height}
          max-height={maxHeight}
          on-row-click={onRowClick}
          on-selection-change={onSelectionChange}
          row-key={rowKey}
          row-class-name={rowClassName}
          highlight-select-row={true}
        >
          {$slots['batch-control'] ? (
            <template slot="control">{$slots['batch-control']}</template>
          ) : null}
          {renderColumns}
        </el-table>
        {innerData.length > 0 && isShowPager ? (
          <div class="el-pro-table__pagination">
            <el-pagination
              total={innerTotal}
              current-page={current}
              page-size={currentPageSize}
              page-sizes={pageSizes}
              layout="total, sizes, prev, pager, next, jumper"
              on-current-change={onCurrentChange}
              on-size-change={onSizeChange}
            />
          </div>
        ) : null}
      </el-card>
    );
  }
};
