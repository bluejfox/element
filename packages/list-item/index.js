import ElListItem from '../list/src/list-item';

/* istanbul ignore next */
ElListItem.install = function(Vue) {
  Vue.component(ElListItem.name, ElListItem);
};

export default ElListItem;
