<template>
  <div class="el-query-criteria-form-value"
      :class="{
        'is-compact': isNeedCompact
      }">
    <template v-if="isInOperator">
      <el-select v-model="inValue"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  @change="onInConditionInputChange"
                  class="criteria-value-in-input"
                  popper-class="criteria-value-in-input-popper">
      </el-select>
    </template>
    <template v-else>
      <el-json-form :model="innerValue"
                    :schema="innerSchema"
                    :ui-schema="innerUiSchema"
                    :columns="1"
                    class="form"
                    @change="onChange"
                    @submit.native="onSubmit">
      </el-json-form>
      <template v-if="isNeedCompact">
        <div class="separator">~</div>
        <el-json-form :model="innerValue1"
                      :schema="innerSchema"
                      :ui-schema="innerUiSchema"
                      :columns="1"
                      class="form"
                      @change="onChange1"
                      @submit.native="onSubmit">
        </el-json-form>
      </template>
    </template>
  </div>
</template>
<script>
import _ from 'lodash';
import ElSelect from 'setaria-ui/packages/select';
import ElJsonForm from 'setaria-ui/packages/json-form';
import { OPERATOR } from './common';

/**
 * 根据项目的schema取得对应的默认值
 */
function getDefaultValueByItemSchema(schema) {
  let ret = null;
  const { property } = schema;
  switch (property.type) {
    case 'string':
      ret = null;
      break;
    case 'array':
      ret = [];
      break;
    default:
      ret = null;
  }
  return ret;
}

export default {
  name: 'ELCriteriaValue',
  inject: ['elQueryCriteriaForm'],
  components: {
    ElJsonForm,
    ElSelect
  },
  props: {
    field: String,
    schema: Object,
    uiSchema: Object,
    operator: String,
    value: null
  },
  data() {
    return {
      innerValue: {},
      innerValue1: {},
      innerSchema: {},
      // in操作符的场合，使用如下变量保存输入值
      inValue: [],
      innerUiSchema: {}
    };
  },
  computed: {
    isNeedCompact() {
      // 日期类型组件默认支持组合
      return this.isBetweenOperator &&
        !this.isDateTimeType();
    },
    isNullOperator() {
      return this.operator === OPERATOR.IS_NULL ||
        this.operator === OPERATOR.IS_NOT_NULL;
    },
    isInOperator() {
      return this.operator === OPERATOR.IN ||
        this.operator === OPERATOR.NOT_IN;
    },
    isBetweenOperator() {
      return this.operator === OPERATOR.BETWEEN ||
        this.operator === OPERATOR.NOT_BETWEEN;
    }
  },
  watch: {
    value: {
      // immediate: true,
      handler(val) {
        this.initInnerValue(val);
      }
    },
    operator(val, oldVal) {
      // 解决在父组件Table刷新的情况下，值被清空的问题
      if (oldVal !== undefined) {
        this.resetInnerValue();
      }
      // 同步schema
      this.syncComponentTypeByOperator();
    },
    schema: {
      // immediate: true,
      deep: true,
      handler(val, oldVal) {
        // 解决在父组件Table刷新的情况下，值被清空的问题
        this.initSchema(oldVal !== undefined);
      }
    }
  },
  mounted() {
    this.initSchema();
    this.initInnerValue(this.value);
  },
  methods: {
    initInnerValue(val) {
      if (this.isNullOperator) {
        this.inValue = null;
      } else if (this.isInOperator) {
        this.inValue = val || [];
      } else if (this.isNeedCompact) {
        let val1 = null;
        let val2 = null;
        if (_.isArray(val)) {
          val1 = val[0] || null;
          val2 = val[1] || null;
        }
        this.$set(this.innerValue, this.field, val1);
        this.$set(this.innerValue1, this.field, val2);
      } else {
        this.$set(this.innerValue, this.field, val);
      }
    },
    initSchema(isResetValue) {
      const val = this.schema;
      if (isResetValue) {
        this.resetInnerValue();
      }
      const property = _.cloneDeep(val);
      const { field } = this;
      const schema = {
        properties: {
          [field]: property
        }
      };
      schema.required = [];
      // 同步schema
      this.innerSchema = {};
      this.innerSchema = schema;
      this.syncComponentTypeByOperator();
    },
    resetInnerValue() {
      const { schema: property, isInOperator, isNullOperator } = this;
      this.initInnerValue(getDefaultValueByItemSchema({ property }));
      if (isNullOperator || isInOperator) {
        this.$emit('input', this.inValue);
      } else {
        this.$emit('input', this.innerValue[this.field]);
      }
    },
    syncComponentTypeByOperator() {
      const schema = this.innerSchema;
      if (this.isDateTimeType(schema)) {
        const property = this.innerSchema.properties[this.field];
        // BETWEEN场合
        if (this.isBetweenOperator) {
          property.type = 'array';
        } else {
          property.type = 'string';
        }
      }
    },
    onChange(field, value) {
      if (this.isNeedCompact) {
        const { field } = this;
        const val1 = value;
        const val2 = this.innerValue1[field];
        this.$emit('input', [val1, val2]);
      } else {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
    onChange1(field, value) {
      const val1 = this.innerValue[field];
      const val2 = value;
      this.$emit('input', [val1, val2]);
    },
    onInConditionInputChange(val = []) {
      const { field, schema } = this;
      // 检查数据类型（数字、日期）
      if (!_.isEmpty(val)) {
        const inputVal = val[val.length - 1];
        const propertyType = schema[field];
        // 类型不符合的场合，不允许输入
        if (propertyType === 'integer' || propertyType === 'number') {
          // 应输入数字的场合
          const testStr = _.trim(inputVal);
          // 整数正则
          const integerRegExp = new RegExp(/^[1-9][0-9]*$/);
          // 数字正则
          // const decimalRegExp = new RegExp(/^(-)?[1-9][0-9]*(\.\d+)?$/);
          // console.log(
          //   _.toString(_.toNumber(testStr)),
          //   testStr,
          //   _.toString(_.toNumber(testStr)) === testStr,
          // );
          // ! FIXME 00.1是可以输入的
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(_.toNumber(testStr))) {
            // this.showWarningMessage(new Message('MBM017W').getMessage());
            this.inValue = _.slice(this.inValue, 0, this.inValue.length - 1);
          // 应输入整数的场合
          } else if (propertyType === 'integer' && integerRegExp.exec(testStr) === null) {
            // this.showWarningMessage(new Message('MBM018W').getMessage());
            this.inValue = _.slice(this.inValue, 0, this.inValue.length - 1);
          } else {
            this.inValue[this.inValue.length - 1] = inputVal;
          }
        }
      }
      this.$emit('input', this.inValue);
    },
    // showWarningMessage(message) {
    //   this.$message({
    //     message,
    //     duration: 1000,
    //     type: 'warning',
    //   });
    // },
    isDateTimeType() {
      const { schema } = this;
      if (schema) {
        // 日期时间的场合
        if (schema.format === 'date-time' ||
          schema.format === 'date' ||
          schema.format === 'time') {
          return true;
        }
      }
      return false;
    },
    /**
     * 防止输入回车进行提交
     */
    onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$emit('submit');
    }
  }
};
</script>