// 首先引入axios和上一步封装的cookie方法
import axios from "axios";
import type { AxiosRequestHeaders, AxiosResponse } from "axios";
const { VITE_BASE_URL } = import.meta.env;
import base from "@/base";
const service = axios.create({
  timeout: 10000, // request timeout
});
// service.defaults.withCredentials = true;//表示跨域请求时是否需要使用凭证
service.interceptors.request.use(
  (config) => {
    (config.headers as any)["PC-Access-Token"] = sessionStorage.getItem(base.tokenKey) || "";
    return config;
  },
  (error) => Promise.reject(error)
);
//http response 拦截
service.interceptors.response.use(
  (res) => {
    const status = res.data.code || res.status;
    const message = res.data.massage || res.data.error_description || "未知错误";
    if (status == 200) return Promise.resolve(res.data);
    // token过期
    else if (status == 1005) {
    }
    //5开头代表服务端错误
    else if (status >= 500) return Promise.reject(new Error(message));
    else return Promise.reject(new Error(message));
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// 加载动画
let loadingInstance: any;
const startLoading = () => (loadingInstance = ElLoading.service());
const closeLoading = () => loadingInstance.close();
interface Response<T> {
  code: number;
  result: T;
  message: string;
  success: boolean;
}
const request = <T>(type: "get" | "post", api: string, data: object, loading: boolean, headers: AxiosRequestHeaders = {}): Promise<Response<T>> => {
  if (loading) startLoading();
  return new Promise((resolve, reject) => {
    const query = type === "get" ? { params: { ...data } } : data;
    service[type](api, query, { headers })
      .then((res: AxiosResponse<Response<T>>) => resolve(Promise.resolve(res as any as Response<T>)))
      .catch((err) => reject(err))
      .finally(() => loading && closeLoading());
  });
};

const get = <T = any>(api: string, params: object = {}, loading: boolean = false, headers: AxiosRequestHeaders = {}) => request<T>("get", api, params, loading, headers);
const post = <T = any>(api: string, data: object = {}, loading: boolean = false, headers: AxiosRequestHeaders = {}) => request<T>("post", api, data, loading, headers);
export { get, post, request };
