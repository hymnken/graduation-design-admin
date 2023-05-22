// 城市API的Url
// import { request, key } from './request'
import jsonp from 'jsonp'

// 获取城市信息
export async function getCity() {
  const location = await getPosition()
  const key = '4a2f95a41e3741c8aba587d6d113cfb9'
  const cityUrl = 'https://geoapi.qweather.com/v2/city'
  //   return request(
  //     {
  //       url: `/lookup?location=${location}&key=${key}`,
  //       method: 'get',
  //     },
  //     cityUrl
  //   )
  console.log(location)

  // 发起 GET 请求
  const url = `${cityUrl}/lookup?location=${location}&key=${key}`
  //   jsonp(url, (err, data) => {
  //     if (err) {
  //       console.error(err)
  //       return
  //     }
  //     console.log(data)
  //     // 处理返回的数据
  //     responseData = data
  //     // console.log(responseData)
  //   })

  return url
}
// 本身也是异步的，封装返回Promise方便处理
export async function getPosition() {
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
