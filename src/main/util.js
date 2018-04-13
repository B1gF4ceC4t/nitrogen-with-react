import { Notification } from 'electron';
import is from 'electron-is';
import fse from 'fs-extra';
import fs from 'fs';

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
export const Info = (title = '标题', subtitle = '子标题', body = '正文') => {
    let info = new Notification({
        title,
        subtitle,
        body
    });
    info.show();
}

/**
 * @description 写入JSON到文件
 * @param {string} 写入路径、JSON
 * @param {object} 写入JSON对象
 * @returns {Promise} promise
 */
export const writeFileJSON = async (jsonPath, obj) => {
    return await fse.writeJSON(jsonPath, obj);
}

/**
 * @description 读取指定路径下的JSON文件
 * @param {string} 路径 
 * @returns {Promise} promise
 */
export const readFileJSON = async (jsonPath) => {
    return await fse.readJson(jsonPath);
}

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
}

/**
 * @description 获得主机时间
 * @returns {string} 本机时间
 */
export const getNowDate = () => {
    let dt = new Date();
    return (dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDay() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds());
}

/**
 * @description 检测路径是否存在
 * @param {Array} currArray 要检测的数据对象
 * @param {string} path 要判断的路径
 * @returns {boolean} true=存在 false=不存在
 */
export const isExistPath = (currArray,path) => {
    let flag = false;
    for (let i = 0; i < currArray.length; i++) {
        if (currArray[i].path == path) {
            flag = true;
            break;
        }
    }
    return flag;
}
