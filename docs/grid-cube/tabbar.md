# TabBar(菜单栏)

::: tip
  支持默认的点击高亮效果，又支持下划线跟随的效果，并且支持自定义的插槽，实现icon与label搭配的类似于app底部选项卡的样式。
:::


#### 效果如图所示（正常demo可点击） 
#### 

<img :src="$withBase('/cube-tabbar.png')" alt="mixureSecure">

``` vue
  <template>
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler">
    </cube-tab-bar>
  </template>

  <script>
    export default {
      data () {
        return {
          selectLabel: 'Vip', // 对应的是数组中的label
          tabs: [{
            label: 'Home',
            icon: 'cubeic-home' // icon可以使用自定义的标签icon
          }, {
            label: 'Like',
            icon: 'cubeic-like'
          }, {
            label: 'Vip',
            icon: 'cubeic-vip'
          }, {
            label: 'Me',
            icon: 'cubeic-person'
          }]
        }
      }
    }
  </script>
```

### 或者下面这样写

``` vue
  <template>
    <cube-tab-bar v-model="selectedLabel" show-slider>
      <cube-tab v-for="(item, index) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
      </cube-tab>
  </cube-tab-bar>
  </template>

  <script>
    export default {
      data () {
        return {
          selectLabel: 'Vip', // 对应的是数组中的label
          tabs: [{
            label: 'Home',
            icon: 'cubeic-home' // icon可以使用自定义的标签icon
          }, {
            label: 'Like',
            icon: 'cubeic-like'
          }, {
            label: 'Vip',
            icon: 'cubeic-vip'
          }, {
            label: 'Me',
            icon: 'cubeic-person'
          }]
        }
      }
    }
  </script>
```

::: warning
    注意：  想使用此插件去自定义标签或者icon，
    <cube-tab-bar><cube-tab></cube-tab></cube-tab-bar>（需要这么嵌套），
    <cube-tab></cube-tab> 标签里的内容也可以使用自定义标签，添加自定义icon。
    使用此标签，click事件、change事件都是绑定在<cube-tab-bar>标签上的
:::

