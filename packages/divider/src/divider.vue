<template>
  <div class="el-divider" :class="[{
    'el-divider-vertical': type === 'vertical',
    'el-divider-horizontal': type === 'horizontal',
    'el-divider-with-text': isHasText,
    'el-divider-with-text-left': orientation === 'left',
    'el-divider-with-text-right': orientation === 'right',
    'el-divider-dashed': dashed === true
  }, customClass]" :style="customStyle">
    <span class="el-divider-inner-text" v-if="isHasText">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'ElDivider',
  props: {
    customClass: String,
    dashed: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    orientation: {
      type: String,
      default: 'center',
      validator(val) {
        return ['center', 'left', 'right'].indexOf(val) !== -1;
      }
    },
    customStyle: Object
  },
  computed: {
    isHasText() {
      return this.$slots.default !== undefined;
    }
  }
};
</script>
