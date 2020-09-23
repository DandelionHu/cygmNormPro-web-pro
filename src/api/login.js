import request from '@/utils/request'
const userApi = {
  // 管理员
  Login: '/managerLogin', // 登录
  Logout: '/admin/managerLogout', // 退出登录
  findLoginList: '/admin/baseAuthority/findLoginList', // 菜单
  findLoginKeys: '/admin/baseAuthority/findLoginKeys' // 按钮权限
}

/**
 * 登录接口
 * parameter: {
 *     account: '',
 *     password: '',
 *     remember_me: true,
 * }
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}
/**
 * 退出
 */
export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/**
 * 菜单
 */
export function findLoginList () {
  return request({
    url: userApi.findLoginList,
    method: 'post'
  })
}
/**
 * 按钮权限
 */
export function findLoginKeys (parameter) {
  return request({
    url: userApi.findLoginKeys,
    method: 'post',
    data: parameter
  })
}
