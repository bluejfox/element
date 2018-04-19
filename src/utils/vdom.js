import { hasOwn } from 'setaria-ui/src/utils/util';

export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

export function getFirstComponentChild(children) {
  return children && children.filter(c => c && c.tag)[0];
};

export function getComponentName(node) {
  return isVNode(node) ? node.componentOptions.Ctor.options.componentName : '';
}
