import { arrayFindIndex, isEmpty } from 'setaria-ui/src/utils/util';

export const OPERATOR = {
  IS: '0',
  IS_NULL: '1',
  IS_NOT_NULL: '13',
  NOT_IN: '2',
  BETWEEN: '3',
  BEFORE: '4',
  BEFORE_THAN: '5',
  AFTER: '6',
  AFTER_THAN: '7',
  SMALL: '8',
  SMALL_THAN: '9',
  LARGE: '10',
  LARGE_THAN: '11',
  CONTAIN: '12'
};

export const OPERATOR_LIST = [
  {
    label: '是',
    value: OPERATOR.IS
  },
  {
    label: '为空',
    value: OPERATOR.IS_NULL
  },
  {
    label: '非空',
    value: OPERATOR.IS_NOT_NULL
  },
  {
    label: '介于',
    value: OPERATOR.BETWEEN,
    types: ['number', 'date', 'datetime', 'time']
  },
  {
    label: '早于',
    value: OPERATOR.BEFORE,
    types: ['date', 'datetime', 'time']
  },
  {
    label: '早于或处于',
    value: OPERATOR.BEFORE_THAN,
    types: ['date', 'datetime', 'time']
  },
  {
    label: '晚于',
    value: OPERATOR.AFTER,
    types: ['date', 'datetime', 'time']
  },
  {
    label: '晚于或处于',
    value: OPERATOR.AFTER_THAN,
    types: ['date', 'datetime', 'time']
  },
  {
    label: '小于',
    value: OPERATOR.SMALL,
    types: ['number']
  },
  {
    label: '小于或等于',
    value: OPERATOR.SMALL_THAN,
    types: ['number']
  },
  {
    label: '大于',
    value: OPERATOR.LARGE,
    types: ['number']
  },
  {
    label: '大于或等于',
    value: OPERATOR.LARGE_THAN,
    types: ['number']
  },
  {
    label: '包含',
    value: OPERATOR.CONTAIN,
    types: ['string']
  }
];

function getDisplayTypeBySchema(property) {
  let ret = 'string';
  if (property.type === 'number') {
    ret = property.type;
  } else if (property.format === 'date' || property.format === 'datetime') {
    ret = 'date';
  }
  return ret;
}

export function getOperatorListByField(property, excludeOperators) {
  const ret = [];
  const displayType = getDisplayTypeBySchema(property);
  OPERATOR_LIST.forEach(o => {
    if (isEmpty(o.types) ||
      (!isEmpty(o.types) && arrayFindIndex(o.types, type => type === displayType) !== -1)) {
      if (isEmpty(excludeOperators) ||
        (!isEmpty(excludeOperators) && arrayFindIndex(excludeOperators, oper => oper === o.value) === -1)) {
        ret.push(o);
      }
    }
  });
  return ret;
}
