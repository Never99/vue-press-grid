# Picker(选择器)

::: tip
  组件也就是选择器，可以用于实现单列或多列选项的选择。 
:::

注： 全量引入可忽略此注意事项，按需引入则必须引入该组件（如下面代码所示）

``` vue{10,11,12}
<script>
  // 按需引入组件
  import { Picker } from 'cube-ui'

  export default {
    data () {
      return {
      }
    },
    components: {
      Picker
    }
  }
</script>
```


#### 效果如图所示（正常demo可点击） 
#### 

<img :src="$withBase('/cube-picker.png')" style="max-height:400px" alt="mixureSecure">

#### 以下代码可直接在下面中复制使用，若此配置不满足需求，可再配置 [cube-picker官网组件](https://didi.github.io/cube-ui/#/zh-CN/docs/picker "cube-picker组件") 


* ### 单列选择器

``` vue
  <template>
    <cube-button @click="showPicker">Picker选择器</cube-button>
  </template>

  <script>
    export default {
			data() {
				return {
					PickerDemo: "",
					column1: [
						{
							text: "剧毒",
							value: "剧毒",
						},
						{
							text: "蚂蚁",
							value: "蚂蚁",
						},
						{
							text: "幽鬼",
							value: "幽鬼",
						},
					],
				};
			},
			methods: {
				showPicker() {
					let _this = this;
					this.PickerDemo = this.$createPicker({
						title: "Picker",
						data: [_this.column1],
						onSelect: this.selectHandle, // 确认选择（picker弹框右上角）的点击触发事件
						// onCancel: this.cancelHandle // 关闭弹框事件，默认存在，可不写
					});
					this.PickerDemo.show();
				},
				//选择之后发送请求
				selectHandle(selectedVal, ind, selectedText) {
					// 第一个参数：对应data中的 value 字段
					// 第二个参数：当前选择的下标
					// 第二个参数：对应data中的 text 字段
					console.log(date, selectedVal, selectedText);

					// (可在获取 value 之后做其他操作)
					// .
					// .
					// .
				}
			}
		};
	</script>
```

###
* ### 多列选择器

<img :src="$withBase('/cube-picker-more.png')" style="max-height:400px" alt="mixureSecure">

``` vue{67}
  <template>
    <cube-button @click="showPicker">Picker选择器</cube-button>
  </template>

  <script>
		const column1 = [
			{
				text: "剧毒",
				value: "剧毒",
			},
			{
				text: "蚂蚁",
				value: "蚂蚁",
			},
			{
				text: "幽鬼",
				value: "幽鬼",
			},
		];
		const column2 = [
			{
				text: "输出",
				value: "输出",
			},
			{
				text: "控制",
				value: "控制",
			},
			{
				text: "核心",
				value: "核心",
			},
			{
				text: "爆发",
				value: "爆发",
			},
		];
		const column3 = [
			{
				text: "梅肯",
				value: "梅肯",
			},
			{
				text: "秘法鞋",
				value: "秘法鞋",
			},
			{
				text: "假腿",
				value: "假腿",
			},
			{
				text: "飞鞋",
				value: "飞鞋",
			},
		];
		
		export default {
			data() {
				return {
					PickerDemo: ""
				};
			},
			methods: {
				showPicker() {
					let _this = this;
					this.PickerDemo = this.$createPicker({
						title: "Picker",
						data: [column1, column2, column3], // 传入多个数组
						onSelect: this.selectHandle, // 确认选择（picker弹框右上角）的点击触发事件
						// onCancel: this.cancelHandle // 关闭弹框事件，默认存在，可不写
					});
					this.PickerDemo.show();
				},
				//选择之后发送请求
				selectHandle(selectedVal, ind, selectedText) {
					// 第一个参数：对应data中的 value 字段	[xx,xx,xx]
					// 第二个参数：当前选择的下标	[0,1,2]
					// 第二个参数：对应data中的 text 字段	[xx,xx,xx]
					console.log(date, selectedVal, selectedText);

					// (可在获取 value 之后做其他操作)
					// .
					// .
					// .
				},
			},
		};
	</script>
```


::: warning
  注意：若此配置不满足需求，可去官网查看更详细配置！ [去看看](https://didi.github.io/cube-ui/#/zh-CN/docs/picker "cube-picker组件") 
:::

