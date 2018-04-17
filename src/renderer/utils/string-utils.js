import { sify } from "chinese-conv";
import emotions from "../emotions";

const URL_REG = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~`#|]+)/g;
const AT_REG = /@[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}/g;
const TAG_REG = /#[^#]+#/g;
const EMOTION_REG_ONE = /\[.{1,8}\]/g;
const EMOTION_REG_TWO = /\[.{1,4}\]/g;
const EMOTION_REG_THREE = /\[.{1,3}\]/g;
const EMOTION_REG_FOUR = /\[.{1,2}\]/g;

export const getUrlKey = key => {
  return decodeURIComponent((new RegExp("[?|&]" + key + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20")) || null;
};

export const formatDangerousContent = content => (
  content.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
);

export const formatContent = content => {
  let format = content.replace(/\n/g, '<br />');

  format = format.replace(URL_REG, (s) => {
    s = s.replace(/[.]*$/,"");
    return `<a href="javascript:void(0);" onclick="window.open('${s}')">${s}</a>`;
  });

  format = format.replace(AT_REG, (s) => (`<a href="javascript:void(0);">${s}</a>`));

  format = format.replace(TAG_REG, (s) => (`<a href="javascript:void(0);">${s}</a>`));

  format = format.replace(EMOTION_REG_ONE, (s) => {
    let emotion = emotions.find( emotion => (emotion.phrase === sify(s)) );
    if(emotion && emotion.url){
      return `<img src="${emotion.url}" width="18px"/>`;
    }
    return s;
  });

  format = format.replace(EMOTION_REG_TWO, (s) => {
    let emotion = emotions.find( emotion => (emotion.phrase === s) );
    if(emotion && emotion.url){
      return `<img src="${emotion.url}" width="18px"/>`;
    }
    return s;
  });

  format = format.replace(EMOTION_REG_THREE, (s) => {
    let emotion = emotions.find( emotion => (emotion.phrase === s) );
    if(emotion && emotion.url){
      return `<img src="${emotion.url}" width="18px"/>`;
    }
    return s;
  });

  format = format.replace(EMOTION_REG_FOUR, (s) => {
    let emotion = emotions.find( emotion => (emotion.phrase === s) );
    if(emotion && emotion.url){
      return `<img src="${emotion.url}" width="18px"/>`;
    }
    return s;
  });

  return format.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
};

export const formatImgClassname = url => {
  let format = url.split("/");
  let classname = format[format.length-1].split(".")[0];
  return `pic-${classname}`;
}

export const formatImgThumb = img => {
  let format = img.replace("thumbnail", "thumb180");
  format = format.replace("wx1", "wx3");
  return format;
};

export const formatImgMiddle = img => {
  let format = img.replace("thumbnail", "bmiddle");
  return format;
};

export const formatNum = num => {
  let result;
  if (num > 999) {
    if (num > 9999) {
      result = "9k+";
    } else {
      result = Math.round(num / 1000) + "k+";
    }
  } else {
    result = num;
  }
  return result;
};
