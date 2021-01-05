import Statistics from './src/main.js';

/* istanbul ignore next */
Statistics.install = function(Vue) {
  Vue.component(Statistics.name, Statistics);
};

export default Statistics;
