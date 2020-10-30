# Vuex使用

**vuex 用处：管理全局状态（类似全局变量，每个组件都能访问到）结构:**

* **state&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存放状态**  
* **mutations&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state成员操作（修改state值唯一的方法）**  
* **getters&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加工state成员给外界**   
* **actions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;异步操作**    
* **modules&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;模块化状态管理**   

store/index.js
```js
// 声明state
export default new Vuex.Store({
  state: {
    city: '北京'
  },
  getters: { // 加工state成员给外界
    //方法名随意,主要是来承载变化的city的值，下面mutations,actions里面的方法名也是随意定的
    getCity(state) { 
      return state.city
    }
  },
  mutations: { // mutation提交更改state的唯一的状态
    setCity(state, value) {
      state.city = value;
    }
  },
  actions: { // action 提交的是 mutation，而不是直接变更状态。
    selectCity(context, params) {
      context.commit('setCity', params.city);
    }
  }
});
```

* ### 使用方法

:::tip
**mapState、mapGetters 辅助函数是放在 computed 中使用的**  
**mapActions、mapMutations 辅助函数是放在 methods 中使用的**  
:::
``` vue
<template>
  <div>
    <div>{{getCity}}</div>
    <div>{{city}}</div>
    <div @click="changeCity">改变城市名称</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    //设置别名，起到简化代码的作用，比如this.$store.state.cityID可以用this.cId替代
    // 方法一：
    // ...mapState({
    //   cname:state => state.city
    // }),
    // 方法二：
    // ...mapState({
    //   cname:'city'
    // }),
    // 方法三(不设置别名，直接使用this.city即可)：
    ...mapState(["city"]),
    ...mapGetters(["getCity"])
  },
  methods: {
    // 方法一：设置别名（mapMutations如此）
    // ...mapState({
    //   selectCityFn:'selectCity'
    // }),
    // 方法二：(不设置别名，直接使用this.selectCity()即可)：
    ...mapActions(['selectCity']),
    ...mapMutations(["setCity"]),
    changeCity() {
      this.city += "0";
      this.setCity(this.city)
    }
  }
}
</script>
```