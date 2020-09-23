import request from '@/utils/request'
// 气讯通接口
export const cygmNormProApi = {
  // 管理员端接口
  baseUserFindList: '/admin/baseUser/findList', // 用户列表
  baseUserFinById: '/admin/baseUser/finById', // 用户详情
  baseUserResumeFindList: '/admin/baseUserResume/findList', // 用户简历
  baseUserResumeFindById: '/admin/baseUserResume/findById', // 用户简历详情
  adminUpload: '/admin/file/upload', // 管理员文件上传
  baseManagerFindById: '/admin/baseManager/findById', // 管理员详情
  baseManagerSaveManager: '/admin/control/baseManager/saveManager', // 保存管理员
  baseManagerDeleteAll: '/admin/control/baseManager/deleteAll', // 删除管理员
  baseManagerFindList: '/admin/baseManager/findList', // 管理员列表
  baseManagerResetPassword: '/admin/control/baseManager/resetPassword', // 管理员重置密码
  baseManagerEditPassword: '/admin/baseManager/editPassword', // 管理员自主修改密码
  baseEnterpriseFindById: '/admin/baseEnterprise/findById', // 企业详情
  baseEnterpriseSaveEnterprise: '/admin/control/baseEnterprise/saveEnterprise', // 保存企业
  baseEnterpriseDeleteAll: '/admin/control/baseEnterprise/deleteAll', // 删除企业
  baseEnterpriseFindList: '/admin/baseEnterprise/findList', // 企业列表
  baseEnterpriseUpdateState: '/admin/control/baseEnterprise/updateState', // 企业状态
  baseFieldSaveField: '/admin/control/baseField/saveField', // 保存标签
  baseFieldFindList: '/admin/baseField/findList', // 获取标签
  baseFieldDeleteAll: '/admin/control/baseField/deleteAll', // 删除标签
  baseFieldUpdateState: '/admin/control/baseField/updateState', // 禁用
  baseNewsFindList: '/admin/baseNews/findList', // 新闻资讯列表
  baseNewsSaveNews: '/admin/control/baseNews/saveNews', // 新闻资讯保存
  baseNewsDeleteAll: '/admin/control/baseNews/deleteAll', // 新闻资讯删除
  baseNewsUpdateState: '/admin/control/baseNews/updateState', // 新闻资讯状态
  baseNewsFindById: '/admin/baseNews/findById', // 新闻资讯详情
  baseRecruitFindList: '/admin/baseRecruit/findList', // 招聘信息列表
  baseRecruitSaveRecruit: '/admin/control/baseRecruit/saveRecruit', // 招聘信息保存
  baseRecruitDeleteAll: '/admin/control/baseRecruit/deleteAll', // 招聘信息删除
  baseRecruitUpdateState: '/admin/control/baseRecruit/updateState', // 招聘信息状态
  baseRecruitFindById: '/admin/baseRecruit/findById', // 招聘信息详情
  baseRoleFindList: '/admin/baseRole/findList', // 角色列表
  baseRoleSaveRole: '/admin/control/baseRole/saveRole', // 角色保存
  baseRoleDeleteAll: '/admin/control/baseRole/deleteAll', // 角色删除
  baseRoleFindById: '/admin/baseRole/findById', // 角色详情
  baseAuthorityFindList: '/admin/baseAuthority/findList', // 权限列表
  baseAuthoritySaveAuthority: '/admin/control/baseAuthority/saveAuthority', // 权限保存
  baseAuthorityDeleteAll: '/admin/control/baseAuthority/deleteAll', // 权限删除
  baseAuthorityDeleteRealById: '/admin/control/baseAuthority/deleteRealById', // 物理删除
  baseAuthorityFindById: '/admin/baseAuthority/findById', // 权限详情
  // 企业主文件上传
  enpUpload: '/enp/file/upload',
  baseEnterprisEditPassword: '/enp/baseEnterprise/editPassword' // 企业主修改密码
}
export const baseUrl = 'http://192.168.0.194:8081'

/**
 * 用户列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function baseUserFindList(parameter) {
  return request({
    url: cygmNormProApi.baseUserFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户详情
 * parameter: {
 *       id: '',
 * }
 */
