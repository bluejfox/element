import ElJsonViewer from './src/json-viewer';

/* istanbul ignore next */
ElJsonViewer.install = function(Vue) {
  Vue.component(ElJsonViewer.name, ElJsonViewer);
};

export default ElJsonViewer;
