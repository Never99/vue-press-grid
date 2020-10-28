# Dialog(模态框组件)

:::tip
Dialog模态框组件，提供了多种样式及交互形式。
:::


* ### alert类型

<img :src="$withBase('/cube-dialog-alert.png')" style="max-height:400px" alt="mixureSecure">

```vue
  <template>
    <cube-button @click="showAlert">alert类型</cube-button>
  </template>

  <script>
	export default {
		data () {
			return {}
		},
		methods: {
			showAlert() {
				this.$createDialog({
					type: 'alert',
					title: '我是标题',
					content: '我是内容',
					icon: 'cubeic-alert'
				}).show()
			}
		}
	}
  </script>	
```

* ### 提示输入框类型

<img :src="$withBase('/cube-dialog-prompt.png')" style="max-height:400px" alt="mixureSecure">

```vue
  <template>
    <cube-button @click="showAlert">提示输入框类型</cube-button>
  </template>

  <script>
	export default {
		data () {
			return {}
		},
		methods: {
			showAlert() {
				this.dialog = this.$createDialog({
					type: 'prompt',
					title: '我是标题',
					prompt: {
					value: '',
					placeholder: '请输入'
					},
					onConfirm: (e, promptValue) => {
					this.$createToast({
						type: 'warn',
						time: 1000,
						txt: `Prompt value: ${promptValue || ''}`
					}).show()
					}
				}).show()
			}
		}
	}
  </script>	
```

* ### 确定、取消框

<img :src="$withBase('/cube-dialog-btn.png')" style="max-height:400px" alt="mixureSecure">

```vue
  <template>
    <cube-button @click="showAlert">确定、取消框</cube-button>
  </template>

  <script>
	export default {
		data () {
			return {}
		},
		methods: {
			showAlert() {
				this.$createDialog({
					type: 'confirm',
					icon: 'cubeic-alert',
					title: '我是标题',
					content: '我是内容',
					confirmBtn: {
					text: '确定按钮',
					active: true,
					disabled: false,
					href: 'javascript:;'
					},
					cancelBtn: {
					text: '取消按钮',
					active: false,
					disabled: false,
					href: 'javascript:;'
					},
					onConfirm: () => {
					this.$createToast({
						type: 'warn',
						time: 1000,
						txt: '点击确认按钮'
					}).show()
					},
					onCancel: () => {
					this.$createToast({
						type: 'warn',
						time: 1000,
						txt: '点击取消按钮'
					}).show()
					}
				}).show()
			}
		}
	}
  </script>	
```

* ### 带有关闭按钮类型

<img :src="$withBase('/cube-dialog-close.png')" style="max-height:400px" alt="mixureSecure">

```vue
  <template>
    <cube-button @click="showAlert">带有关闭按钮类型</cube-button>
  </template>

  <script>
	export default {
		data () {
			return {}
		},
		methods: {
			showAlert() {
				this.$createDialog({
					type: 'alert',
					icon: 'cubeic-alert',
					showClose: true,
					title: '标题',
					onClose: () => {
					this.$createToast({
						type: 'warn',
						time: 1000,
						txt: '点击关闭按钮'
					}).show()
					}
				}).show()
			}
		}
	}
  </script>	
```

* ### 插槽、可自定义类型

<img :src="$withBase('/cube-dialog-slot.png')" style="max-height:400px" alt="mixureSecure">

```vue
  <template>
    <cube-button @click="showAlert">插槽、可自定义类型</cube-button>
  </template>

  <script>
	export default {
		data () {
			return {}
		},
		methods: {
			showAlert() {
				this.$createDialog({
					type: 'alert',
					confirmBtn: {
					text: '我知道了',
					active: true
					}
				}, (createElement) => {
					return [
					createElement('div', {
						'class': {
						'my-title': true
						},
						slot: 'title'
					}, [
						createElement('div', {
						'class': {
							'my-title-img': true
						}
						}),
						createElement('p', '附近车少,优选出租车将来接您')
					]),
					createElement('p', {
						'class': {
						'my-content': true
						},
						slot: 'content'
					}, '价格仍按快车计算')
					]
				}).show()
			}
		}
	}
  </script>	
```
  