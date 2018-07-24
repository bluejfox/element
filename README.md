# setaria-ui
> A Vue.js 2.0 UI Toolkit for Web.

Fork自[element-ui](https://github.com/ElemeFE/element)

**同步至Element-UI 2.4.2**

基于Vue和Element UI，结合其他优秀组件库（[Ant Design](https://ant.design/index-cn)，[Material Deisgn](https://material.angular.io/)等)，加速业务级应用页面开发。

## Feature
- [New]JSON Schema Dynamic Form [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/dynamic-form)
- [New]Enterprise Base Search Template [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/template-base-search)
- [New]List [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/list)
- [New]Divider [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/divider)
- [New]JsonViewer [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/json-viewer)
- [Update]Button [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/button)
  - 新增href, target属性支持a 链接功能
- [Update]Card [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/card)
  - 支持标签
- [Update]Dialog [链接](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/dialog)
  - 支持拖动

## Install
```shell
npm install setaria-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import Setaria from 'setaria-ui'

Vue.use(Setaria)

// or
import {
  Select,
  Button
  // ...
} from 'setaria-ui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```
For more information, please refer to [Quick Start](https://bluejfox.github.io/setaria-ui/#/zh-CN/component/quickstart) in our documentation.

## Browser Support
Modern browsers and Internet Explorer 10+.

## Development
Skip this part if you just want to use Element.

For those who are interested in contributing to Element, please refer to our contributing guide ([中文](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md) | [English](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.en-US.md)) to see how to run this project.

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/bluejfox/setaria-ui/releases).

## FAQ
We have collected some [frequently asked questions](https://github.com/bluejfox/setaria-ui/blob/master/FAQ.md). Before reporting an issue, please search if the FAQ has the answer to your problem.

## LICENSE
[MIT](LICENSE)
