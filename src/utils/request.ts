// 首先引入axios和上一步封装的cookie方法
import axios from 'axios'
import type { AxiosRequestHeaders, AxiosResponse } from 'axios'
const { VITE_BASE_URL } = import.meta.env
import { toast, showLoading } from './index'
import base from '@/base'
const service = axios.create({
  baseURL: VITE_BASE_URL
  // timeout: 10000, // request timeout
})
// service.defaults.withCredentials = true;//表示跨域请求时是否需要使用凭证
service.interceptors.request.use(
  (config: any) => {
    config.headers[base.tokenKey] = sessionStorage.getItem(base.tokenKey) || ''
    return config
  },
  error => Promise.reject(error)
)
//http response 拦截
service.interceptors.response.use(
  res => {
    const status = res.data.code || res.status
    const message = res.data.massage || res.data.error_description || '未知错误'
    if (status == 200) return Promise.resolve(res.data)
    // token过期
    else if (status == 1005) {
    }
    //5开头代表服务端错误
    else if (status >= 500) return Promise.reject(new Error(message))
    else return Promise.reject(new Error(message))
  },
  error => {
    return Promise.reject(new Error(error))
  }
)
interface Response<T> {
  code: number
  data: T
  msg: string
  success: boolean
}
const request = <T = any>(type: 'get' | 'post', api: string, data: object, loading: boolean, headers: AxiosRequestHeaders = {}): Promise<Response<T>> => {
  let loadingToast: any
  if (loading) loadingToast = showLoading()
  return new Promise((resolve, reject) => {
    const query = type === 'get' ? { params: data } : data
    //@ts-ignore;
    service[type](api, query, { headers })
      .then((res: AxiosResponse<Response<T>>) => resolve(Promise.resolve(res as any as Response<T>)))
      .catch((err: AxiosResponse) => reject(err))
      .finally(() => loading && loadingToast.close())
  })
}
type Requestoptions = {
  url: string
  loading?: boolean
  headers?: any
}
/**
 * get请求
 * @param  query 请求配置
 * @param data 请求参数
 * @param  success 成功回调
 * @param  err 失败回调
 */

const get = <T = any>({ url, loading = true, headers = {} }: Requestoptions, data: any = {}, success: Function, err?: Function) => {
  request<T>('get', url, data, loading, headers)
    .then(res => {
      if (res.code == 200 || res.code == 1004) {
        success(res)
      } else {
        toast(res.msg)
        err?.(res)
      }
    })
    .catch(res => {
      err?.({ msg: res.message })
    })
}

/**
 * post请求
 * @param  query 请求配置
 * @param data 请求参数
 * @param success 成功回调
 * @param  err 失败回调
 */

const post = <T = any>({ url, loading = true, headers = {} }: Requestoptions, data: any = {}, success: Function, err?: Function) => {
  request<T>('post', url, data, loading, headers)
    .then(res => {
      if (res.code == 200 || res.code == 1004) {
        success(res)
      } else {
        toast(res.msg)
        err?.(res)
      }
    })
    .catch(res => {
      err?.({ msg: res.message })
    })
}
export { get, post, request }
