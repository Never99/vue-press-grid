# 手机类型

## 是否是IphoneX

```js
// h5 底部按钮兼容 iPhone X（解决底部横杠遮挡问题）
function isIphoneX(){
    if(/iphone/gi.test(window.navigator.userAgent)){
        /* iPhone X、iPhone XS */
        let x = (window.screen.width === 375 && window.screen.height === 812);
        /* iPhone XS Max */
        let xsMax = (window.screen.width === 414 && window.screen.height === 896);
        /* iPhone XR */
        let xR = (window.screen.width === 414 && window.screen.height === 896);
        if(x || xsMax || xR){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
}
```

## 兼容IphoneX
```js
 function getAppHeight(){
    // 获取body的高度
    let height = height = document.documentElement.clientHeight;
    /* 函数使用 */
    if(isIphoneX()){
        height = Number(height) - 34;
    }
    return height;
}
```

## 浏览器类型
```js
//判断浏览器 类型pc或者手机端
export const isPc = () => {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet  ,
        isPc = !isPhone && !isAndroid && !isSymbian,
        html5Plus =/(?:Html5Plus)/.test(ua);
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        html5Plus:html5Plus
    }
}
```

## 操作系统类型

```js
//获取操作系统类型
export const getOsPlatform = () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return "android";
    }
    if (isiOS) {
        return "ios";
    }
}
```