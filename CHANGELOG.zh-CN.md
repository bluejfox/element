## 更新日志

### 1.0.10
*2017-05-05*

- 日期时间选择器／时间选择器支持通过设定format来控制显示／不显示秒选取器
- 日期选择器增加format属性

### 1.0.11
*2017-05-11*

- Dialog 对话框调整： 不设置Dialog的Top属性的场合，相对于浏览器窗口垂直居中。

### 1.0.12
*2017-05-11*

- 修正在firefox下Dialog显示不正确的问题。(flex box)

### 1.0.13
*2017-5-18*

- Form:修改在没有指定rules的场合，submit事件没有触发的问题

### 1.0.15
*2017-5-24*

- Dialog:增加拖拽功能

### 1.0.16
*2017-5-25*

#### 新特性：
- 新增 Transfer 组件
- 新增 transition 的文档，现在用户可以使用内置 transition 了
- Slider 新增垂直模式，使用 `vertical` 属性即可打开，#4410（by @devange）
- CheckboxGroup 新增按钮模式，#3697（by @mdartic）
- Table
  - 新增 `setCurrentRow` 方法，#4390
  - 新增表尾合计行的功能，提供 `show-summary`、`sum-text` 和 `summary-method`，#4484
  - TableColumn 新增 `filter-placement` 属性，#4491
- Dialog
  - 新增 `before-close` 属性，#4432
  - 新增 `visible` 属性，且支持 `.sync` 修饰符，#4539
- Upload
  - 新增 `disabled` 属性，#4473
  - `on-change` 事件现在也会在添加文件后触发，#4447
  - 新增 `abort` 方法，#4575
- Switch 新增 `on-value` 和 `off-value` 属性，支持自定义两种状态的值，#4403
- DatePicker
  - 新增 `default-value` 属性，用于设定下拉框初次弹出时显示的日期，#4222（by @wacky6）
  - 支持动态改变 `type`，#4417（by @coffeedeveloper）
- CarouselItem 新增 `label` 属性，#4317（by @paul-blundell）
- MessageBox 的 `message` 属性增加对 VNode 的支持，#4550
- Pagination 的 `current-page` 增加对 `.sync` 的支持，#4539
- Form 新增名为 label 的 slot，用于自定义标签文本的内容，#4634

#### 修复：
- Select 和 Table 的某些功能与 Vue 2.3.x 不兼容的问题，#4518
- DatePicker 的 `disabledDate` 对手动在输入框中输入的值无效的问题，#4309
- Tree 的树节点 ID 为数字 0 时的一些问题，#4415
- TimePicker 在完成选择后数字不居中显示的问题，#4425（by @pengchongfu）
- Autocomplete 在输入中文时频繁触发搜索方法的问题，#4393（by @qazbnm456）
- Upload
  - 不能选择同一个文件的问题，#4461
  - `auto-upload` 为 false 时不显示预览图片的问题，#4572
  - 一些样式问题，#4643
- 嵌套在 FormItem 中的按钮样式的 RadioGroup 的样式问题，#4336
- ColorPicker 修复将绑定值赋值为空不会清空颜色面板的问题，#4668（by @pengchongfu）
- Table 修复在 Safari 下 `show-overflow-tooltip` 无效的问题，#4157（by @renxia）

#### 非兼容性更新:
- 最低兼容 Vue 2.3.0
