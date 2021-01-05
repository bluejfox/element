<template>
  <span class="el-tag-select-item">
    <el-tooltip v-bind="innerTooltip" v-if="tooltip">
      <el-checkbox-button :label="label" @change="handleChange" v-model="innerValue">
        <slot>
        </slot>
      </el-checkbox-button>
    </el-tooltip>
    <el-checkbox-button :label="label" @change="handleChange" v-model="innerValue" v-else>
      <slot>
      </slot>
    </el-checkbox-button>
  </span>
</template>
<script>
import Emitter from 'setaria-ui/src/mixins/emitter';
import ElCheckboxButton from 'setaria-ui/packages/checkbox-button';
import ElTooltip from 'setaria-ui/packages/tooltip';

export default {
  name: 'ElTagSelectItem',

  mixins: [Emitter],

  components: {
    ElCheckboxButton,
    ElTooltip
  },

  props: {
    label: null,
    value: null,
    tooltip: [Object, String]
  },

  beforeMount() {
    this.dispatch('ElTagSelect', 'el.tag.select.addTagSelectItem', [this]);
  },

  data() {
    return {
      innerValue: ''
    };
  },

  computed: {
    innerTooltip() {
      const { tooltip } = this;
      let ret = null;
      if (typeof tooltip === 'string') {
        ret = {
          content: tooltip
        };
      } else if (typeof tooltip === 'object') {
        ret = tooltip;
      }
      return ret;
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.innerValue = val;
      }
    }
  },

  methods: {
    handleChange(val) {
      this.$emit('change', val);
      this.$emit('input', val);
    }
  }
};
</script>
