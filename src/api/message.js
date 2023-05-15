//admin/log/list
import { get, post } from "../utils/request";
export const list = params => get('/admin/message/list', params)
export const detail = params => get('/admin/message/detail', params)
export const reply = params => post('/admin/message/reply', params)



