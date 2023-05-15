import { get, post } from "../utils/request";
export const login = params => post('/admin/login', params)
export const logout = params => get('/admin/logout', params)

export const list = params => get('/admin/user/list', params)
export const h5UserList = params => get('/admin/h5/user/list', params)
export const userDetail = params => get('/admin/user/detail', params)
export const userProfile = params => get('/admin/user/profile', params)
export const userModify = params => post('/admin/user/modify', params)
export const h5UserModify = params => post('/admin/h5/user/modify', params)
export const userProfileModify = params => post('/admin/user/profile/modify', params)
export const userDelete = params => get('/admin/user/delete', params)
export const h5UserDelete = params => get('/admin/h5/user/delete', params)

export const roleList = params => get('/admin/role/list', params)
export const roleCreate = params => post(`/admin/role/create`, params)
export const roleModify = params => post(`/admin/role/modify`, params)
export const roleDetail = params => get('/admin/role/detail', params)
export const roleDelete = params => get(`/admin/role/delete`, params)
export const permissionList = params => get('/admin/permission/list', params)



