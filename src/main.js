// JavaScript标准库的 polyfill
import 'core-js/stable' // 仅仅使用稳定的 `core-js` 功能 - ES 和 web 标准
import 'regenerator-runtime/runtime' // 运行时async await转换方案

import Vue from 'vue'
import App from './App.vue'
import router from './router' // 路由
import store from './store/' // 状态管理
import { VueAxios } from './utils/request' // http
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig' // 主题色

import bootstrap from './core/bootstrap' // 读取缓存信息
import './permission' // 路由许可控制 路由守卫
import './core/lazy_use' // 按需引入
import './utils/filter' // 全局过滤器
import './style/global.less' // 全局样式

Vue.config.productionTip = false

// 请求 to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme // 主题色应用

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
