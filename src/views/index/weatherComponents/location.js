// 城市API的Url
import { request, key } from './request'
const cityUrl = 'https://geoapi.qweather.com/v2/city'

// 获取城市信息
export async function getCity() {
  const location = await getPosition()

  return request(
    {
      url: `/lookup?location=${location}&key=${key}`,
      method: 'get',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    },
    cityUrl
  )
}
// 本身也是异步的，封装返回Promise方便处理
function getPosition() {
  return new Promise(function (resolve) {
    if ('geolocation' in navigator) {
      /* 地理位置服务可用 */
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position.coords.longitude + ',' + position.coords.latitude)
        },
        function () {
          /* 支持定位，但定位失败，默认北京 */
          resolve('116.41,39.92')
        },
        {
          timeout: 5000,
        }
      )
    } else {
      /* 地理位置服务不可用，默认北京 */
      resolve('116.41,39.92')
    }
  })
}
