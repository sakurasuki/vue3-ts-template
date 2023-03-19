import { showToast, showLoadingToast, allowMultipleToast } from 'vant'
import type { ToastType, ToastOptions } from 'vant'
export { get, post, request } from './request'
import 'vant/es/toast/style'
/**
 * toast文字提示
 * @param {object|string} msgOptions
 */
export const toast = (msgOptions: string | ToastOptions, type: ToastType = 'text', duration = 1500, forbidClick = true, icon = '') => {
  allowMultipleToast()
  if (msgOptions instanceof Object) showToast({ type, duration, forbidClick, icon, ...(msgOptions as ToastOptions) })
  else showToast({ message: msgOptions, type, duration, forbidClick, icon })
}

export const showLoading = (message: string = '加载中...', duration: number = 0) => {
  return showLoadingToast({ message, forbidClick: true, duration })
}

// 获取本地静态图片
export const getImageUrl = (fileName: string) => new URL(`../assets/imgs/${fileName}`, import.meta.url).href

// 格式化时间
import moment from 'moment'
export const formatTime = (date: Date | string | number, format = 'YYYY-MM-DD') => moment(date).format(format)

// 拼接图片地址
const { VITE_APP_URL_IMG } = import.meta.env
export const loadImg = (objectKey: string) => {
  if (!objectKey) return
  try {
    return VITE_APP_URL_IMG + objectKey
  } catch (error) {
    return 'https://www.baidu.com/error.jpg'
  }
}
/**
 *  中央时事件总线
 *  Events 所有的事件需要在这里指定事件名称：传递的参数类型
 */
type Events = {
  handleClickMenu: number
}

import mitt, { Emitter } from 'mitt'
export const emitter: Emitter<Events> = mitt<Events>()
