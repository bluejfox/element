<template>
  <div class="el-card" :class="[
    shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow',
    collapse ? 'is-collapse' : '',
    cardSize ? 'el-card--' + cardSize : '',
    type ? `el-card--${type}` : ''
  ]">
    <div :class="['el-card__header', tabList ? 'is-tab' : '']"
         ref="header"
         v-if="$slots.header || header || tabList"
         @click="handleHeaderClick">
      <a class="header__expander" v-if="collapse" @click.stop="handleExpandIconClick">
        <i :class="{'el-icon-arrow-down': !innerExpand, 'el-icon-arrow-up': innerExpand}"></i>
      </a>
      <div @click.stop="handleHeaderClick" ref="headerContainer">
        <slot name="header">
          {{ header }}
        </slot>
      </div>
      <div class="el-tabs__header is-top" v-if="tabList">
        <tab-nav :data="tabList" :onTabClick="handleTabClick"
          :active-tab-name="activeTabName"></tab-nav>
      </div>
    </div>
    <div class="el-card__cover" v-if="$slots.cover">
      <slot name="cover"></slot>
    </div>
    <el-collapse-transition v-if="collapse">
      <div class="el-card__body" :style="bodyStyle" v-if="$slots.default" v-show="innerExpand">
        <slot></slot>
      </div>
    </el-collapse-transition>
    <template v-else>
      <div class="el-card__body" :style="bodyStyle" v-if="$slots.default">
        <slot></slot>
      </div>
    </template>
    <ul class="el-card__actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </ul>
  </div>
</template>

<script>
  import TabNav from 'setaria-ui/packages/tab-nav';
  
  function getParentNode(dom, level) {
    let ret = [];
    if (dom) {
      for (let i = 0; i < level; i++) {
        if (i === 0) {
          ret.push(dom.parentNode);
        } else if (ret[ret.length - 1]) {
          ret.push(ret[ret.length - 1].parentNode);
        }
      }
    }
    return ret;
  }

  export default {
    name: 'ElCard',
    componentName: 'ElCard',
    provide() {
      return {
        elCard: this
      };
    },
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      },
      activeTabName: null,
      tabList: null,
      type: String,
      size: String,
      collapse: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        actionItemList: [],
        innerExpand: true
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          this.innerExpand = val;
        }
      },
      innerExpand(val) {
        this.$emit('input', val);
      }
    },
    computed: {
      cardSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },
    created() {
      this.$on('el.card.addActionItem', (actionItem) => {
        if (actionItem) {
          this.actionItemList.push(actionItem);
        }
      });
    },
    methods: {
      handleExpandIconClick() {
        this.innerExpand = !this.innerExpand;
      },
      handleHeaderClick(e) {
        if (e && e.target) {
          let triggerExpand = false;
          if (e.target === this.$refs.header) {
            triggerExpand = true;
          }
          const parentNodeList = getParentNode(e.target, 2);
          if (e.target !== this.$refs.header && parentNodeList.length > 0) {
            if (parentNodeList[0] === this.$refs.headerContainer ||
              parentNodeList[0] === this.$refs.header) {
                triggerExpand = true;
            }
          }
          // 自定义header slot插槽的场合
          if (!triggerExpand && parentNodeList.length > 1 && (parentNodeList[1] === this.$refs.headerContainer)) {
            triggerExpand = true;
          }
          if (triggerExpand) {
            // 触发卡片内容折叠事件
            this.handleExpandIconClick();
          }
        }
      },
      handleTabClick(tab, ev) {
        this.$emit('tab-click', tab, ev);
        this.$emit('update:activeTabName', tab.name);
      }
    },
    components: {
      TabNav
    }
  };
</script>
