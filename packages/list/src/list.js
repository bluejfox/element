import Locale from 'setaria-ui/src/mixins/locale';
import merge from 'setaria-ui/src/utils/merge';
import { getComponentName } from 'setaria-ui/src/utils/vdom';

export default {
  name: 'ElList',

  mixins: [Locale],

  componentName: 'ElList',

  provide() {
    return {
      elList: this
    };
  },

  props: {
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    split: {
      type: Boolean,
      default: true
    },
    loadMore: String,
    loading: Boolean,
    loadingConfig: Object,
    itemLayout: String,
    grid: Object,
    emptyText: String
  },

  data() {
    return {
      loadingInstance: null,
      items: []
    };
  },

  computed: {
    listSize() {
      return this.size !== 'medium' ? this.size : '';
    }
  },

  watch: {
    loading(val) {
      if (val) {
        this.$nextTick(() => {
          let loadingConfig = {
            target: this.$refs.loading,
            spinner: 'el-icon-loading'
          };
          if (this.loadingConfig) {
            loadingConfig = merge(loadingConfig, this.loadingConfig);
          }
          this.loadingInstance = this.$loading(loadingConfig);
        });
      } else if (this.loadingInstance) {
        this.loadingInstance.close();
      }
    }
  },

  methods: {
    handleLoadMoreDefaultButtonClick() {
      this.$emit('update:loading', true);
      this.$emit('load-more-click');
    },
    /**
     * 取得ListItem子组件列表
     */
    getListItemChildren() {
      let ret = [];
      if (this.$slots.default) {
        this.$slots.default.forEach(node => {
          if (getComponentName(node) === 'ElListItem') {
            ret.push(node);
          }
        });
      }
      return ret;
    }
  },

  render(h) {
    const listItemChildren = this.getListItemChildren();
    return (
      <div
        ref="list"
        class={
          [
            'el-list',
            this.border && this.listSize ? 'el-list--' + this.listSize : '',
            { 'is-bordered': this.border },
            { 'is-split': this.split },
            { 'is-vertical': this.itemLayout === 'vertical' }
          ]
        }>
        {
          this.$slots.header ? (
            <div class="el-list__header">
              { this.$slots.header }
            </div>) : ''
        }
        {
          listItemChildren.length > 0 && this.grid ? (
            <el-row
              gutter={ typeof this.grid.gutter === 'number' ? this.grid.gutter : 0 }>
              {
                this._l(listItemChildren, node => (
                  <el-col
                    span={ typeof this.grid.column === 'number' ? 24 / this.grid.column : -1 }
                    xl={ typeof this.grid.xl === 'number' ? 24 / this.grid.xl : -1 }
                    lg={ typeof this.grid.xl === 'number' ? 24 / this.grid.lg : -1 }
                    md={ typeof this.grid.xl === 'number' ? 24 / this.grid.md : -1 }
                    sm={ typeof this.grid.xl === 'number' ? 24 / this.grid.sm : -1 }
                    xs={ typeof this.grid.xl === 'number' ? 24 / this.grid.xs : -1 }>
                    { node }
                  </el-col>
                ))
              }
            </el-row>
          ) : listItemChildren.length > 0 ? (
            this._l(listItemChildren, node => node)
          ) : (
            <div class="el-list__empty-text">
              {
                this.$slots.empty ? this.$slots.empty : (this.emptyText || this.t('el.list.emptyText'))
              }
            </div>
          )
        }
        {
          this.$slots['load-more'] || this.loadMore ? (
            <div class="el-list-load-more" v-show={!this.loading}>
              <slot name="load-more"></slot>
              {
                (this.loadMore && !this.$slots['load-more']) ? (
                  <span>
                    <el-button plain size="medium"
                      onClick={ this.handleLoadMoreDefaultButtonClick }>
                      { this.loadMore }
                    </el-button>
                  </span>
                ) : ''
              }
            </div>
          ) : ''
        }
        {
          <div class="el-list-loading" v-show={this.loading}>
            <div ref="loading" class="el-list-loading__container"></div>
          </div>
        }
        {
          this.$slots.footer ? (
            <div class="el-list__footer">
              { this.$slots.footer }
            </div>
          ) : ''
        }
      </div>
    );
  }
};
