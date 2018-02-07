<template>
  <el-pagination
    class="el-pagination"
    :page-sizes="pageSizes"
    :small="small"
    :total="total"
    :page-count="pageCount"
    :current-page="internalCurrentPage"
    layout="slot">
    <slot>
      <el-row justify="end" align="middle" type="flex">
        <el-col :span="5">
          <span class="el-pagination__total">当前在第 {{ currentPage }} 页</span>
        </el-col>
        <el-button-group>
          <el-button :disabled="isPrevButtonDisabled" :plain="true" size="large" type="info"
            icon="el-icon-arrow-left" @click="doPrev">
            上一页
          </el-button>
          <el-button :disabled="isNextButtonDisabled" :plain="true" size="large" type="info" @click="doNext">
            下一页<i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-button-group>
      </el-row>
    </slot>
  </el-pagination>
</template>
<script>
  export default {
    name: 'ElSimplePagination',
    props: {
      small: Boolean,
      total: Number,
      pageCount: Number,
      currentPage: {
        type: Number,
        default: 1
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 40, 50, 100];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      internalCurrentPage() {
        return this.currentPage;
      },
      isPrevButtonDisabled() {
        return this.disabled || this.internalCurrentPage === 1;
      },
      isNextButtonDisabled() {
        return this.disabled;
      }
    },
    methods: {
      /**
       * 上翻页事件处理
       */
      doPrev() {
        if (this.internalCurrentPage !== 1) {
          this.triggerCurrentChange(this.internalCurrentPage - 1);
        }
      },
      /**
       * 下翻页事件处理
       */
      doNext() {
        this.triggerCurrentChange(this.internalCurrentPage + 1);
      },
      /**
       * 触发分页事件
       * @param  {Number} val 当前页
       */
      triggerCurrentChange(val) {
        this.$emit('current-change', val);
      }
    }
  };
</script>
<style>
  .el-pagination {
    text-align: right;
  }
  .el-pagination .el-button-group {
    margin-left: 10px;
  }
  .el-pagination .el-button-group .el-button:not(:last-child) {
    margin-right: 0 !important;
  }
  .el-pagination .el-button-group .el-button--info:first-child {
    border-right-color: #bfcbd9 !important;
  }
</style>
