<script>
  export default {
    data() {
      const userList = ['U', 'Lucy', 'Tom', 'Edward'];
      const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
      return {
        userList,
        colorList,
        user: userList[3],
        color: colorList[3],
      }
    },
    methods: {
      handleChangeUser() {
        const index = this.userList.indexOf(this.user);
        const targetIndex = index < this.userList.length - 1 ? index + 1 : 0;
        this.user = this.userList[targetIndex];
        this.color = this.colorList[targetIndex];
      },
    }
  }
</script>
<style scoped>
  .avatar {
    margin-top: 16px;
    margin-right: 16px;
  }
  .avatar-badge {
    margin-top: 24px;
    margin-right: 24px;
  }
</style>

## Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

参考自Ant Design的[Avatar 头像](https://ant.design/components/avatar-cn/)

### 基本用法

头像有三种尺寸，两种形状可选。

:::demo
```html
<template>
  <div>
    <el-avatar icon="el-icon-message" class="avatar">
    </el-avatar>
    <el-avatar icon="el-icon-message" size="medium" class="avatar">
    </el-avatar>
    <el-avatar icon="el-icon-message" size="small" class="avatar">
    </el-avatar>
  </div>
  <div>
    <el-avatar icon="el-icon-message" shape="square" class="avatar">
    </el-avatar>
    <el-avatar icon="el-icon-message" shape="square" size="medium" class="avatar">
    </el-avatar>
    <el-avatar icon="el-icon-message" shape="square" size="small" class="avatar">
    </el-avatar>
  </div>
</template>

<style scoped>
  .avatar {
    margin-top: 16px;
    margin-right: 16px;
  }
</style>
```
:::

### 类型

支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。

:::demo
```html
<template>
  <el-avatar icon="el-icon-message" class="avatar">
  </el-avatar>
  <el-avatar class="avatar" text="U">
  </el-avatar>
  <el-avatar class="avatar" text="USER1">
  </el-avatar>
  <el-avatar
    src="https://png.pngtree.com/svg/20161217/avatar__181424.png"
    alt="头像"
    class="avatar">
  </el-avatar>
  <el-avatar
    :style="{ color: '#f56a00', backgroundColor: '#fde3cf' }"
    class="avatar"
    text="U"></el-avatar>
  <el-avatar
    :style="{ backgroundColor: '#87d068' }"
    icon="el-icon-message"
    class="avatar"></el-avatar>
</template>

<style scoped>
  .avatar {
    margin-top: 16px;
    margin-right: 16px;
  }
</style>
```
:::

### 自动调整字符大小

对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

:::demo
```html
<template>
  <div>
    <el-avatar
      :style="{
        'backgroundColor': color
      }"
      :text="user">
    </el-avatar>
    <el-button size="small" @click="handleChangeUser" style="margin-left: 8px;">Change</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      const userList = ['U', 'Lucy', 'Tom', 'Edward'];
      const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
      return {
        userList,
        colorList,
        user: userList[3],
        color: colorList[3],
      }
    },
    methods: {
      handleChangeUser() {
        const index = this.userList.indexOf(this.user);
        const targetIndex = index < this.userList.length - 1 ? index + 1 : 0;
        this.user = this.userList[targetIndex];
        this.color = this.colorList[targetIndex];
      },
    }
  }
</script>
```
:::

### 带徽标的头像

通常用于消息提示。

:::demo
```html
<template>
  <div>
    <el-badge :value="12" class="avatar-badge">
      <el-avatar icon="el-icon-message" shape="square" size="medium">
      </el-avatar>
    </el-badge>
    
    <el-badge is-dot class="avatar-badge">
      <el-avatar icon="el-icon-message" shape="square" size="medium">
      </el-avatar>
    </el-badge>
  </div>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon | 图标类名，第一优先（同时定义了`icon`, `src`, `text`的场合，将忽略`src`和`text`） | string | Setaria-UI内置的[图标类名](/#/zh-CN/component/icon) | — |
| src | 图片类头像的资源地址，第二优先 | string | — | — |
| text | 文本内容，第三优先 | string | — | — |
| shape | 指定头像的形状 | string | circle/square | circle |
| size | 设置头像的大小 | string | medium/small | — |
| alt | 图像无法显示时的替代文本 | string | — | — |
| img-load-error | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | Function | — | — |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
