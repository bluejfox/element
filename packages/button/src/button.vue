<template>
  <a
    v-if="href"
    v-bind="anchorProps"
    class="el-button"
    @click="handleAnchorClick"
    :disabled="buttonDisabled || loading"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </a>
  <button
    v-else
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
      href: String,
      target: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },
      anchorProps() {
        const { href, target, download, hreflang, ping, referrerpolicy, rel, nativeType } = this;
        return {
          href,
          target,
          download,
          hreflang,
          ping,
          referrerpolicy,
          rel,
          type: nativeType
        };
      }
    },

    methods: {
      handleAnchorClick(evt) {
        if (this.disabled) {
          // 阻止链接默认动作继续执行
          evt.preventDefault();
          // 阻止当前事件的进一步冒泡行为
          evt.stopPropagation();
          return;
        }
        this.handleClick(evt);
      },
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
