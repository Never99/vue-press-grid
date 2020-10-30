# 自定义指令

## 弹框千分符展示
main.js
```js
// 添加自定义指令（数据量太大转换单位展示）
Vue.directive('translate-data',{
    inserted:function(el, binding){
        el.binding = binding;
        el.style.position = "relative";
        let str = `${_TranslateData(binding.value)}
        <div data-dir="bottom" class="cube-tip cube-tip-diy bottom"><i class="cube-tip-angle" style="left: 30%;"></i><i class="mdi mdi-close"></i><div class="cube-tip-content" data-num="${binding.value}">${_formatNumber(binding.value)}</div></div>`
        el.innerHTML = str;
        if (binding.value != "--" && (Number(binding.value) >= 9999 || -Number(binding.value) >= 9999)) {
            el.style.textDecoration = "underline";
        }
    },
    bind: function(el, binding) {
        // el.binding = binding;
        el.addEventListener('click', function(){
            let _this = this;
            let doms = document.querySelectorAll(".cube-tip-diy");
            doms.forEach((val, ind) => {
                val.style.display = "none";
            })
            let num = $(_this.children[0].children[2]).data("num");
            if (num > 9999 || -num > 9999) {
                _this.children[0].style.display = "block";
                _this.children[0].children[1].addEventListener("click", function(e) {
                    e.stopPropagation();
                    _this.children[0].style.display = "none";
                })
            }
        }, true)
    },
    unbind: function(el, binding){
        el.removeEventListener('click', function(){}, true)
    },
    update: function(el, binding){
        el.binding = binding;
        let str = `${_TranslateData(binding.value)}
        <div data-dir="bottom" class="cube-tip cube-tip-diy bottom"><i class="cube-tip-angle" style="left: 30%;"></i><i class="mdi mdi-close"></i><div class="cube-tip-content" data-num="${binding.value}">${_formatNumber(binding.value)}</div></div>`
        el.innerHTML = str;
        if (binding.value != "--" && (Number(binding.value) >= 9999 || -Number(binding.value) >= 9999)) {
            el.style.textDecoration = "underline";
        }
    }
})
```

* ### 使用方法
``` vue
<template>
    // 使用时直接给需要用到的dom元素上添加 v-自定义指令名称即可,对当前需要转换的数据进行转换
    <p class="num" v-translate-data="100000000"></p>
</template>
```

* ### 结果展示  
<img :src="$withBase('/vue-directive.jpeg')" style="max-height:400px" alt="mixureSecure">

