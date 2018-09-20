<template>
  <div class="el-card-meta">
    <div class="el-card-meta__avatar" v-if="$slots.avatar">
      <slot name="avatar"></slot>
    </div>
    <div class="el-card-meta__detail">
      <div class="el-card-meta__detail-title" v-if="$slots.title || title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="el-card-meta__detail-description" v-if="$slots.description || description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ElCardMeta',
  props: {
    title: String,
    description: String
  }
};
</script>
