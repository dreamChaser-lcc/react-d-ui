import { message } from 'antd';


/**
 * 复制文本实现（old）
 * 比较老的方法 document.execCommand将被弃用
 * @param temp 复制的文本
 * @returns
 */
function oldCopyFunc(temp: string) {
  const copyInput = document.createElement('input'); // 创建输入框
  copyInput.value = temp;
  document.body.appendChild(copyInput); // 添加input输入框元素
  copyInput.select(); // 选择文本
  const isSuccess = document.execCommand('copy'); // 命令复制
  copyInput.remove(); // 移除元素
  return isSuccess;
}
/**
 * 复制文本实现(new)
 * document.execCommand 的替代方案
 * @param temp 复制的文本
 * @returns
 */
async function newCopyFunc(temp: string) {
  return oldCopyFunc(temp) || navigator.clipboard.writeText(temp);
}
/**
 * 复制文本
 * @param text 复制内容
 * @param generateTemp 生成复制内容的函数
 */
export function copyText(
  text: string,
  generateTemp?: (text: string) => string,
) {
  return new Promise<string | false>((resolve, reject) => {
    /**复制的内容 */
    const temp = typeof generateTemp === 'function' ? generateTemp(text) : text;
    newCopyFunc(temp)
      .then(() => {
        resolve(temp);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/** 当前全屏的元素*/
const fullElement = () => {
  let doc: any = document;
  return (
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement ||
    doc.mozFullscreenElement ||
    null
  );
};
/** 是否全屏*/
export const isFullScreen = () => {
  let doc: any = document;
  return !!(doc.webkitIsFullscreen || fullElement());
};
/**
 * 全屏 （element元素对象的方法）
 * @param el 元素
 */
export const requestFullScreen = (el: any = document.body) => {
  if (el.requestFullscreen) {
    // W3C
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    // FIREFOX 火狐
    el.mozRequestFullScreen();
  } else if (el.msRequestFullscreen) {
    //MSIE  IE
    el.msRequestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    // CHROME 谷歌
    el.webkitRequestFullScreen();
  } else {
    message.warning('您当前使用的浏览器不支持全屏');
    return;
  }
};
/**
 * 退出全屏 （document文档对象的方法）
 */
export const exitFullscreen = () => {
  let doc: any = document;
  if (doc.exitFullscreen && isFullScreen()) {
    doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    doc.msExiFullscreen();
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  }
};
