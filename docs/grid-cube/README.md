# 前言 
<img :src="$withBase('/cube-ui.png')" style="margin: 0 auto;display: block;" alt="mixureSecure">

### [cube-ui](https://www.jianshu.com "cube-ui") 是基于 Vue.js 实现的精致移动端组件库。

### 特性
* 质量可靠

由滴滴内部组件库精简提炼而来，经历了业务一年多的考验，并且每个组件都有充分单元测试，为后续集成提供保障。

* 体验极致

以迅速响应、动画流畅、接近原生为目标，在交互体验方面追求极致。

* 标准规范

遵循统一的设计交互标准，高度还原设计效果；接口标准化，统一规范使用方式，开发更加简单高效。

* 扩展性强

支持按需引入和后编译，轻量灵活；扩展性强，可以方便地基于现有组件实现二次开发。


### 使用

#### 在 main.js 中全部引入 
``` js
import Vue from 'vue'
import Cube from 'cube-ui'

Vue.use(Cube)
```

#### 在 main.js 中按需引入 
注意： 按需引入的话，是不会打包基础样式部分的，所以在使用的时候需要引入 style 模块。
``` js
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button
} from 'cube-ui'

// 全局注册
Vue.use(Button)
// ...
```

所有的可按需引入的组件以及模块：
```js
import {
  // 基础样式
  Style,
  // basic
  Button,
  Loading,
  Tip,
  Toolbar,
  // form
  Checkbox,
  CheckboxGroup,
  Radio,
  Checker,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Upload,
  Form,
  // popup
  Popup,
  Toast,
  Picker,
  CascadePicker,
  DatePicker,
  TimePicker,
  SegmentPicker,
  Dialog,
  ActionSheet,
  Drawer,
  // scroll
  Scroll,
  Slide,
  IndexList,
  Swipe
} from 'cube-ui'
```

