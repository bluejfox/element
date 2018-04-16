import ElList from './src/list';

/* istanbul ignore next */
ElList.install = function(Vue) {
  Vue.component(ElList.name, ElList);
};

export default ElList;
