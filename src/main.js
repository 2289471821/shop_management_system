import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式表
import '@/assets/css/global.css'

import axios from 'axios'
// 配置请求路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// axios 请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
