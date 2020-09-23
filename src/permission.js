import router from './router'
import store from './store'
import localStorage from 'store'
import NProgress from 'nprogress' // 头部加载进度
import '@/components/NProgress/nprogress.less' // 加载进度css
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['login'] // 不需要登录
const loginRoutePath = '/user/login'
const defaultRoutePath = '/home'
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  // 设置title
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  /* 获取 token */
  if (localStorage.get(ACCESS_TOKEN)) {
    // 如果有token
    if (to.path === loginRoutePath) {
      // 进入登录页面重定向到首页
      next({ path: defaultRoutePath })
      // 结束进度条
      NProgress.done()
    } else {
      // 菜单为空
      if (store.getters.menu.length === 0) {
        // 请求菜单
        store.dispatch('GetMemu').then(res => {
            if (res.length > 0) {
              // 组合菜单
              store.dispatch('GenerateRoutes', { res }).then(() => {
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                // 请求带有 redirect 重定向时，登录自动重定向到该地址
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  // 重定向，不留历史记录
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            }
          }).catch((error) => {
            notification.error({
              message: '错误',
              description: error
            })
            // 失败时，获取菜单失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              // 跳转到登录
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
              // 结束进度条
              NProgress.done()
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 跳转到登录
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})
// 路由全局后置钩子
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    window.location.reload()
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log(error)
  }
})
