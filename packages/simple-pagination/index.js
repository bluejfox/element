import SimplePagination from './src/simple-pagination';

/* istanbul ignore next */
SimplePagination.install = function(Vue) {
  Vue.component(SimplePagination.name, SimplePagination);
};

export default SimplePagination;
