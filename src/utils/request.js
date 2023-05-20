//引入 axios
import axios from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config/index'
import { getToken } from '@/utils/index'
import router from '../router'
axios.defaults.withCredentials = true
const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000 * 10,
})
const routerToLogin = () => {
  const href = location.href
  router.replace({
    name: 'login',
    query: {
      redirect: encodeURIComponent(href),
    },
  })
  //  window.location.href = '/login?redirect='+ encodeURIComponent (href)
}

// 数据请求拦截
request.interceptors.request.use(
  (config) => {
    config.headers = Object.assign(config.headers, {
      Authorization: 'Bearer ' + getToken(),
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回响应数据拦截
request.interceptors.response.use(
  (res) => {
    const data = res.data
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    if (res.status === 200) {
      const code = data.status || data.code
      if (code === 200 || code === 0) {
        return Promise.resolve(data.data)
      } else {
        if (code === 401) {
          routerToLogin()
          return Promise.reject()
        } else {
          message.error(data.message || '网络开小差了~')
          return Promise.reject()
        }
      }
    }
  },
  (error) => {
    if (error.code === 'ECONNABORTED' && error.message.includes(`timeout`)) {
      message.error(`连接超时`)
    } else {
      if (error.response) {
        if (error.response.status) {
          // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
          const data = error.response.data || {}
          switch (error.response.status) {
            case 401:
              routerToLogin()
              break
            case 404:
              message.error(data.message || '404 not found ')
              break
            case 502:
              message.error(data.message || '网络开小差了~')
              break
            default:
              message.error(data.message || '网络开小差了~')
              break
          }
        } else {
          message.error(error.message || `请求失败`)
        }
      } else {
        message.error(error.message || '请检查网络')
      }
    }
    return Promise.reject(error)
  }
)
export default request

export const get = (url, params) => request({ url, params, method: 'GET' })
export const post = (url, params) => request({ url, data: params, method: 'POST' })
