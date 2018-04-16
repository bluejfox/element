import ElListItemMeta from '../list/src/list-item-meta';

/* istanbul ignore next */
ElListItemMeta.install = function(Vue) {
  Vue.component(ElListItemMeta.name, ElListItemMeta);
};

export default ElListItemMeta;
