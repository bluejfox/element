<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div :class="['el-card__header', tabList ? 'is-tab' : '']" v-if="$slots.header || header || tabList">
      <slot name="header">{{ header }}</slot>
      <div class="el-tabs__header is-top" v-if="tabList">
        <tab-nav :data="tabList" :onTabClick="handleTabClick"
          :active-tab-name="activeTabName"></tab-nav>
      </div>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import TabNav from 'setaria-ui/packages/tab-nav';
  
  export default {
    name: 'ElCard',
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      },
      activeTabName: null,
      tabList: null
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
