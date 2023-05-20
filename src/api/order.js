//admin/log/list
import { get, post } from '../utils/request'
export const list = (params) => get('/admin/order/list', params)
export const orderDelete = (params) => get('/admin/order/delete', params)
export const detail = (params) => get('/admin/order/detail', params)
export const reply = (params) => post('/admin/order/reply', params)
export const renew = (params) => post('/admin/order/renew', params)
export const orderComplete = (params) => get('/admin/order/complete', params)
export const orderCome = (params) => get('/admin/order/come', params)
export const orderAnalysis = (params) => get('/admin/order/analysis', params)
