<template>
  <div class="el-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        :class="{ 'is-fixed': $slots.default, 'is-dot': isDot }"
        v-if="status == ''">
      </sup>
      <span
        class="el-badge__status-dot"
        :class="[`el-badge__status-${status}`]"
        v-else>
      </span>
    </transition>
    <span class="el-badge__status-text" v-if="status !== ''">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'ElBadge',

  props: {
    value: {},
    max: Number,
    isDot: Boolean,
    hidden: Boolean,
    status: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'processing', 'default', 'error', 'warning'].indexOf(value) !== -1;
      },
      default: ''
    },
    text: String
  },

  computed: {
    content() {
      if (this.isDot) return;

      const value = this.value;
      const max = this.max;

      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }

      return value;
    }
  }
};
</script>
