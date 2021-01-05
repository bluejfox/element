import ElTagSelect from './src/tag-select';

/* istanbul ignore next */
ElTagSelect.install = function(Vue) {
  Vue.component(ElTagSelect.name, ElTagSelect);
};

export default ElTagSelect;
