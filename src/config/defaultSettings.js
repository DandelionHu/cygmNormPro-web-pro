/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  navTheme: 'dark', // theme for nav menu light
  primaryColor: '#00b38b', // 默认主题色
  contentWidth: false, // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: true, // 固定 Header
  fixSiderbar: true, // 固定 siderbar
  colorWeak: false,
  multiTab: true,
  lang: 'zh-CN',
  menu: {
    locale: false
  },
  title: '气讯通',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
