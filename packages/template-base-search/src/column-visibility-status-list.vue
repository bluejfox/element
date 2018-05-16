<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate"
      v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-row class="el-column-visibility-status-list">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" v-for="(value, key) in columns" :key="key">
        <el-checkbox v-model="value.visibility" :disabled="value.disabled"
          @change="handleCheckedColumnChange">
          {{ value.title }}
        </el-checkbox>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        columns: {},
        isIndeterminate: true,
        checkAll: false
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          let isCheckAll = this.isCheckAllColumn(val);
          this.$set(this, 'checkAll', isCheckAll);
          if (isCheckAll === true) {
            this.$set(this, 'isIndeterminate', false);
          }
        }
      },
      columns(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      handleCheckAllChange(val) {
        Object.keys(this.columns).forEach((key) => {
          const obj = this.columns[key];
          obj.visibility = val;
          this.$set(this.columns, key, obj);
        });
        this.$set(this, 'isIndeterminate', false);
      },
      handleCheckedColumnChange() {
        let isCheckAll = this.isCheckAllColumn(this.value);
        this.$set(this, 'isIndeterminate', !isCheckAll);
      },
      isCheckAllColumn(val) {
        let ret = true;
        if (val) {
          Object.keys(val).forEach((key) => {
            this.$set(this.columns, key, val[key]);
            if (val[key].visibility === false) {
              ret = false;
            }
          });
        }
        return ret;
      }
    }
  };
</script>