import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const Service = axios.create({
  baseURL: 'http://exam.etao.net:8081/v1/',
  timeout: 20000
})
// 请求拦截器
Service.interceptors.request.use((config) => {
  // 展示进度条

  NProgress.start()
  // config 是当前请求的相关配置信息对象，可以修改
  config.headers.Authorization = window.localStorage.getItem('token')
  // 在最后必须return config
  // 当这里 return config之后，才会真正发送请求
  return config
})
// 响应拦截器
Service.interceptors.response.use((config) => {
  // 隐藏进度条
  NProgress.done()
  return config
})
export default Service
