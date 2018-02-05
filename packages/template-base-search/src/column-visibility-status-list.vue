<template>
  <el-row class="el-column-visibility-status-list">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" v-for="col in columns">
      <el-checkbox v-model="col.visibility" :disabled="col.disabled">{{ col.title }}</el-checkbox>
    </el-col>
  </el-row>
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
        columns: {}
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (val) {
            Object.keys(val).forEach((key) => {
              this.$set(this.columns, key, val[key]);
            });
          }
        }
      },
      columns(val) {
        this.$emit('input', val);
      }
    }
  };
</script>