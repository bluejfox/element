import CardActionItem from '../card/src/card-action-item';

/* istanbul ignore next */
CardActionItem.install = function(Vue) {
  Vue.component(CardActionItem.name, CardActionItem);
};

export default CardActionItem;
