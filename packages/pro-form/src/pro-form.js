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
    model: {
      type: Object
    },
    type: {
      type: String,
      default: ''
    },
    schema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      default: {}
    },
    afterSubmit: {
      type: Function
    }
  },
  data() {
    return {
      isSubmiting: false,
      isMounted: false,
      expand: false,
      width: null,
      currentDisplayTotalColSpan: 0,
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
      this.totalColSpan = 0;
      this.currentDisplayTotalColSpan = 0;
      const { currentColumns, expand, schema, type, uiSchema } = this;
      Object.keys(schema.properties).forEach((schemaKey, index) => {
        let uiProperty = uiSchema[schemaKey];
        if (isEmpty(uiSchema[schemaKey])) {
          uiProperty = {};
        }
        ret[schemaKey] = uiProperty;
        if (type === 'queryFilter') {
          let propertyColspan = uiProperty['ui:colspan'];
          propertyColspan = typeof propertyColspan === 'number' ? propertyColspan : 1;
          // 收起的场合
          if (!expand) {
            if (currentColumns === 1 && index === 0) {
              uiProperty['ui:hidden'] = false;
            // 只显示一行表单项目，其余的隐藏
            } else if (this.currentDisplayTotalColSpan + propertyColspan + 1 > currentColumns) {
              uiProperty['ui:hidden'] = true;
            } else {
              uiProperty['ui:hidden'] = false;
            }
          // 展开的场合
          } else {
            uiProperty['ui:hidden'] = false;
          }
          // 隐藏的项目不统计
          if (uiProperty['ui:hidden'] !== true) {
            if (propertyColspan > currentColumns) {
              propertyColspan = currentColumns;
            }
            if (currentColumns - (this.currentDisplayTotalColSpan % currentColumns) < propertyColspan) {
              // 如果当前行空余位置放不下，那么折行
              this.currentDisplayTotalColSpan += currentColumns - (this.currentDisplayTotalColSpan % currentColumns);
            }
            this.currentDisplayTotalColSpan += propertyColspan;
          }
          if (propertyColspan > currentColumns) {
            propertyColspan = currentColumns;
          }
          if (currentColumns - (this.totalColSpan % currentColumns) < propertyColspan) {
            // 如果当前行空余位置放不下，那么折行
            this.totalColSpan += currentColumns - (this.totalColSpan % currentColumns);
          }
          this.totalColSpan += propertyColspan;
        }
      });
      return ret;
    },
    queryFilterColumnConfig() {
      const { currentColumns, currentDisplayTotalColSpan } = this;
      const currentColspan = 24 / currentColumns;
      let ret = {
        span: currentColspan
      };
      if (!this.isMounted) {
        return ret;
      }
      const leaveSpan = currentColumns - currentDisplayTotalColSpan % currentColumns - 1;
      ret.offset = leaveSpan * currentColspan;
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
      this.expand = !this.expand;
    },
    handleSubmit() {
      const { afterSubmit, model } = this;
      this.$refs.proForm.validate((isValid) => {
        if (isValid) {
          this.isSubmiting = true;
          if (typeof afterSubmit === 'function') {
            const result = afterSubmit(model);
            if (result.then) {
              result.then(() => { this.isSubmiting = false; });
            }
          }
          this.$emit('submit');
        }
      });
    },
    handleReset() {
      this.$refs.proForm.resetFields();
    }
  },
  render(h) {
    const {
      $attrs,
      $listeners,
      // $slots,
      currentColumns,
      expand,
      model,
      isMounted,
      isSubmiting,
      innerUiSchema,
      queryFilterColumnConfig,
      schema,
      totalColSpan,
      type,
      handleExpand
    } = this;
    if (!isMounted) {
      return (<div></div>);
    }
    const attributes = {
      attrs: $attrs,
      listeners: $listeners
    };
    // console.log('------------------------------------------', expand);
    // console.log('当前宽度', widthNumber);
    // console.log('当前每行列数', currentColumns);
    // console.log('元素所占列数总和', currentDisplayTotalColSpan, totalColSpan);
    const getExpandTextLabel = () => {
      return expand
        ? (<div><i class="el-icon-arrow-up"></i><span>收起</span></div>)
        : (<div><i class="el-icon-arrow-down"></i><span>展开</span></div>);
    };
    const getNormalFormControlContainer = () => {
      const { handleSubmit, handleReset } = this;
      return (
        <div class="pro-form-control-button-container" slot="button">
          <el-button type="primary" onClick={handleSubmit} loading={isSubmiting}>提交</el-button>
          <el-button onClick={handleReset}>重置</el-button>
        </div>
      );
    };
    /**
     * 渲染查询筛选的操作区域
     */
    const getQueryFillterControlContainer = () => {
      const { handleSubmit, handleReset } = this;
      return (
        <el-col span={queryFilterColumnConfig.span} offset={queryFilterColumnConfig.offset} slot="formItems" style="text-align: right;">
          <el-button type="primary" onClick={handleSubmit} loading={isSubmiting}>查询</el-button>
          <el-button onClick={handleReset}>重置</el-button>
          <el-button type="text" onClick={handleExpand}>{totalColSpan >= currentColumns ? getExpandTextLabel() : null}</el-button>
        </el-col>
      );
    };
    const getControlButton = () => {
      if (isEmpty(type)) {
        return getNormalFormControlContainer();
      } else if (type === 'queryFilter') {
        return getQueryFillterControlContainer();
      }
      return null;
    };
    return (
      <ElJsonForm
        ref="proForm"
        class="el-pro-form"
        model={model}
        schema={schema}
        uiSchema={innerUiSchema}
        columns={currentColumns}
        {...attributes}>
        { getControlButton() }
      </ElJsonForm>
    );
  },
  components: {
    ElJsonForm
  }
};
