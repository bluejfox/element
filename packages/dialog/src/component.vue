<template>
  <transition name="dialog-fade">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick" :style="wrapperStyle" ref="dialogWrapper">
      <div
        class="el-dialog"
        :class="[sizeClass, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{title}}</span>
          </slot>
          <button type="button" class="el-dialog__headerbtn" aria-label="Close"
                  v-if="showClose" @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered">
          <slot v-if="isShowContent"></slot>
        </div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Draggabilly from 'draggabilly';
  import Popup from 'setaria-ui/src/utils/popup';
  import emitter from 'setaria-ui/src/mixins/emitter';

  export default {
    name: 'ElDialog',

    mixins: [Popup, emitter],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      size: {
        type: String,
        default: 'small'
      },

      customClass: {
        type: String,
        default: ''
      },

      beforeClose: Function,

      top: String,

      cache: {
        type: Boolean,
        default: false
      },

      dragable: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        isShowContent: true
      };
    },

    watch: {
      visible(val) {
        this.$emit('update:visible', val);
        if (val) {
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          // 需要对对话框内容进行缓存的场合
          if (!this.cache) {
            // 清空对话框内容
            this.clearBodyContent();
          }
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
            if (!this.cache) {
              this.isShowContent = val;
            }
          });
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          this.$emit('close');
        }
      }
    },

    computed: {
      sizeClass() {
        return `el-dialog--${ this.size }`;
      },
      wrapperStyle() {
        let ret = {};
        if (this.size !== 'full' && !this.top) {
          ret = {
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center'
          };
        }
        return ret;
      },
      style() {
        let ret = {};
        if (this.size !== 'full' && this.top) {
          ret = { 'top': this.top };
        }
        return ret;
      }
    },

    created() {
      /*eslint no-new: "error"*/
      this.$nextTick(() => {
        if (this.dragable) {
          /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "drag" }]*/
          const drag = new Draggabilly(this.$refs.dialog, {
            containment: this.$refs.dialogWrapper,
            handle: '.el-dialog__header'
          });
        }
      });
    },

    methods: {
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('visible-change', false);
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      clearBodyContent() {
        this.isShowContent = false;
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
      }
    }
  };
</script>
