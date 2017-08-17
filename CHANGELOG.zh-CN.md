## 更新日志

### 1.1.0
*2017-08-17*

- 修复异步加载数据的 Table 不显示合计行的问题，#5318
- 修复 Pagination 的输入框数值与当前页不同步的问题，#5377
- 修复 DatePicker 的 shortcut 面板过长时的溢出问题，#5297（by @alashow）
- 修复当页面上有被选中的文本时点击 Switch 无效的问题，#5411
- Form 中表示必填项的小红点现在可以动态更新了，#5403
- 修复 Carousel 的 initial-index 属性无效的问题，#5334
- 修复嵌套于 Dialog 中的 Popover 无法被 focus 的问题，#5336
- 修复 ColorPicker 的默认值有时与面板中的值不一致的问题，#5183（by @Kingwl）
- 修复默认值为白色的 ColorPicker 无法通过面板改变 hue 的问题，#5184（by @Kingwl）
- 修复 Dialog 在滚动后，其嵌套的 Select 需多次点击才能呼出的问题，#5226
- 新增 Autocomplete 的 `props` 属性，#5282
- 修复 DatePicker 在手动输入值后按 Tab 切换焦点时下拉框不消失的问题，#5149（by @ChuckFields）
- 修复 Select 的 `default-first-option` 属性在远程搜索时不生效的问题，#5084
- 修复 InputNumber 与其他表单组件同行显示时不能对齐的问题，#5127
- 修复行内 FormItem 对复合型 Input 失效的问题，#5151
- 修复 FormItem 在 Firefox 中的高度与其他浏览器不一致的问题，#5152
- 修复 Cascader 中 `value` 为 0 的数据不能展开下一级的问题，#5172（by @Kingwl）
- 修复 Autocomplete 无法触发原生 `keydown` 和 `keyup` 事件的问题，#5129
- 新增 Select 的 `clear` 事件，#5112
- 修复 Cascader 在某些情况下下拉框的位置没有及时更新的问题，#5064
- 提升 Dialog 和 MessageBox 的可访问性，#4786
- 修复带展开行的 Table 在高亮和斑马纹效果下的问题，#4871（by @mu-yu）
- 新增 Select 的 `default-first-option` 属性，#4838（by @wacky6）
- 修复可创建选项的 Select 在没有选项数据时不显示「无数据」文本的问题，#4977

### 1.0.21
*2017-06-14*

- Tabs 标签页
  - 新增 `before-tab-click` 属性，用于对标签页点击动作进行控制。

### 1.0.20
*2017-06-05*

- 修复Dialog 对话框内打开的对话框关闭后，遮罩层没有隐藏的问题

### 1.0.19
*2017-5-31*

- 修复Dialog 对话框在不缓存内容的场合，对话框关闭时，内容比标题先消失的问题

### 1.0.18
*2017-5-25*

- 修复当设置Select 选择器的属性disabled设置为true时，没有显示禁用样式的问题

### 1.0.17
*2017-5-25*

- 修复当设置Dialog 对话框的属性cache为false时，内容没有显示的问题
- 修正Dialog 对话框的拖拽功能，只可以通过点击Dialog 对话框的Header进行拖拽

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
- 新增 Dropdown 的 `visible-change` 事件，#4818（by @luciy）
- 新增 Col 和 Row 的 `tag` 属性，#4799
- 新增 Cascader 的 `before-filter` 属性，#4774
- 新增 InputNumber 的 `debounce` 属性，#4712（by @pengchongfu）

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
- 修复上个版本中 Cascader 搜索功能不可用的问题，#4812
- 修复 `type` 为 range 的 DatePicker 错误地触发 watch 的问题，#4837（by @wacky6）
- 修复 TimePicker 在某些浏览器上数字不居中的问题，#4847（by @pengchongfu）
- 修复当按下 ESC 关闭 Dialog 时不触发 `before-close` 钩子的问题，#4819（by @patriciussanctus）
- 修复当多个 MessageBox 中存在 VNode 格式的 `message` 时渲染不正确的问题
- 修复按下 tab 键无法使 Checkbox 获得焦点的问题
- 修复在按需引入某些组件时，报 `el-collapse-transition` 未找到的错，#4728
- 修复 Pagination 在 FireFox 中的垂直居中问题，#4756
- 修复 `type` 为 week 时的 DatePicker 在更新绑定值后面板视图不更新的问题，#4739
- 修复 `show-summary` 的 Table 的一些高度计算错误，#4736
- 修复 Autocomplete 输入中文时会清空输入框的问题，#4718
- 修复异步获取数据的 Table 的合计行不随表格其余部分滚动的问题，#4717
- 修复 `close-on-press-esc` 为 true 的 Dialog 在按下 ESC 时无法正确关闭的问题，#4706
- 修复设置了 `on-value` 和 `off-value` 的 Switch `change` 事件参数不正确的问题，#4675

#### 非兼容性更新:
- 最低兼容 Vue 2.3.0

### 1.0.15
*2017-5-24*

- Dialog:增加拖拽功能

### 1.0.13
*2017-5-18*

- Form:修改在没有指定rules的场合，submit事件没有触发的问题

### 1.0.12
*2017-05-11*

- 修正在firefox下Dialog显示不正确的问题。(flex box)

### 1.0.11
*2017-05-11*

- Dialog 对话框调整： 不设置Dialog的Top属性的场合，相对于浏览器窗口垂直居中。

### 1.0.10
*2017-05-05*

- 日期时间选择器／时间选择器支持通过设定format来控制显示／不显示秒选取器
- 日期选择器增加format属性
