import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  // 你需要动态引入的页面组件
  'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/management/exception/404'),
  'HomeList': () => import(/* webpackChunkName: "fail" */'@/views/management/home/HomeList'),
  'BannerList': () => import(/* webpackChunkName: "fail" */'@/views/management/banner/BannerList'),
  // 用户管理
  'UserList': () => import(/* webpackChunkName: "fail" */'@/views/management/account/UserList'),
  'ResumeList': () => import(/* webpackChunkName: "fail" */'@/views/management/account/ResumeList'),
  // 企业管理
  'EnterpriseList': () => import(/* webpackChunkName: "fail" */'@/views/management/baseEnterprise/EnterpriseList'),
  // 新闻资讯
  'NewsTag': () => import(/* webpackChunkName: "fail" */'@/views/management/news/NewsTag'),
  'NewsList': () => import(/* webpackChunkName: "fail" */'@/views/management/news/NewsList'),
  // 政策管理
  'PolicyTag': () => import(/* webpackChunkName: "fail" */'@/views/management/policy/PolicyTag'),
  'PolicyList': () => import(/* webpackChunkName: "fail" */'@/views/management/policy/PolicyList'),
  // 系统设置
  'ManagerList': () => import(/* webpackChunkName: "fail" */'@/views/management/baseManager/ManagerList'),
  'RoleList': () => import(/* webpackChunkName: "fail" */'@/views/management/baseRole/RoleList'),
  'AddAuthority': () => import(/* webpackChunkName: "fail" */'@/views/management/baseAuthority/AddAuthority'),
  'EnterpriseAuthority': () => import(/* webpackChunkName: "fail" */'@/views/management/baseAuthority/EnterpriseAuthority'),
  'SettingsIndex': () => import(/* webpackChunkName: "fail" */'@/views/management/settings/Index'),
  'EditPassword': () => import(/* webpackChunkName: "fail" */'@/views/management/settings/EditPassword')
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/page/404', hidden: true
}
// 根级菜单
const rootRouter = {
  path: '/',
  name: 'cygmNormPro',
  component: BasicLayout,
  meta: {
    title: '气讯通'
  },
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (data) => {
  return new Promise((resolve, reject) => {
    const menuNav = []
    const childrenNav = []
    // 后端数据, 根级树数组,  根级 PID
    listToTree(data, childrenNav, '0')
    const routers = generator(childrenNav)
<<<<<<< HEAD
    console.log(routers)
=======
>>>>>>> 05dc83261a2e007a3cd5dc062135bdbd20957d96
    rootRouter.children = routers
    menuNav.push(rootRouter)
    menuNav.push(notFoundRouter)
    resolve(menuNav)
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      path: item.path || '',
      // 路由名称，建议唯一
      name: item.namekey || '',
      // 该路由对应页面的
      component: constantRouterComponents[item.htmlurl],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.name,
        icon: item.icon ? item.icon : undefined,
        hiddenHeaderContent: item.hiddenHeaderContent || undefined,
        keepAlive: true,
        permission: item.authKeys
      }
    }
    // 是否设置了隐藏菜单
    if (item.showMenu === '1') {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (item.hideChildren === '1') {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单 parentId=0
    if (item.pid === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
