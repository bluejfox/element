import ElQueryFilter from './src/query-filter.js';

/* istanbul ignore next */
ElQueryFilter.install = function(Vue) {
  Vue.component(ElQueryFilter.name, ElQueryFilter);
};

export default ElQueryFilter;
