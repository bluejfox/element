import ProTable from './src/pro-table.js';

/* istanbul ignore next */
ProTable.install = function install(Vue) {
  Vue.component(ProTable.name, ProTable);
};

export default ProTable;
