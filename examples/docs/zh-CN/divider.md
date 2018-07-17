<style>
  .demo-divider.demo-zh-CN {
  }
</style>
<script>
  module.exports = {
    data() {
      return {
      };
    },
    watch: {
    },
    methods: {
    }
  };
</script>
## Divider 分割线
参考自Ant Design的[Divider 分割线](https://ant.design/components/divider-cn/)

区隔内容的分割线。

### 水平分割线

:::demo 默认为水平分割线，可在其中加入文字。

```html
<template>
  <div>
    <div>
      I have had my invitation to this world's festival, and thus my life has been blessed. 
    </div>
    <el-divider></el-divider>
    <div>
      Early in the day it was whispered that we should sail in a boat, only thou and I, and never a soul in the world would know of this our pilgrimage to no country and to no end.
    </div>
    <el-divider :dashed="true">With Text</el-divider>
    <div>
      In the meanwhile I smile and I sing all alone. In the meanwhile the air is filling with the perfume of promise.
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    }
  };
</script>
```
:::

### 标题位置

:::demo 修改分割线标题的位置。

```html
<template>
  <div>
    <div>
      I have had my invitation to this world's festival, and thus my life has been blessed. 
    </div>
    <el-divider orientation="left">With Text</el-divider>
    <div>
      Early in the day it was whispered that we should sail in a boat, only thou and I, and never a soul in the world would know of this our pilgrimage to no country and to no end.
    </div>
    <el-divider orientation="right">With Text</el-divider>
    <div>
      In the meanwhile I smile and I sing all alone. In the meanwhile the air is filling with the perfume of promise.
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    }
  };
</script>
```
:::

### 垂直分割线

:::demo 使用 type="vertical" 设置为行内的垂直分割线。

```html
<template>
  <div>
    Text
    <el-divider type="vertical"></el-divider>
    <el-button type="text">Link</el-button>
    <el-divider type="vertical"></el-divider>
    <el-button type="text">Link</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    }
  };
</script>
```
:::


### Divider Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 水平还是垂直类型    | string   |  horizontal / vertical  | horizontal   |
| orientation  | 分割线标题的位置    | string   |  left / center / right | center   |
| dashed  | 是否虚线    | boolean   |  —  | false   |
| load-more  | 加载更多（同时设置了插槽的场合，优先显示插槽）    | string   |  —  |  —  |
| custom-class  | 分割线样式类  | string   |  —  |  —  |
| custom-style  | 分割线样式对象    | object   |  —  |  —  |

### List Slot
| name | 说明 |
|------|--------|
| — | 显示的文字 |
