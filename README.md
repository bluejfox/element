# setaria-ui
> A Vue.js 2.0 UI Toolkit for Web.

Fork自[element-ui](https://github.com/ElemeFE/element)
为了方便应用级开发，对部分Element-UI组件做了一定程度的调整。
会根据需求增加应用级组件，敬请期待。

## Links
- [Home Page](http://element.eleme.io/)
- [Docs](http://element.eleme.io/#/component)
- [awesome-element](https://github.com/ElementUI/awesome-element)
- [FAQ](./FAQ.md)
- [Customize Theme](http://element.eleme.io/#/en-US/component/custom-theme)
- [Preview and generate theme online](https://elementui.github.io/theme-preview)
- [Element for React](https://github.com/eleme/element-react)
- Starter Kit
  - [element-starter](https://github.com/ElementUI/element-starter)
  - [element-cooking-starter](https://github.com/ElementUI/element-cooking-starter)
  - [element-in-laravel-starter](https://github.com/ElementUI/element-in-laravel-starter)
- [Design resources](https://github.com/ElementUI/Resources)
- Boilerplate for bug reports
  - [CodePen](https://codepen.io/anon/pen/ozYpNA)
  - [JSFiddle](https://jsfiddle.net/gmve9d3p/)
- [Mint UI](https://github.com/ElemeFE/mint-ui) - Mobile UI elements for Vue.js

## Install
```shell
npm install setaria-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import Element from 'setaria-ui'

Vue.use(Element)

// or
import {
  Select,
  Button
  // ...
} from 'setaria-ui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```
For more information, please refer to [Quick Start](http://element.eleme.io/#/en-US/component/quickstart) in our documentation.

## Browser Support
Modern browsers and Internet Explorer 9+.

## Development
Skip this part if you just want to use Element.

For those who are interested in contributing to Element, please refer to our contributing guide ([中文](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md) | [English](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.en-US.md)) to see how to run this project.

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/bluejfox/setaria-ui/releases).

## FAQ
We have collected some [frequently asked questions](https://github.com/bluejfox/setaria-ui/blob/master/FAQ.md). Before reporting an issue, please search if the FAQ has the answer to your problem.

## Contribution
Please make sure to read the contributing guide ([中文](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md) | [English](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.en-US.md)) before making a pull request.

## LICENSE
MIT
