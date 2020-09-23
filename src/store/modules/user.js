import localStorage from 'store'
import { login, logout, findLoginList, findLoginKeys } from '@/api/login'
import { ACCESS_TOKEN, ACCESS_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '', // 名称
    avatar: '', // 头像
    defaultAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', // 默认头像
    roles: [], // 按钮权限
    info: {}, // 用户信息
    menu: []// 菜单
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.returnValue
          localStorage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          localStorage.set(ACCESS_INFO, result, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          commit('SET_INFO', result)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取当前用户的菜单
    GetMemu ({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 获取菜单
        findLoginList().then(response => {
          // 获取按钮权限
          findLoginKeys({ type: 2 }).then(data => {
            // 回填用户信息
            commit('SET_INFO', localStorage.get(ACCESS_INFO))
            commit('SET_NAME', { name: localStorage.get(ACCESS_INFO).account, welcome: welcome() })
            commit('SET_AVATAR', localStorage.get(ACCESS_INFO).photo)
            // 按钮权限
            commit('SET_ROLES', data.returnValue)
            const result = response.returnValue
            commit('SET_MENU', result)
            resolve(result)
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          commit('SET_MENU', [])
          localStorage.remove(ACCESS_TOKEN)
        })
      })
    }
  }
}

export default user
