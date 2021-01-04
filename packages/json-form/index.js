import JsonForm from './src/json-form';

/* istanbul ignore next */
JsonForm.install = function install(Vue) {
  Vue.component(JsonForm.name, JsonForm);
};

export default JsonForm;
