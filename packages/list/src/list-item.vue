<template>
  <div class="el-list-item">
    <slot name="meta" v-if="$slots.meta"></slot>
    <div :class="[
      'el-list-item-content',
      isContentSingle ? 'el-list-item-content-single' : ''
    ]" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="el-list-item-action" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElListItem',

    componentName: 'ElListItem',

    provide() {
      return {
        elListItem: this
      };
    },

    inject: ['elList'],

    props: {
    },

    data() {
      return {
        metas: []
      };
    },

    computed: {
      isContentSingle() {
        return this.metas.length === 0;
      }
    },

    created() {
      this.$on('el.list.item.addMeta', (meta) => {
        if (meta) {
          this.metas.push(meta);
        }
      });
      /* istanbul ignore next */
      this.$on('el.list.item.removeMeta', (meta) => {
        this.metas.splice(this.metas.indexOf(meta), 1);
      });
    }
  };
</script>
