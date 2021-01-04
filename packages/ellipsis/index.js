import Ellipsis from './src/main';

/* istanbul ignore next */
Ellipsis.install = function(Vue) {
  Vue.component(Ellipsis.name, Ellipsis);
};

export default Ellipsis;
