<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      class="el-dialog__wrapper"
      v-show="visible"
      @click.self="handleWrapperClick"
      :style="wrapperStyle"
      ref="dialogWrapper">
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        class="el-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <button
          type="button"
          class="el-dialog__headerbtn"
          aria-label="Close"
          v-if="showClose"
          @click="handleClose">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
        <div class="el-dialog__header" v-if="$slots.title || title !== ''">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
        </div>
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
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
  import Migrating from 'setaria-ui/src/mixins/migrating';
  import emitter from 'setaria-ui/src/mixins/emitter';

  export default {
    name: 'ElDialog',

    mixins: [Popup, emitter, Migrating],

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

      appendToBody: {
        type: Boolean,
        default: false
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

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
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
        closed: false
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
        }
      }
    },

    computed: {
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
        let style = {};
        if (!this.fullscreen) {
          style.marginTop = this.top;
          if (this.width) {
            style.width = this.width;
          }
        }
        return style;
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
          drag.on('dragStart', (e, pointer) => {
            this.$emit('drag-start', e, pointer);
          });
          drag.on('dragMove', (e, pointer, moveVector) => {
            this.$emit('drag-move', e, pointer, moveVector);
          });
          drag.on('dragEnd', (e, pointer) => {
            this.$emit('drag-end', e, pointer);
          });
        }
      });
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
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
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
