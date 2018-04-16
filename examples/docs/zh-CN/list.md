<style>
  .demo-list.demo-zh-CN {
    .simple-list-title__first {
      margin-top: 0;
    }
  }
</style>
<script>
  module.exports = {
    data() {
      return {
        simpleList: [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.'
        ],
      };
    },
    methods: {
      
    }
  };
</script>
## List 列表
参考自Ant Design的[List 列表](https://ant.design/components/list-cn/)

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

### 简单列表

:::demo 列表拥有大、中、小三种尺寸。通过设置 size 为 large/small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。可通过设置 header 和 footer，来自定义列表头部和尾部。

```html
<template>
  <h3 class="simple-list-title__first">Default</h3>
  <el-list border>
    <div slot="header">
      Header
    </div>
    <el-list-item v-for="item in simpleList">
      {{ item }}
    </el-list-item>
    <div slot="footer">
      Footer
    </div>
  </el-list>
  <h3>Small</h3>
  <el-list border size="small">
    <div slot="header">
      Header
    </div>
    <el-list-item v-for="item in simpleList">
      {{ item }}
    </el-list-item>
    <div slot="footer">
      Footer
    </div>
  </el-list>
  <h3>Large</h3>
  <el-list border size="large">
    <div slot="header">
      Header
    </div>
    <el-list-item v-for="item in simpleList">
      {{ item }}
    </el-list-item>
    <div slot="footer">
      Footer
    </div>
  </el-list>
</template>
<script>
  export default {
    data() {
      return {
        simpleList: [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.'
        ],
      };
    }
  };
</script>
```
:::

### List Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| border  | 是否展示边框    | boolean   |  —  | false   |
| size  | list 的尺寸    | string   |  large / middle / small | middle   |

### List Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
|   |  |  |

### List Slot
| name | 说明 |
|------|--------|
| — | 列表的内容 |
| header | 列表头部的内容 |
| footer | 列表尾部的内容 |