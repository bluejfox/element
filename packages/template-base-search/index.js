import TemplateBaseSearch from './src/template-base-search';

/* istanbul ignore next */
TemplateBaseSearch.install = function(Vue) {
  Vue.component(TemplateBaseSearch.name, TemplateBaseSearch);
};

export default TemplateBaseSearch;
