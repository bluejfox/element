<template>
  <span
    ref="avatar"
    class="el-avatar"
    :class="[
      size ? `el-avatar--${size}` : '',
      `el-avatar--${shape}`,
      isImgExist ? 'el-avatar--image' : '',
    ]">
    <template v-if="icon">
      <i :class="icon"></i>
    </template>
    <template v-else-if="isImgExist">
      <img :src="src" :alt="alt" @error="handleImgOnError"/>
    </template>
    <span
      ref="textNode"
      class="el-avatar--text"
      :style="textNodeStyle"
      v-else>
      {{ text }}
    </span>
  </span>
</template>
<script>
export default {
  name: 'ElAvatar',
  props: {
    icon: String,
    shape: {
      type: String,
      default: 'circle',
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['circle', 'square'].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: '',
      validator(value) {
        return ['medium', 'small', ''].indexOf(value) !== -1;
      }
    },
    src: String,
    alt: String,
    text: String,
    imgLoadError: {
      type: Function,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      scale: 1,
      textNodeStyle: {},
      imgLoadErrorFlag: false
    };
  },
  computed: {
    isImgExist() {
      return this.src && !this.imgLoadErrorFlag;
    }
  },
  mounted() {
    this.setScale();
    this.$nextTick(() => {
      this.setTextNodeStyle();
    });
  },
  watch: {
    'text': {
      handler(val) {
        this.$nextTick(() => {
          this.setScale();
          this.$nextTick(() => {
            this.setTextNodeStyle();
          });
        });
      }
    }
  },
  methods: {
    setScale() {
      if (this.text !== undefined && this.text !== null) {
        const textNode = this.$refs.textNode;
        if (textNode) {
          const textNodeWidth = textNode.offsetWidth;
          const avatarNode = this.$refs.avatar;
          const avatarWidth = avatarNode.getBoundingClientRect().width;
          // add 4px gap for each side to get better performance
          if (avatarWidth - 8 < textNodeWidth) {
            this.scale = (avatarWidth - 8) / textNodeWidth;
          } else {
            this.scale = 1;
          }
        }
      }
    },
    setTextNodeStyle() {
      const scale = this.scale;
      this.textNodeStyle = {
        msTransform: `scale(${scale})`,
        WebkitTransform: `scale(${scale})`,
        transform: `scale(${scale})`,
        position: 'absolute',
        display: 'inline-block'
      };
      this.setTextPosition();
    },
    setTextPosition() {
      if (this.$refs.textNode) {
        this.textNodeStyle.left =
          `calc(50% - ${Math.round(this.$refs.textNode.offsetWidth / 2)}px)`;
      }
    },
    handleImgOnError(evt) {
      const { imgLoadError } = this;
      let ret = null;
      if (typeof imgLoadError === 'function') {
        ret = imgLoadError();
      }
      this.imgLoadErrorFlag = ret !== false;
    }
  }
};
</script>
