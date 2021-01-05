import ElTagSelectItem from '../tag-select/src/tag-select-item';

/* istanbul ignore next */
ElTagSelectItem.install = function(Vue) {
  Vue.component(ElTagSelectItem.name, ElTagSelectItem);
};

export default ElTagSelectItem;
