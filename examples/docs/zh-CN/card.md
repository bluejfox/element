## Card 卡片

将信息聚合在卡片容器中展示。

### 基础用法


包含标题，内容和操作。

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```html
<el-card class="box-card" collapse v-model="expand">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>

<script>
export default {
  data() {
    return {
      expand: false
    };
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### 简单卡片

卡片可以只有内容区域。

:::demo
```html
<el-card class="box-card">
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### 带图片

可配置定义更丰富的内容展示。

:::demo 配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。
```html
<el-row>
  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>
```
:::

### 卡片阴影

可对阴影的显示进行配置。

:::demo 通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。
```html
<el-row :gutter="12">
  <el-col :span="8">
    <el-card shadow="always">
      总是显示
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
      鼠标悬浮时显示
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="never">
      从不显示
    </el-card>
  </el-col>
</el-row>
```
:::

### 带标签的卡片

可承载更多内容。

:::demo
```html
<el-card :tab-list="tabList" @tab-click="handleTabClick" :active-tab-name.sync="activeTabName">
  {{ activeTabName }}
</el-card>

<script>
  export default {
    data() {
      return {
        tabList: [
          {
            label: 'article',
            name: 'article'
          },
          {
            label: 'app',
            name: 'app'
          },
          {
            label: 'project',
            name: 'project'
          }
        ],
        activeTabName: 'app',
        tabContent: {
          'artical': 'artical selected',
          'app': 'app selected',
          'project': 'project selected',
        }
      };
    },
    methods: {
      handleTabClick(tab) {
        this.$message.info(`${tab.name}被点击。`);
      }
    }
  }
</script>
```
:::

### 内部卡片

可以放在普通卡片内部，展示多层级结构的信息。

:::demo
```html
<el-card header="Card title">
  <p class="title" style="margin-top: 0">
    Group Title
  </p>
  <el-card type="inner">
    <div slot="header" class="clearfix" style="display: flex;">
      <div style="flex: 1; display: flex; align-items: center;">Inner Card title</div>
      <div>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
    </div>
    Inner Card content
  </el-card>
  <el-card type="inner" style="margin-top: 24px">
    <div slot="header" class="clearfix" style="display: flex;">
      <div style="flex: 1; display: flex; align-items: center;">Inner Card title</div>
      <div>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
    </div>
    Inner Card content
  </el-card>
</el-card>

```
:::

### 支持更多内容配置

一种支持封面、头像、标题和描述信息的卡片。

:::demo
```html
<el-card style="width: 300px">
  <img
    slot="cover"
    alt="example"
    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png">
  <el-card-meta title="Card Title" description="This is the description">
    <img
      slot="avatar"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
  </el-card-meta>
  <template slot="actions">
    <el-card-action-item>
      <i class="el-icon-setting"></i>
    </el-card-action-item>
    <el-card-action-item>
      <i class="el-icon-edit"></i>
    </el-card-action-item>
    <el-card-action-item>
      <i class="el-icon-more"></i>
    </el-card-action-item>
  </template>
</el-card>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM | string| — | — |
| body-style | 设置 body 的样式| object| — | { padding: '20px' } |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |
| tab-list | 标签标题列表 | array<{label, name}> | — | — |
| active-tab-name | 当前激活标签的 name | string | — | — |
| type | 卡片类型，可设置为 inner 或 不设置 | string | — | — |
| collapse | 是否开启卡片折叠功能 | boolean | — | false |
| value | 是否展开卡片 body | boolean | — | true |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| tab-click  | 标签被点击后触发的事件 | tab:被点击标签的值, event:点击事件 |

### Slot

| name | 说明 |
|------|--------|
| — | Card 的内容 |
| cover | Card 封面 |
| actions | Card 操作组，位置在Card 底部 |

### Card-Meta Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题内容，也可以通过 `slot#title` 传入 DOM | string | — | — |
| description | 描述内容，也可以通过 `slot#description` 传入 DOM | string | — | — |

### Card-Meta Slot

| name | 说明 |
|------|--------|
| avatar | 头像/图标 |
| title | 标题内容 |
| description | 描述内容 |

### Card-Action-Item Slot

| name | 说明 |
|------|--------|
| - | 操作组项 的内容 |