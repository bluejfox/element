<template>
  <div class="el-query-criteria-form">
    <el-row v-for="(criteria, index) in innerValue"
            :key="`${criteria.field}-${index}`"
            class="el-query-criteria-form__row"
            :gutter="10">
      <el-col :span="7">
        <el-select v-model="criteria.field"
                   @change="handleFieldChange(criteria)">
          <el-option v-for="item in conditionItemList"
                     :key="item.key"
                     :label="item.title"
                     :value="item.key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-select v-model="criteria.operator"
                   @change="handleOperatorChange(criteria)">
          <el-option v-for="item in getOperatorList(criteria.field)"
                     :key="`${criteria.field}-${index}-${item.label}-${item.value}`"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <template v-if="isShowCriteriaValue(criteria.operator)">
          <template v-if="isExistCustomRender(criteria.field)">
            <slot :name="criteria.field" v-bind="{'criteria': criteria}"></slot>
          </template>
          <criteria-value v-model="criteria.value"
                          v-else
                          :field="criteria.field"
                          :operator="criteria.operator"
                          @change="handleCriteriaValueChange"
                          :schema="getSchemaPropertyBykey(criteria.field)"/>
        </template>
      </el-col>
      <el-col :span="2" class="row__control">
        <div class="control__button control__plus"
             @click="handlePlusCriteria(criteria)">
          <i class="control__icon el-icon-plus"/>
        </div>
        <div class="control__button control__minus"
             v-if="index !== 0"
             @click="handleMinusCriteria(criteria)">
          <i class="control__icon el-icon-minus"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElCol from 'setaria-ui/packages/col';
import ElOption from 'setaria-ui/packages/option';
import ElRow from 'setaria-ui/packages/row';
import ElSelect from 'setaria-ui/packages/select';
import { arrayFind, arrayFindIndex, isEmpty } from 'setaria-ui/src/utils/util';
import { getOperatorListByField, OPERATOR, OPERATOR_LIST } from './common';
import CriteriaValue from './criteria-value';

// const UI_RENDER = 'ui:render';

class Criteria {
  constructor(field, operator, value) {
    this.field = field;
    this.operator = operator ? getOperatorValueByKey(operator) : operator;
    this.value = value;
  }
}

function getOperatorValueByKey(operatorKey) {
  return arrayFind(OPERATOR_LIST, item => item.value === operatorKey).value;
}

function getInitialCriteria(field) {
  return new Criteria(field, OPERATOR.IS, null);
}

export default {
  name: 'ElQueryCriteriaForm',

  componentName: 'ElQueryCriteriaForm',

  provide() {
    return {
      elQueryCriteriaForm: this
    };
  },

  components: {
    CriteriaValue,
    ElCol,
    ElOption,
    ElRow,
    ElSelect
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    uiSchema: Object,
    // { field: [''] }
    excludeOperators: Object,
    value: Array
  },
  data() {
    return {
      innerValue: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!isEmpty(val)) {
          this.innerValue = val;
        } else {
          this.innerValue = [];
        }
      }
    },
    innerValue(val) {
      this.$emit('input', val);
    }
  },
  computed: {
    conditionItemList() {
      const ret = [];
      const { schema } = this;
      const { properties } = schema;
      Object.keys(properties).forEach(key => {
        ret.push({
          key,
          ...properties[key]
        });
      });
      return ret;
    }
  },
  created() {
    const { innerValue, schema } = this;
    const { properties } = schema;
    if (isEmpty(innerValue)) {
      const firstPropertyKey = Object.keys(properties)[0];
      this.innerValue.push(new Criteria(firstPropertyKey, OPERATOR.IS, null));
    }
  },
  methods: {
    isExistCustomRender(field) {
      return this.$scopedSlots[field];
      // const { uiSchema } = this;
      // return uiSchema && !isEmpty(uiSchema[field]) && !isEmpty(uiSchema[field][UI_RENDER]);
    },
    getCustomRenderByField(criteria) {
      const { uiSchema } = this;
      const { field } = criteria;
      const UI_RENDER = 'ui:render';
      if (this.isExistCustomRender(field)) {
        return uiSchema[field][UI_RENDER](criteria);
      }
      return null;
    },
    getOperatorList(field) {
      const { excludeOperators, schema } = this;
      const { properties } = schema;
      const exclude = excludeOperators ? excludeOperators[field] : null;
      return getOperatorListByField(properties[field], exclude);
    },
    getSchemaPropertyBykey(key) {
      console.log(key, this.schema.properties[key]);
      return this.schema.properties[key];
    },
    isShowCriteriaValue(operator) {
      if (operator === OPERATOR.IS_NULL ||
        operator === OPERATOR.IS_NOT_NULL) {
        return false;
      }
      return true;
    },
    handleFieldChange(criteria) {
      criteria.value = null;
    },
    handleOperatorChange(criteria) {
      // 不显示值输入组件时，清空值
      if (!this.isShowCriteriaValue(criteria.operator)) {
        criteria.value = null;
      }
    },
    handlePlusCriteria(criteria) {
      const currentIndex = arrayFindIndex(this.innerValue, item => item === criteria);
      this.innerValue.splice(currentIndex + 1, 0, getInitialCriteria(criteria.field));
    },
    handleMinusCriteria(criteria) {
      const index = arrayFindIndex(this.innerValue, item => item === criteria);
      this.innerValue.splice(index, 1);
    },
    handleCriteriaValueChange(val) {
    }
  }
};
</script>
