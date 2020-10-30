# JS常用处理方法


## 邮箱模糊化
```js
function regEmail(email) {
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return new_email
}
regEmail("yyd5201314@qq.com")
// 打印结果："yyd******@qq.com"
```

## 手机号模糊化
```js
// 替换手机字符
function regMobile(mobile) {
  if (mobile.length > 7) {
    var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return new_mobile
}
regMobile("13323232323")

// 打印结果："133****2323"
```

## 千分符
```js
// 千分符
function format (num) {
    return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
}
format (123456789);

// 打印结果："123,456,789"
```