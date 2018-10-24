import ElAvatar from './src/avatar';

/* istanbul ignore next */
ElAvatar.install = function(Vue) {
  Vue.component(ElAvatar.name, ElAvatar);
};

export default ElAvatar;
