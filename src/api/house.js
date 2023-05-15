//admin/log/list
import { get, post } from "../utils/request";
export const list = params => get('/admin/house/list', params)
export const houseModify = params => post('/admin/house/modify', params)
export const houseOff = params => post('/admin/house/off', params)
export const imageList = params => get('/admin/house/images/list', params)




