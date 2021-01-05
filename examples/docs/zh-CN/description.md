## Description 描述列表
成组展示多个只读字段。

### 何时使用
常见于详情页的信息展示。对于在基于业务逻辑对显示项目进行显示/隐藏控制时，会方便很多。

### 基本用法
简单的展示。

:::demo

```html
<el-radio-group v-model="size">
  <el-radio-button label="large">large</el-radio-button>
  <el-radio-button label="medium">medium</el-radio-button>
  <el-radio-button label="small">small</el-radio-button>
  <el-radio-button label="mini">mini</el-radio-button>
</el-radio-group>
<el-button @click="handleShowItem" :round="false" style="margin-bottom: 10px;">显示/隐藏 [备注] 项目</el-button>
<el-description title="基本信息" :columns="2" :size="size">
  <el-description-item label="姓名" :span="2">张三</el-description-item>
  <el-description-item label="性别">男</el-description-item>
  <el-description-item label="住址">中国北京</el-description-item>
  <el-description-item label="创建人">zhanghuan6</el-description-item>
  <el-description-item label="备注" v-if="isItemShowFlag">2019/10/29</el-description-item>
  <el-description-item class="description-item-custom-class" label="自定义class">可自定义class</el-description-item>
</el-description>
<script>
  export default {
    data() {
      return {
        isItemShowFlag: false,
        size: 'large'
      };
    },
    methods: {
      handleShowItem() {
        this.isItemShowFlag = !this.isItemShowFlag;
      }
    }
  }
</script>
```
:::

### Description Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title   | 描述列表的标题，显示在最顶部 | string | — | — |
| column   | 一行的 `DescriptionItems` 数量 | number | — | 4 |

### DescriptionItem Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label   | 内容的描述 | string | — | — |
| span   | 包含列的数量 | number | — | — |