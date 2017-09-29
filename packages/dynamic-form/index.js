import DynamicForm from './src/dynamic-form';

/* istanbul ignore next */
DynamicForm.install = function(Vue) {
  Vue.component(DynamicForm.name, DynamicForm);
};

export default DynamicForm;
