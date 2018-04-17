<template>
  <div
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
    <div class="el-list__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
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
      }
    },

    computed: {
      listSize() {
        return this.size !== 'medium' ? this.size : '';
      }
    }
  };
</script>
