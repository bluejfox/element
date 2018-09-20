import CardMeta from '../card/src/card-meta';

/* istanbul ignore next */
CardMeta.install = function(Vue) {
  Vue.component(CardMeta.name, CardMeta);
};

export default CardMeta;
