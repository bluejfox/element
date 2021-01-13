import ProForm from './src/pro-form.js';

/* istanbul ignore next */
ProForm.install = function install(Vue) {
  Vue.component(ProForm.name, ProForm);
};

export default ProForm;
