// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'cygmNormPro',
    component: BasicLayout,
    meta: { title: '气讯通' },
    children: [
      {
        path: '/home',
        name: 'home', // 路由名称
        component: () => import('@/views/management/home/HomeList'),
        meta: {
          title: '首页', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        }
      },
      {
        path: '/banner',
        name: 'banner', // 路由名称
        component: () => import('@/views/management/banner/BannerList'),
        meta: {
          title: '广告图管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        }
      },
      {
        path: '/account',
        name: 'account', // 路由名称
        redirect: '/account/user-list', // 重定向
        component: RouteView,
        meta: {
          title: '用户管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/account/user-list',
            name: 'userList',
            meta: {
              title: '用户列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/account/UserList')
          },
          {
            path: '/account/resume-list',
            name: 'resumeList',
            meta: {
              title: '用户简历',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/account/ResumeList')
          }
        ]
      },
      {
        path: '/baseEnterprise',
        name: 'baseEnterprise', // 路由名称
        redirect: '/baseEnterprise/enterprise-list', // 重定向
        component: RouteView,
        meta: {
          title: '企业管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/baseEnterprise/enterprise-list',
            name: 'enterpriseList',
            meta: {
              title: '企业列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/baseEnterprise/EnterpriseList')
          }
        ]
      },
      {
        path: '/news',
        name: 'news', // 路由名称
        redirect: '/news/news-tag', // 重定向
        component: RouteView,
        meta: {
          title: '新闻资讯', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/news/news-tag',
            name: 'newsTag',
            meta: {
              title: '新闻标签',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/news/NewsTag')
          },
          {
            path: '/news/news-list',
            name: 'newsList',
            meta: {
              title: '新闻列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/news/NewsList')
          }
        ]
      },
      {
        path: '/policy',
        name: 'policy', // 路由名称
        redirect: '/policy/policy-tag', // 重定向
        component: RouteView,
        meta: {
          title: '政策管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/policy/policy-tag',
            name: 'policyTag',
            meta: {
              title: '政策标签',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/policy/PolicyTag')
          },
          {
            path: '/policy/policy-list',
            name: 'policyList',
            meta: {
              title: '政策列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/policy/PolicyList')
          }
        ]
      },
      {
        path: '/recruit',
        name: 'recruit', // 路由名称
        redirect: '/recruit/recruit-tag', // 重定向
        component: RouteView,
        meta: {
          title: '招聘管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/recruit/recruit-tag',
            name: 'recruitTag',
            meta: {
              title: '招聘标签',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/recruit/RecruitTag')
          },
          {
            path: '/recruit/recruit-list',
            name: 'recruitList',
            meta: {
              title: '招聘信息管理',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/recruit/RecruitList')
          }
        ]
      },
      {
        path: '/study',
        name: 'study', // 路由名称
        redirect: '/study/study-tag', // 重定向
        component: RouteView,
        meta: {
          title: '学习管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/study/study-tag',
            name: 'studyTag',
            meta: {
              title: '课程标签',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/study/StudyTag')
          },
          {
            path: '/study/study-list',
            name: 'studyList',
            meta: {
              title: '课程管理',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/study/StudyList')
          },
          {
            path: '/study/study-group',
            name: 'studyGroup',
            meta: {
              title: '课程集管理',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/study/StudyGroup')
          }
        ]
      },
      {
        path: '/message',
        name: 'message', // 路由名称
        redirect: '/message/message-list', // 重定向
        component: RouteView,
        meta: {
          title: '消息管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/message/message-list',
            name: 'messageList',
            meta: {
              title: '消息列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/message/MessageList')
          }
        ]
      },
      {
        path: '/settings',
        name: 'settings', // 路由名称
        component: RouteView,
        meta: {
          title: '系统管理', // 菜单项名称
          keepAlive: true, // 缓存页面
          icon: bxAnaalyse, // 菜单项图标
          permission: [ 'cygmNormPro' ] // 用来配置这个路由的权限
        },
        children: [
          {
            path: '/baseManager/manager-list',
            name: 'ManagerList',
            meta: {
              title: '管理员列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/baseManager/ManagerList')
          },
          {
            path: '/baseRole/role-list',
            name: 'RoleList',
            meta: {
              title: '角色列表',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/baseRole/RoleList')
          },
          {
            path: '/baseAuthority/add-authority',
            name: 'AddAuthority',
            meta: {
              title: '管理员权限',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/baseAuthority/AddAuthority')
          },
          {
            path: '/baseAuthority/enp-authority',
            name: 'EnterpriseAuthority',
            meta: {
              title: '企业权限',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/baseAuthority/EnterpriseAuthority')
          },
          {
            path: '/settings/index',
            name: 'Index',
            meta: {
              title: '信息设置',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/settings/Index')
          },
          {
            path: '/settings/editPassword',
            name: 'EditPassword',
            meta: {
              title: '修改密码',
              keepAlive: true,
              permission: [ 'cygmNormPro' ]
            },
            component: () => import('@/views/management/settings/EditPassword')
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/page/404', hidden: true
  }
]

/**
 * 基础路由，不需要登录可以访问的路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/management/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/management/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/page/404',
    component: () => import('@/views/management/exception/404')
  }
]
