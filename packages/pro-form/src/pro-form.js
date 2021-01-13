import ElJsonForm from 'setaria-ui/packages/json-form/src/json-form';
import { getStyle } from 'setaria-ui/src/utils/dom';
import { arrayFind, isEmpty } from 'setaria-ui/src/utils/util';

/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  vertical: [
    // [breakpoint, cols, layout]
    [513, 1, 'vertical'],
    [785, 2, 'vertical'],
    [1057, 3, 'vertical'],
    [Infinity, 4, 'vertical']
  ],
  default: [
    [513, 1, 'vertical'],
    [701, 2, 'vertical'],
    [1062, 3, 'horizontal'],
    [1352, 3, 'horizontal'],
    [Infinity, 4, 'horizontal']
  ]
};

export default {
  name: 'ElProForm',
  componentName: 'ElProForm',
  props: {
    type: {
      type: String,
      default: 'queryFilter'
    },
    schema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isMounted: false,
      expand: false,
      width: null,
      lastestRowSpanCount: 0,
      totalColSpan: 0
    };
  },
  computed: {
    direction() {
      let ret = '';
      const { type } = this;
      switch (type) {
        case 'queryFilter':
          ret = 'default';
          break;
        default:
          ret = 'vertical';
      }
      return ret;
    },
    currentColumns() {
      const { direction, widthNumber } = this;
      const breakPoints = BREAKPOINTS[direction];
      const breakPoint = arrayFind(breakPoints, item => widthNumber < item[0]);
      return breakPoint[1];
    },
    widthNumber() {
      const { width } = this;
      if (isEmpty(width)) {
        return 0;
      }
      return parseInt(width.replace('px', ''), 10);
    },
    innerUiSchema() {
      let ret = {};
      if (!this.isMounted) {
        return ret;
      }
      const { currentColumns, expand, schema, uiSchema } = this;
      Object.keys(schema.properties).forEach(schemaKey => {
        let uiProperty = uiSchema[schemaKey];
        console.log(uiProperty);
        if (isEmpty(uiSchema[schemaKey])) {
          uiProperty = {};
        }
        ret[schemaKey] = uiProperty;
        let propertyColspan = uiProperty['ui:colspan'];
        propertyColspan = typeof propertyColspan === 'number' ? propertyColspan : 1;
        // 收起的场合
        if (!expand) {
          // 只显示一行表单项目，其余的隐藏
          if (this.totalColSpan + propertyColspan + 1 > currentColumns) {
            uiProperty['ui:hidden'] = true;
          } else {
            this.lastestRowSpanCount = this.totalColSpan + 1;
            uiProperty['ui:hidden'] = false;
          }
        // 展开的场合
        } else {
          uiProperty['ui:hidden'] = false;
        }
        this.totalColSpan = this.totalColSpan + propertyColspan;
      });
      return ret;
    },
    queryFilterColumnConfig() {
      const ret = {
        span: 8
      };
      const { currentColumns, expand, lastestRowSpanCount, totalColSpan } = this;
      let currentLastestRowSpanCount = lastestRowSpanCount;
      if (expand) {
        currentLastestRowSpanCount = totalColSpan % currentColumns;
      }
      if (currentColumns - currentLastestRowSpanCount - 1 === 0) {
        ret.offset = 0;
      } else {
        ret.offset = (currentColumns - currentLastestRowSpanCount - 1) * 8;
      }
      return ret;
    }
  },
  created() {
  },
  mounted() {
    this.handleResize();
    this.isMounted = true;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = getStyle(this.$el, 'width');
    },
    handleExpand() {
      this.totalColSpan = 0;
      this.lastestRowSpanCount = 0;
      this.expand = !this.expand;
    }
  },
  render(h) {
    const {
      $attrs,
      $listeners,
      $slots,
      currentColumns,
      expand,
      isMounted,
      innerUiSchema,
      lastestRowSpanCount,
      queryFilterColumnConfig,
      schema,
      totalColSpan,
      type,
      widthNumber,
      handleExpand
    } = this;
    if (!isMounted) {
      return (<div></div>);
    }
    const attributes = {
      attrs: $attrs,
      listeners: $listeners
    };
    console.log(widthNumber, currentColumns, totalColSpan, lastestRowSpanCount, innerUiSchema);
    const getExpandTextLabel = () => {
      return expand
        ? (<div><i class="el-icon-arrow-up"></i><span>收起</span></div>)
        : (<div><i class="el-icon-arrow-down"></i><span>展开</span></div>);
    };
    return (
      <ElJsonForm
        schema={schema}
        uiSchema={innerUiSchema}
        columns={currentColumns}
        {...attributes}>
        { type === 'queryFilter'
          ? <el-col span={queryFilterColumnConfig.span} offset={queryFilterColumnConfig.offset} slot="formItems" style="text-align: right;">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
            <el-button type="text" onClick={handleExpand}>{totalColSpan >= currentColumns ? getExpandTextLabel() : null}</el-button>
          </el-col> : null }
        { $slots.button ? <template slot="button">{$slots.button}</template> : null }
      </ElJsonForm>
    );
  },
  components: {
    ElJsonForm
  }
};
