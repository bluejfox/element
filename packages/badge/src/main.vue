<template>
  <div class="el-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        v-if="status == ''"
        :class="[
          'el-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot
          }
        ]">
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
        return ['success', 'processing', 'default', 'error', 'warning', ''].indexOf(value) !== -1;
      },
      default: ''
    },
    text: String,
    type: {
      type: String,
      validator(val) {
        return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1;
      }
    }
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
