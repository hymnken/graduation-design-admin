import { key, request } from './request'

// 城市信息API
// const cityUrl = 'https://geoapi.qweather.com/v2/city'
// const cityUrl = 'https://geoapi.qweather.com/'
const cityUrl = `/api/v2/city`
// 获取城市信息
export async function getCity(type = 0) {
  //const location = await getPosition()
  const location = type === 1 ? await getPosition() : await getLocation()

  return request(
    {
      url: `/lookup?location=${location}&key=${key}&callbackName=weatherCallback`,
      method: 'get',
    },
    cityUrl
  )
}

// 模糊查询城市
export async function getVaguaCity(keyword) {
  return request(
    {
      url: `/lookup?location=${keyword}&key=${key}`,
      method: 'get',
    },
    cityUrl
  )
}

// 获取热门城市
export function getTopCity() {
  return request(
    {
      url: `/top?&key=${key}`,
      method: 'get',
    },
    cityUrl
  )
}

// 获取本地存储的经纬度
export async function getLocation() {
  // sessionStorage是临时存储(会话)，关闭浏览器后会消失
  // localStorage是永久存储(本地)，关闭浏览器后不会消失
  if (sessionStorage.getItem('location')) {
    // 第二次获取
    return sessionStorage.getItem('location')
  } else {
    // 第一次获取经纬度
    let location = await getPosition()
    setLocation(location)
    return location
  }
}

// 写入临时存储
export function setLocation(location) {
  sessionStorage.setItem('location', location)
}

// 写入记录，本地存储
export function setRecord(location, cityName) {
  // 永久本地存储
  if (localStorage.getItem('cities')) {
    // 得到传递过来的经纬度和城市名
    const cl = cityName + '-' + location

    // 获取存储里的历史
    const arr = JSON.parse(localStorage.getItem('cities'))

    // 判断数组中是否存在重复
    if (arr.indexOf(cl) !== -1) {
      // 删除重复的元素
      arr.splice(arr.indexOf(cl), 1)
    } else if (arr.length >= 5) {
      // 删除最后一个元素
      arr.splice(4, 1)
    }

    // 给数组添加新历史
    arr.unshift(cl)

    // 写入本地存储
    localStorage.setItem('cities', JSON.stringify(arr))
  } else {
    // 当没有存储的时候
    const arr = [cityName + '-' + location]
    localStorage.setItem('cities', JSON.stringify(arr))
  }
}

// 获取记录，本地存储
export function getRecord() {
  // 判断是否存在
  if (localStorage.getItem('cities')) {
    return JSON.parse(localStorage.getItem('cities'))
  } else {
    return []
  }
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
