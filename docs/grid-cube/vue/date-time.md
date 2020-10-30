# 时间日期处理

## 当前日期
```js
/**
 * 当前日期 如202061 20201121
 * @returns {string}
 */
const getYYMD = () => {
  return new Date().getFullYear() + "" +(new Date().getMonth() + 1).toString().padStart(2, "0") +  "" + new Date().getDate().toString().padStart(2, "0");
}
```


## 昨天日期
```js
/**
 * 昨天日期 如202061 20201121
 * @returns {string}
 */
const getLastDayYYMD = () => {
  var date = new Date();
  date = new Date(date - 24*3600*1000*1);
  return date.getFullYear() + "" +(date.getMonth() + 1).toString().padStart(2, "0") +  "" + date.getDate().toString().padStart(2, "0");
}
```


## 指定月份最后一天
```js
/**
 * 指定月份最后一天
 */
const getLastDayOfMonth = (year,month) => {
  var date=new Date(year,month,1);
  var cdate=new Date(date.getTime()-1000*60*60*24);
  // return cdate.getDate();
  return cdate.getFullYear() + "" +(cdate.getMonth() + 1).toString().padStart(2, "0") +  "" + cdate.getDate().toString().padStart(2, "0");
}
```

## N天前
```js
/**
 *
 * @param beforeDay
 * @returns {string}
 */
const getBeforeDayYYMD = (beforeDay) => {
  var date = new Date();
  date = new Date(date - 24*3600*1000*beforeDay);
  return date.getFullYear() + "" +(date.getMonth() + 1).toString().padStart(2, "0") +  "" + date.getDate().toString().padStart(2, "0");
}
```

## 上月最后一天日期
```js
/**
 * 上月最后一天日期 如202061 20201121
 * @returns {string}
 */
const getLastMonthYYMD = () => {
  var date = new Date();
  var day = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  var enddate = new Date(new Date().getFullYear(), new Date().getMonth()-1, day);
  return enddate.getFullYear() + "" +(enddate.getMonth() + 1).toString().padStart(2, "0") +  "" + enddate.getDate().toString().padStart(2, "0");
}
```

## 格式化日期
```js
function parseTime(time) {
  if (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  } else {
    return ''
  }
}
//打印结果： "2020-10-29 17:39:39"
```

## 页面防抖、一定时间内不允许再次点击
```js
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
```