export function baseUserFinById(parameter) {
  return request({
    url: cygmNormProApi.baseUserFinById,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户简历
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function baseUserResumeFindList(parameter) {
  return request({
    url: cygmNormProApi.baseUserResumeFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户简历详情
 * parameter: {
 *       id: '',
 * }
 */
export function baseUserResumeFindById(parameter) {
  return request({
    url: cygmNormProApi.baseUserResumeFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function baseManagerFindList(parameter) {
  return request({
    url: cygmNormProApi.baseManagerFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员详情
 * parameter: {
 *       id: '',
 * }
 */
export function baseManagerFindById(parameter) {
  return request({
    url: cygmNormProApi.baseManagerFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员删除
 * parameter: {
 *       id: '',
 * }
 */
export function baseManagerDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseManagerDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员保存
 * parameter: {
 *       id: '',
 * }
 */
export function baseManagerSaveManager(parameter) {
  return request({
    url: cygmNormProApi.baseManagerSaveManager,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员重置密码
 * parameter: {
 *       id: '',
 * }
 */
export function baseManagerResetPassword(parameter) {
  return request({
    url: cygmNormProApi.baseManagerResetPassword,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员自主修改密码
 * parameter: {
 *       id: '',
 * }
 */
export function baseManagerEditPassword(parameter) {
  return request({
    url: cygmNormProApi.baseManagerEditPassword,
    method: 'post',
    data: parameter
  })
}

/**
 * 管理员文件上传
 */
export function adminUpload(parameter) {
  return request({
    url: cygmNormProApi.adminUpload,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function baseEnterpriseFindList(parameter) {
  return request({
    url: cygmNormProApi.baseEnterpriseFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业详情
 * parameter: {
 *       id: '',
 * }
 */
export function baseEnterpriseFindById(parameter) {
  return request({
    url: cygmNormProApi.baseEnterpriseFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业删除
 * parameter: {
 *       id: '',
 * }
 */
export function baseEnterpriseDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseEnterpriseDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业保存
 * parameter: {
 *       id: '',
 * }
 */
export function baseEnterpriseSaveEnterprise(parameter) {
  return request({
    url: cygmNormProApi.baseEnterpriseSaveEnterprise,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业状态
 * parameter: {
 *       id: '',
 * }
 */
export function baseEnterpriseUpdateState(parameter) {
  return request({
    url: cygmNormProApi.baseEnterpriseUpdateState,
    method: 'post',
    data: parameter
  })
}

/**
 * 保存标签
 */
export function baseFieldSaveField(parameter) {
  return request({
    url: cygmNormProApi.baseFieldSaveField,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取标签
 */
export function baseFieldFindList(parameter) {
  return request({
    url: cygmNormProApi.baseFieldFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 删除标签
 */
export function baseFieldDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseFieldDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 禁用标签
 */
export function baseFieldUpdateState(parameter) {
  return request({
    url: cygmNormProApi.baseFieldUpdateState,
    method: 'post',
    data: parameter
  })
}

/**
 * 新闻资讯列表
 */
export function baseNewsFindList(parameter) {
  return request({
    url: cygmNormProApi.baseNewsFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 新闻资讯保存
 */
export function baseNewsSaveNews(parameter) {
  return request({
    url: cygmNormProApi.baseNewsSaveNews,
    method: 'post',
    data: parameter
  })
}

/**
 * 新闻资讯删除
 */
export function baseNewsDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseNewsDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 新闻资讯状态
 */
export function baseNewsUpdateState(parameter) {
  return request({
    url: cygmNormProApi.baseNewsUpdateState,
    method: 'post',
    data: parameter
  })
}

/**
 * 新闻资讯详情
 */
export function baseNewsFindById(parameter) {
  return request({
    url: cygmNormProApi.baseNewsFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 招聘信息列表
 */
export function baseRecruitFindList(parameter) {
  return request({
    url: cygmNormProApi.baseRecruitFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 招聘信息保存
 */
export function baseRecruitSaveRecruit(parameter) {
  return request({
    url: cygmNormProApi.baseRecruitSaveRecruit,
    method: 'post',
    data: parameter
  })
}

/**
 * 招聘信息删除
 */
export function baseRecruitDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseRecruitDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 招聘信息状态
 */
export function baseRecruitUpdateState(parameter) {
  return request({
    url: cygmNormProApi.baseRecruitUpdateState,
    method: 'post',
    data: parameter
  })
}

/**
 * 招聘信息详情
 */
export function baseRecruitFindById(parameter) {
  return request({
    url: cygmNormProApi.baseRecruitFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 角色列表
 */
export function baseRoleFindList(parameter) {
  return request({
    url: cygmNormProApi.baseRoleFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 角色保存
 */
export function baseRoleSaveRole(parameter) {
  return request({
    url: cygmNormProApi.baseRoleSaveRole,
    method: 'post',
    data: parameter
  })
}

/**
 * 角色删除
 */
export function baseRoleDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseRoleDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 角色详情
 */
export function baseRoleFindById(parameter) {
  return request({
    url: cygmNormProApi.baseRoleFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 权限列表
 */
export function baseAuthorityFindList(parameter) {
  return request({
    url: cygmNormProApi.baseAuthorityFindList,
    method: 'post',
    data: parameter
  })
}

/**
 * 权限保存
 */
export function baseAuthoritySaveAuthority(parameter) {
  return request({
    url: cygmNormProApi.baseAuthoritySaveAuthority,
    method: 'post',
    data: parameter
  })
}

/**
 * 权限删除
 */
export function baseAuthorityDeleteAll(parameter) {
  return request({
    url: cygmNormProApi.baseAuthorityDeleteAll,
    method: 'post',
    data: parameter
  })
}

/**
 * 物理删除
 */
export function baseAuthorityDeleteRealById(parameter) {
  return request({
    url: cygmNormProApi.baseAuthorityDeleteRealById,
    method: 'post',
    data: parameter
  })
}

/**
 * 权限详情
 */
export function baseAuthorityFindById(parameter) {
  return request({
    url: cygmNormProApi.baseAuthorityFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业主文件上传
 */
export function enpUpload(parameter) {
  return request({
    url: cygmNormProApi.enpUpload,
    method: 'post',
    data: parameter
  })
}

/**
 * 企业主修改密码
 */
export function baseEnterprisEditPassword(parameter) {
  return request({
    url: cygmNormProApi.baseEnterprisEditPassword,
    method: 'post',
    data: parameter
  })
}
