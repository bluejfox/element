<template>
  <div class="el-list-item-meta" v-if="$slots.avatar || isTitleExist || isDescriptionExist">
    <div class="el-list-item-meta-avatar" v-if="$slots.avatar">
      <slot name="avatar"></slot>
    </div>
    <div class="el-list-item-meta-content" v-if="isTitleExist || isDescriptionExist">
      <div class="el-list-item-meta-title" v-if="isTitleExist">
        <slot name="title" v-if="this.$slots.title"></slot>
        <span v-else>{{ this.title }}</span>
      </div>
      <div class="el-list-item-meta-description" v-if="isDescriptionExist">
        <slot name="description" v-if="this.$slots.description"></slot>
        <span v-else>{{ this.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import emitter from 'setaria-ui/src/mixins/emitter';
  
  export default {
    name: 'ElListItemMeta',

    componentName: 'ElListItemMeta',

    mixins: [emitter],

    inject: ['elListItem'],

    props: {
      title: String,
      description: String
    },

    computed: {
      isTitleExist() {
        return this.$slots.title || this.title;
      },
      isDescriptionExist() {
        return this.$slots.description || this.description;
      }
    },

    mounted() {
      this.dispatch('ElListItem', 'el.list.item.addMeta', [this]);
    },

    beforeDestroy() {
      this.dispatch('ElListItem', 'el.list.item.removeMeta', [this]);
    }
  };
</script>
