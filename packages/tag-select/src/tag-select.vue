<template>
  <div
    class="el-tag-select"
    :class="{
      'has-expand': expandable,
      'expanded': expand,
    }">
    <el-tag-select-item
      class="el-tag-select-item__all"
      :label="selectAllLabel"
      @change="handleSelectAllChange"
      v-model="selectAllValue">
      全部
    </el-tag-select-item>
    <el-checkbox-group
      v-model="model"
      class="select-item-group"
      @change="handleChange">
      <slot></slot>
    </el-checkbox-group>
    <a class="trigger" v-if="expandable" @click="handleExpand">
      {{ expand ? '收起' : '展开' }}
      <i :class="{ 'el-icon-arrow-down': !expand, 'el-icon-arrow-up': expand }"></i>
    </a>
  </div>
</template>
<script>
import ElCheckboxGroup from 'setaria-ui/packages/checkbox-group';
import ElTagSelectItem from 'setaria-ui/packages/tag-select-item';

export default {
  name: 'ElTagSelect',

  componentName: 'ElTagSelect',

  components: {
    ElCheckboxGroup,
    ElTagSelectItem
  },

  props: {
    value: {},
    expandable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectAllLabel: 'all',
      model: [],
      selectAllValue: '',
      selectItemList: [],
      expand: false
    };
  },

  computed: {
    isSelectAll() {
      return this.model.length === this.selectItemList.length;
    }
  },

  watch: {
    value: {
      handler(val, oldVal) {
        this.model = [...val];
        this.refreshSelectAll();
      }
    }
  },

  created() {
    this.$on('el.tag.select.addTagSelectItem', (selectItem) => {
      if (selectItem && selectItem.label !== this.selectAllLabel) {
        this.selectItemList.push(selectItem);
      }
    });
  },

  mounted() {
    // // 解决全部TagSelectItem组件没有渲染完成时，无法正确设置全部按钮的状态问题
    // this.model = [...this.value];
    // this.refreshSelectAll(this.model);
  },

  methods: {
    handleSelectAllChange(val) {
      this.model = [];
      // Label为全部的TagItem为选中状态时
      if (val) {
        this.selectItemList.forEach(item => {
          this.model.push(item.label);
        });
      }
      this.triggerValueChange();
    },
    handleChange(val) {
      this.refreshSelectAll(val);
      this.$emit('change', val);
      this.triggerValueChange();
    },
    refreshSelectAll() {
      this.selectAllValue = this.isSelectAll;
    },
    handleExpand() {
      this.expand = !this.expand;
    },
    triggerValueChange() {
      this.$emit('input', this.model);
    }
  }
};
</script>