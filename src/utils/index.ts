// 自动按需导入vant不会导入这种vant函数 需要手动引入组件 + 样式
import "vant/es/popup/index.less";
import "vant/es/toast/index.less";
import { Toast } from "vant";
import type { ToastType, ToastOptions } from "vant";
export { Toast };
export { get, post, request, formData } from "./request";
/**
 * toast文字提示
 * @param {object|string} msg
 */
export const toast = (msgOptions: string | ToastOptions, type: ToastType = "text", duration = 0, forbidClick = true, icon = "") => {
  if (msgOptions instanceof String) Toast({ message: msgOptions as string, type, duration, forbidClick, icon });
  else Toast(msgOptions);
  return Toast;
};

// 获取本地静态图片
export const getImageUrl = (fileName: string) => new URL(`../assets/imgs/${fileName}`, import.meta.url).href;

// 格式化时间
import moment from "moment";
export const formatTime = (date: Date | string | number, format = "YYYY-MM-DD") => moment(date).format(format);

// 拼接图片地址
const { VITE_APP_URL_IMG } = import.meta.env;
export const loadImg = (objectKey: string) => {
  if (!objectKey) return;
  try {
    return VITE_APP_URL_IMG + objectKey;
  } catch (error) {
    return "https://www.baidu.com/error.jpg";
  }
};
/**
 *  中央时事件总线
 *  Events 所有的事件需要在这里指定事件名称：传递的参数类型
 */
type Events = {
  handleClickMenu: number;
};

import mitt, { Emitter } from "mitt";
export const emitter: Emitter<Events> = mitt<Events>();
