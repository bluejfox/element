<template>
  <div class="el-list-item">
    <div class="el-list-item-extra-wrap" v-if="elList.itemLayout === 'vertical'">
      <div class="el-list-item-main">
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
      <div class="el-list-item-extra" v-if="$slots.extra && elList.itemLayout === 'vertical'">
        <slot name="extra"></slot>
      </div>
    </div>
    <template v-else>
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
    </template>
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
