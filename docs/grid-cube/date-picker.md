# DatePicker(日期选择器)

::: tip
  日期选择器，可用于日期选择，选择粒度的灵活配置，如年月日、时分秒、年月日时分秒、年月等。
:::

注： 全量引入可忽略此注意事项，按需引入则必须引入该组件（如下面代码所示）

``` vue{10,11,12}
<script>
  // 按需引入组件
  import { DatePicker } from 'cube-ui'

  export default {
    data () {
      return {
      }
    },
    components: {
      DatePicker
    }
  }
</script>
```


#### 效果如图所示（正常demo可点击） 
#### 

<img :src="$withBase('/cube-date-picker.png')" style="max-height:400px" alt="mixureSecure">

#### 以下代码可直接在下面中复制使用 时间不满足需求，可再配置 [cube-date-picker官网组件](https://didi.github.io/cube-ui/#/zh-CN/docs/date-picker "cube-date-picker组件") 
#### 

``` vue
  <template>
    <cube-button @click="showDatePicker">选择日期</cube-button>
  </template>

  <script>
    export default {
      data () {
        return {
          formatPicker: ""
        }
      },
      methods: {
        showDatePicker() {
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          let day = new Date().getDate();
          this.formatPicker = this.$createDatePicker({
              title: '',
              min: new Date(parseInt(year) - 15, month, day),// 可选择的最小时间
              max: new Date(parseInt(year), month, day), // 可选择的最大时间
              value: new Date(), // 默认时间是今天
              format: {
                  year: 'YYYY年',
                  month: 'MM月',
                  date: 'DD日'
              },
              onSelect: this.selectHandle, // 确认选择（picker弹框右上角）的点击触发事件
              // onCancel: this.cancelHandle // 关闭弹框事件，默认存在，可不写
          })
          // }
          this.formatPicker.show()
        },
        //选择之后发送请求
        selectHandle(date, selectedVal, selectedText) {
          // 第一个参数：标准时间
          // 第二个参数：选择的value [2020, 10 ,28]
          // 第二个参数：选择的text ["2020年", "10月" ,"28日"]
          console.log(date, selectedVal, selectedText);


          // (可在获取时间做其他操作)
          // .
          // .
          // .
        }
      }
    }
  </script>
```

### `$updateProps`
通过$updateProps方法，可以修改用 createAPI 创建的组件实例的属性。比如 DatePicker中，我们可以修改 value 属性的值改变当前选择的日期。

``` vue{32,33,34,35,36,37,38}
  <template>
    <cube-button @click="showDatePicker">选择日期</cube-button>
  </template>

  <script>
    export default {
      data () {
        return {
          formatPicker: ""
        }
      },
      methods: {
        showDatePicker() {
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          let day = new Date().getDate();
          this.formatPicker = this.$createDatePicker({
              title: '',
              min: new Date(parseInt(year) - 15, month, day),// 可选择的最小时间
              max: new Date(parseInt(year), month, day), // 可选择的最大时间
              value: new Date(), // 默认时间是今天
              format: {
                  year: 'YYYY年',
                  month: 'MM月',
                  date: 'DD日'
              },
              onSelect: this.selectHandle, // 确认选择（picker弹框右上角）的点击触发事件
              // onCancel: this.cancelHandle // 关闭弹框事件，默认存在，可不写
          })
          // }
          this.formatPicker.show()

          // 更新时间插件
          setTimeout(() => {
            this.formatPicker.$updateProps({
              title: 'updated',
              value: new Date(2010, 9, 1) // 需要更新到的日期
            })
          }, 1000)
        },
        //选择之后发送请求
        selectHandle(date, selectedVal, selectedText) {
          // 第一个参数：标准时间
          // 第二个参数：选择的value [2020, 10 ,28]
          // 第二个参数：选择的text ["2020年", "10月" ,"28日"]
          console.log(date, selectedVal, selectedText);


          // (可在获取时间做其他操作)
          // .
          // .
          // .
        }
      }
    }
  </script>
```



::: warning
  注意：若此配置不满足需求，可去官网查看更详细配置！ [去看看](https://didi.github.io/cube-ui/#/zh-CN/docs/date-picker "cube-picker组件") 
:::
