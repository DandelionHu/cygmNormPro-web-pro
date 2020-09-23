import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/vueComponent/ant-design-vue-pro/pull/53
 */
// 注册全局指令v-action
const action = Vue.directive('action', {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function (el, binding, vnode) {
    // arg传给指令的参数 add、edit、delete
    const actionName = binding.arg
    // 获取权限
    const roles = store.getters.roles
    if (!roles.includes(actionName)) {
      // 没有权限，删除当前el
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default action
