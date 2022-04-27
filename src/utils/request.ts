// 首先引入axios和上一步封装的cookie方法
import axios from "axios";
import type { AxiosRequestHeaders, AxiosResponse } from "axios";
const { VITE_BASE_URL } = import.meta.env;
import { toast, Toast } from "./index";
import base from "@/base";
const service = axios.create({
  baseURL: VITE_BASE_URL,
  // timeout: 10000, // request timeout
});
// service.defaults.withCredentials = true;//表示跨域请求时是否需要使用凭证
service.interceptors.request.use(
  (config) => {
    // (config.headers as any)[base.tokenKey] = sessionStorage.getItem(base.tokenKey) || "";
    (config.headers as any).Authorization = "d2FwOlpNOUtuNU50SA==";
    (config.headers as any).token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJ1c2VyIiwidXNlcl9pZCI6IjYxODY0IiwidXNlcl9uYW1lIjoiMzIxMzIxMzEiLCJuaWNrX25hbWUiOiLmnY7plb_pnZIiLCJvYXV0aF9pZCI6IjE1MTQ0OTQxOTM1MjE3MDA4NjUiLCJkZXRhaWwiOnsiaWQiOjYxODY0LCJwaWQiOjAsInBwaWQiOjAsImFjY291bnQiOiIyODc2NDYwIiwibW9iaWxlIjoiMzIxMzIxMzEiLCJuaWNrTmFtZSI6IuadjumVv-mdkiIsInJlYWxOYW1lIjoi5p2O6ZW_6Z2SIiwiaWRDYXJkIjoiNDMwNTI0MTk2NDAyMjkwNzIxIiwiaWRDYXJkRnJvbnQiOiJodHRwczovL3d3dy5leG9zb21lZGVtb24uY29tL3VwbG9hZC9pbWFnZS8yMDIyMDQxNC82NDE4NjM5NjQzNjMwNy5qcGciLCJpZENhcmRCYWNrIjoiaHR0cHM6Ly93d3cuZXhvc29tZWRlbW9uLmNvbS91cGxvYWQvaW1hZ2UvMjAyMjA0MTQvNjQxODk5ODM4NDY3MzUuanBnIiwiaXNBdXRoIjoxLCJhdmF0YXIiOiJodHRwczovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyLzZnUk5uYzZpYkRIeEE0RkozY29HTjZWbmJpYW5tMVNDc3A3RHpxd254N1VmeENsTEx0SzBPQ1NpY1M4SGVIaWFEalViQnpJUzdibnkzUjh5UkNFbVM0R21sdy8xMzIiLCJjaGFpbiI6IjAiLCJzdGF0dXMiOjEsImxldmVsIjowLCJtb25leSI6MC4wLCJtb25leVRvdGFsIjowLjAsImludGVncmFsIjowLjAsImludGVncmFsVG90YWwiOjAuMCwic2hhcmVDb2RlVXJsIjpudWxsLCJpc1ZhbGlkIjoxLCJjcmVhdGVUaW1lIjoiMjAyMi0wNC0xNCAxNDo0MjowOCIsInVwZGF0ZVRpbWUiOiIyMDIyLTA0LTE0IDE0OjQyOjA4IiwiaXNEZWxldGVkIjowLCJ2ZXJzaW9uIjowfSwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImFjY291bnQiOiIzMjEzMjEzMSIsImNsaWVudF9pZCI6IndhcCIsImV4cCI6MTY1MTYzMzIzNywibmJmIjoxNjUxMDI4NDM3fQ.oSRhwSoI1eNFt3wjCTj4IicozqJJhczyE8w8yLUBYyI";
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
const startLoading = () => {
  toast({
    type: "loading",
    message: "加载中...",
    loadingType: "spinner",
    duration: 0,
  });
};
const closeLoading = () => Toast.clear();
interface Response<T> {
  code: number;
  data: T;
  msg: string;
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

const get = <T = any>(api: string, params = {}, loading: boolean = false, headers = {}) => request<T>("get", api, params, loading, headers);
const post = <T = any>(api: string, data = {}, loading: boolean = false, headers = {}) => request<T>("post", api, data, loading, headers);
export { get, post, request };
