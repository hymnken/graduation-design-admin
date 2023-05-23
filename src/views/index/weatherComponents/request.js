import axios from 'axios'

export const key = '4a2f95a41e3741c8aba587d6d113cfb9'

export function request(config, url) {
  const service = axios.create({
    baseURL: url,
    timeout: 5000,
  })

  //请求拦截
  service.interceptors.request.use(
    (config) => {
      // 在这里可以拦截判断登录、loading等操作
      // return config表示通过了
      // 本实例暂时用不着，先封着
      return config
    },
    (error) => {
      console.log(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    (res) => {
      // 这里是服务器返回数据给我们
      // 在这之前处理一些内容，比如判断状态码200之类的
      // 大部分是data，可以封装起来
      return res.data ? res.data : res
    },
    (error) => {
      console.log(error)
    }
  )

  //返回
  return service(config)
}
