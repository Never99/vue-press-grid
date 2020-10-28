# cube-scroll(滚动加载)

对于 Scroll 组件，其实就是内容元素.cube-scroll-content在滚动方向上的长度必须大于容器元素 .cube-scroll-wrapper。根据滚动方向的不同，有以下两种情况：

1）纵向滚动：内容元素的高度必须大于容器元素。由于容器元素的高度默认会被子元素的高度撑开，所以为了满足我们的滚动前提，你需要给 Scroll 组件的 .cube-scroll-wrapper元素一个非弹性高度。

2）横向滚动：内容元素的宽度必须大于容器元素。由于在默认情况下，子元素的宽度不会超过容器元素，所以需要给 Scroll 组件的 .cube-scroll-content 元素设置大于 .cube-scroll-wrapper 的宽度。

**注意：任何时候如果出现无法滚动的情况，`都应该首先查看内容元素.cube-scroll-content的元素高度/宽度是否大于容器元素.cube-scroll-wrapper的高度/宽度`。这是内容能够滚动的前提条件。如果内容存在图片的情况，可能会出现 DOM 元素渲染时图片还未下载，因此内容元素的高度小于预期，出现滚动不正常的情况。此时你应该在图片加载完成后，比如 onload 事件回调中，手动调用 Scroll 组件的 refresh() 方法，它会重新计算滚动距离。**


:::tip
下面代码已是项目中的下拉刷新、上拉加载请求数据的操作，可直接复制使用，在下拉、上拉的函数回调中做分页的参数配置以及接口的调用。
:::


```vue
  <template>
    // cube-scroll 标签外的盒子必须有固定高度，否则不会生效

    // direction属性：horizontal（水平）、vertical（垂直）
    <div class="scroll-list-wrap" style="height: 400px;">
        <cube-scroll
            ref="scroll"
            :data="dataList"
            :options="options"
            direction="horizontal"
            @pulling-up="onPullingUp()"
            @pulling-down="onPullingDown()">
                <div v-for="(item, ind) in dataList" :key="ind">
                    <p>{{item.name}}</p>
                </div>
        </cube-scroll>
    </div>
  </template>

  <script>
	export default {
		data () {
			return {
                dataList: [],
                pageNo: 1,
                pageSize: 10
            }
		},
        computed: {
            pullUpLoadObj() {
                return {
                    pullUpLoad: true,
                    txt: {more: "", noMore: "没有更多数据了"}
                }
            },
            pullDownRefreshObj() {
                return {
                    pullDownRefresh: true,
                    txt: "刷新成功"
                }
            },
            options() {
                return {
                    pullDownRefresh: this.pullDownRefreshObj,
                    pullUpLoad: this.pullUpLoadObj,
                    scrollbar: true,
                    click: true, // 为true时，才不会和scroll的滚动事件冲突，不然点击事件都会失效（点击无反应）
                }
            },
        },
        methods: {
            // ==== 下拉刷新 ==== 
            onPullingDown() {
                this.pageNo = 1;

                // 调用接口请求数据
                // ajaxCallback();
            },
            // ==== 上拉加载 ====
            onPullingUp() { 
                this.pageNo++;

                // 调用接口请求数据，
                // ajaxCallback();

                // 上拉加载需要判断当前页和接口返回的总页进行处理：
                // this.$refs.scroll.forceUpdate()【调用此函数无数据或无更多数据会提示】
            },
        }
	}
  </script>	
```
  