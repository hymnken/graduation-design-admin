import { key, request } from './request.js'

// 天气信息API
const weatherUrl = '/apq/v7'

// 获取天气概况
export function getGeneral(location) {
  return request(
    {
      url: `/weather/now?location=${location}&key=${key}`,
      method: 'get',
    },
    weatherUrl
  )
}

// 空气质量指数
export function getAir(location) {
  return request(
    {
      url: `/air/now?location=${location}&key=${key}`,
      method: 'get',
    },
    weatherUrl
  )
}

// 获取7天天气预报
export function getWeek(location) {
  return request(
    {
      url: `/weather/7d?location=${location}&key=${key}`,
      method: 'get',
    },
    weatherUrl
  )
}

// 获取天气质量指数
export function getIndices(location, type = 0) {
  return request(
    {
      url: `/indices/1d?location=${location}&key=${key}&type=${type}`,
      method: 'get',
    },
    weatherUrl
  )
}
