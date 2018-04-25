import { Notification } from "electron";
import is from "electron-is";

//不同平台和开发环境
export const isDev = is.dev();
export const isMac = is.macOS();
export const isWin = is.windows();
export const isLinux = is.linux();

/**
 * @description 系统消息推送
 * @param {*} 推送标题
 * @param {*} 推送子标题
 * @param {*} 推送正文
 */
export const Info = (title = "标题", subtitle = "子标题", body = "正文") => {
  let info = new Notification({
    title,
    subtitle,
    body
  });
  info.show();
};

/**
 * @description 打印日志
 * @param {string,boolean} 日志内容、可选参数：true=直接显示 false=不显示
 * @returns {string} 日志 时间-内容
 */
export const log = (text, flag) => {
  console.log(`[${getNowDate()}] ${text}`);
  if (flag) {
    console.log(text);
  }
  return `[${getNowDate()}] ${text}`;
};

/**
 * @description 获得主机时间
 * @returns {string} 本机时间
 */
export const getNowDate = () => {
  let dt = new Date();
  return (
    dt.getFullYear() +
    "-" +
    dt.getMonth() +
    "-" +
    dt.getDay() +
    " " +
    dt.getHours() +
    ":" +
    dt.getMinutes() +
    ":" +
    dt.getSeconds()
  );
};
