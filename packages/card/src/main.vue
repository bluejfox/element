<template>
  <div class="el-card" :class="[
    shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow',
    type ? `el-card--${type}` : ''
  ]">
    <div :class="['el-card__header', tabList ? 'is-tab' : '']" v-if="$slots.header || header || tabList">
      <slot name="header">{{ header }}</slot>
      <div class="el-tabs__header is-top" v-if="tabList">
        <tab-nav :data="tabList" :onTabClick="handleTabClick"
          :active-tab-name="activeTabName"></tab-nav>
      </div>
    </div>
    <div class="el-card__cover" v-if="$slots.cover">
      <slot name="cover"></slot>
    </div>
    <div class="el-card__body" :style="bodyStyle" v-if="$slots.default">
      <slot></slot>
    </div>
    <ul class="el-card__actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </ul>
  </div>
</template>

<script>
  import TabNav from 'setaria-ui/packages/tab-nav';
  
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
      type: String
    },
    data() {
      return {
        actionItemList: []
      };
    },
    created() {
      this.$on('el.card.addActionItem', (actionItem) => {
        if (actionItem) {
          this.actionItemList.push(actionItem);
        }
      });
    },
    methods: {
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
