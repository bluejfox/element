<template>
  <div
    ref="list"
    class="el-list"
    :class="[
      border && listSize ? 'el-list--' + listSize : '',
      { 'is-bordered': border },
      { 'is-split': split }
    ]">
    <div class="el-list__header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div class="el-list-load-more" v-if="$slots['load-more'] || loadMore" v-show="!loading">
      <slot name="load-more"></slot>
      <span v-if="loadMore && !$slots['load-more']">
        <el-button plain size="medium" @click="handleLoadMoreDefaultButtonClick">
          {{ loadMore }}
        </el-button>
      </span>
    </div>
    <div class="el-list-loading" v-show="loading">
      <div ref="loading" class="el-list-loading__container"></div>
    </div>
    <div class="el-list__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'setaria-ui';
  import merge from 'setaria-ui/src/utils/merge';

  export default {
    name: 'ElList',

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
      loadingConfig: Object
    },

    data() {
      return {
        loadingInstance: null
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
            this.loadingInstance = Loading.service(loadingConfig);
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
      }
    }
  };
</script>
