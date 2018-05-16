import TabNav from './src/tab-nav.vue';

/* istanbul ignore next */
TabNav.install = function(Vue) {
  Vue.component(TabNav.name, TabNav);
};

export default TabNav;
