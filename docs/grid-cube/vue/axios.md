# Axios请求

## 添加请求拦截器
在main.js文件配置
```js
import axios from 'axios'
const service = axios.create();
// 添加请求拦截器（添加token）
service.interceptors.request.use(function (config) {
    let authorization = sessionStorage.getItem('authorization');
    let refreshToken = sessionStorage.getItem("token");
    if (authorization && refreshToken) {
        //判断授权后是否获取token
        config.headers["Authorization"] = 'Bearer ' + refreshToken;
    } else if (authorization) {
        //判断是否授权
        config.headers["Authorization"] = 'Basic ' + authorization;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
```

## 添加响应拦截器 
在main.js文件配置（承接上文）
```js
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default service
```


get：获取数据

post：提交数据（表单提交+文件上传）

put：更新数据（所有数据推送到后端）

patch：更新数据（只将更改的数据推送到后端）

delete：删除数据

:::tip
独立文件（http.js）封装后，在main.js中引入，封装请求之前先引入axios
        
        const axios = require('axios')
:::

## 封装get请求 
```js
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
        axios.get(url, params).then(response => {
            if(response && response.data) {
                resolve(response.data);
            }
        }).catch(err => {
			reject(err)
		})
	})
}
```


## 封装post请求
```js
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then(response => {
            if(response && response.data) {
                resolve(response.data);
            }
		}).catch(err => {
			reject(err)
		})
	})
}
```


## 封装patch请求
```js
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data).then(response => {
            if(response && response.data) {
                resolve(response.data);
            }
		}).catch(err => {
            reject(err)
        })
	})
}
```


## 封装put请求
```js
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then(response => {
            if(response && response.data) {
                resolve(response.data);
            }
		}).catch(err => {
            reject(err)
        })
	})
}
```


## 封装delete请求
```js
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function delete(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then(response => {
            if(response && response.data) {
                resolve(response.data);
            }
		}).catch(err => {
            reject(err)
        })
	})
}
```


## 封装后使用 在main.js中
``` js
import Vue from 'vue'
// 引入上述封装请求的文件
import { post, get, patch, put, delete } from './http.js';

// 挂载到 Vue 原型上
Vue.prototype.$get = get; // 获取数据
Vue.prototype.$post = post; // 提交数据（表单提交+文件上传）
Vue.prototype.$patch = patch; // 更新数据（所有数据推送到后端）
Vue.prototype.$put = put; // 更新数据（只将更改的数据推送到后端）
Vue.prototype.$delete = delete; // 删除数据
```
