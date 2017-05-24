<template>
  <transition name="dialog-fade">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick"
      :style="wrapperStyle" ref="dialogWrapper">
      <div
        class="el-dialog"
        :class="[sizeClass, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{title}}</span>
          </slot>
          <div class="el-dialog__headerbtn">
            <i v-if="showClose" class="el-dialog__close el-icon el-icon-close" @click='close()'></i>
          </div>
        </div>
        <div class="el-dialog__body" v-if="rendered">
          <slot v-if="isCacheDialogContent"></slot>
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

      top: String,

      cache: {
        type: Boolean,
        default: true
      },

      dragable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        visible: false
      };
    },

    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
        if (val) {
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
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
      },
      isCacheDialogContent() {
        let ret = this.cache;
        if (!ret) {
          ret = this.value;
        }
        return ret;
      }
    },

    created() {
      /*eslint no-new: "error"*/
      this.$nextTick(() => {
        if (this.dragable) {
          const drag = new Draggabilly(this.$refs.dialog, {
            containment: this.$refs.dialogWrapper
          });
        }
      });
    },

    methods: {
      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.close();
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.open();
      }
    }
  };
</script>
