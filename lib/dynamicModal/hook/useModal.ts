import { useEffect, useRef } from 'react';
import { useModalProps } from '../interface';
import { drag, resize } from './util';

/**实现拖拽和扩展等功能扩展的hook */
export const useModal = (props: useModalProps) => {
  const {
    resizeTRef,
    resizeBRef,
    resizeLRef,
    resizeRRef,
    resizeLTRef,
    resizeLBRef,
    resizeRTRef,
    resizeRBRef,
    modalRef,
    titleRef,
  } = props;

  // const mousePosition = { x: 0, y: 0 };
  // // 获取鼠标点击位置
  // const getClickPosition = (e: MouseEvent) =>
  //   Object.assign(mousePosition, { x: e.pageX, y: e.pageY });
  // document.documentElement.addEventListener('click', getClickPosition, true);

  const initPosition = useRef<Record<string, number>>();
  const setInitPosition = () => {
    const width = modalRef.current?.offsetWidth!;
    const height = modalRef.current?.offsetHeight!;
    const top = modalRef.current?.offsetTop!;
    const left = modalRef.current?.offsetLeft!;
    initPosition.current = {
      width,
      height,
      top,
      left,
    };
  };
  const initWindow = () => {
    // 设置弹出的位置
    modalRef.current!.style.left = `50vh`;
    // 设置弹窗初始位置
    setInitPosition();
    // 拖拽弹窗
    drag(modalRef.current!, titleRef.current!);
    // 向上调整
    resize(modalRef.current!, resizeTRef.current!, 'T');
    // 向下调整
    resize(modalRef.current!, resizeBRef.current!, 'B');
    // 向左调整
    resize(modalRef.current!, resizeLRef.current!, 'L');
    // 向右调整
    resize(modalRef.current!, resizeRRef.current!, 'R');
    // 向左上调整
    resize(modalRef.current!, resizeLTRef.current!, 'LT');
    // 向左下调整
    resize(modalRef.current!, resizeLBRef.current!, 'LB');
    // 向右上调整
    resize(modalRef.current!, resizeRTRef.current!, 'RT');
    // 向右下调整
    resize(modalRef.current!, resizeRBRef.current!, 'RB');

    // 模态框的位置
    const { left, top } = modalRef.current!.getBoundingClientRect();
    
  };
  /**全屏 */
  const fullScreen = () => {
    if (modalRef.current) {
      modalRef.current.style.top = '0';
      modalRef.current.style.left = '0';
      modalRef.current.style.width = '100%';
      modalRef.current.style.height = '100vh'; 
    }
  };
  /**恢复弹窗 */
  const revert = () => {
    if (modalRef.current) {
      console.log('in', initPosition.current);
      modalRef.current.style.width = initPosition.current?.width + 'px';
      modalRef.current.style.height = initPosition.current?.height + 'px';
      modalRef.current.style.top = initPosition.current?.top + 'px';
      modalRef.current.style.left = initPosition.current?.left + 'px';
    }
  };
  useEffect(() => {
    modalRef.current && initWindow();
  });
  return { fullScreen, revert };
};
