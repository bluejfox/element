## Ellipsis 文本自动省略

文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。

### 按照字符数省略

通过设置 length 属性指定文本最长长度，如果超过这个长度会自动截取。

:::demo

```html
<el-ellipsis :length="20" full-width-recognition tooltip>
  {{ description }}
</el-ellipsis>
<br>
<el-ellipsis :length="10000" full-width-recognition tooltip>
  我虽然有tooltip属性，但是我的长度设置很长，导致不显示tooltip
</el-ellipsis>
<script>
export default {
  data() {
    return {
      description: '通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮点击后会显示下拉菜单。'
    };
  }
}
</script>
```
:::

### Ellipsis Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| tooltip | 移动到文本展示完整内容的提示 | boolean  | — | false |
| length | 在按照长度截取下的文本最大字符数，超过则截取省略  | number | — | — |
| full-width-recognition | 是否将全角字符的长度视为 2 来计算字符串长度 | boolean | — | false |
