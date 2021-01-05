import ElConditionFilter from './src/condition-filter.js';

/* istanbul ignore next */
ElConditionFilter.install = function(Vue) {
  Vue.component(ElConditionFilter.name, ElConditionFilter);
};

export default ElConditionFilter;
