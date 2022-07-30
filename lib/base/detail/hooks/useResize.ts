import { useEffect, useRef } from 'react';
import _ from 'lodash';
/**
 * 窗口尺寸更改执行回调，且初始化执行
 * @param handler 执行回调
 * @param delay 防抖时间
 * @param defaultCall 是否默认执行一次
 */
export const useResize = (
  handler: () => void,
  delay: number = 500,
  defaultCall: boolean = true,
) => {
  const initAble = useRef<boolean>(true);
  useEffect(() => {
    /**防抖 500ms*/
    const callback = _.debounce(handler, delay || 500);
    /**初始化执行一次 */
    if (initAble.current && defaultCall) {
      callback();
      initAble.current = false;
    }
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);
};
