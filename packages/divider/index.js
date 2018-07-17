import ElDivider from './src/divider';

/* istanbul ignore next */
ElDivider.install = function(Vue) {
  Vue.component(ElDivider.name, ElDivider);
};

export default ElDivider;
