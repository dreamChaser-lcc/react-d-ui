import { directionType, DIRECTION_Enum } from '../interface';

/**
 * 调整弹窗大小
 * @param oDrag 拖拽的div
 * @param handle 鼠标按下div
 */
export function resize(
  oDrag: HTMLDivElement,
  handle: HTMLDivElement,
  direction: directionType,
) {
  handle.onmousedown = function (event) {
    event.preventDefault();
    event.stopPropagation();
    const mousemove = (event: MouseEvent) => {
      // 调整大小的方法
      const { toLeft, toRight, toTop, toBottom } = resizeFunc(oDrag, event);
      switch (direction) {
        case 'L': {
          toLeft();
          break;
        }
        case 'R': {
          toRight();
          break;
        }
        case 'T': {
          toTop();
          break;
        }
        case 'B': {
          toBottom();
          break;
        }
        case 'LT': {
          toLeft();
          toTop();
          break;
        }
        case 'LB': {
          toLeft();
          toBottom();
          break;
        }
        case 'RT': {
          toRight();
          toTop();
          break;
        }
        case 'RB': {
          toRight();
          toBottom();
          break;
        }
      }
      // 光标样式
      document.documentElement.style.cursor = DIRECTION_Enum[direction];
    };
    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      // 鼠标抬起恢复光标样式
      document.documentElement.style.cursor = 'auto';
    };
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };
}

/**
 * 实现调整弹窗大小的方法
 * 实际操作dom的原理
 * @param oDrag 动态对话框对应原始
 * @param mousemoveEvent 鼠标移动事件
 * @returns
 */
export const resizeFunc = (
  oDrag: HTMLDivElement,
  mousemoveEvent: MouseEvent,
) => {
  // 光标移动后的X轴位置
  const movedClientX = mousemoveEvent.clientX;
  // 光标移动后的Y轴位置
  const movedClientY = mousemoveEvent.clientY;
  // 元素距离左侧的距离
  const offsetLeft = oDrag.offsetLeft;
  // 元素距离顶部的距离
  const offsetTop = oDrag.offsetTop;
  // 元素宽
  const offsetWidth = oDrag.offsetWidth;
  // 元素高
  const offsetHeight = oDrag.offsetHeight;
  // 可视区的宽度
  const clientWidth = document.documentElement.clientWidth;
  // 可视区的高度
  const clientHeight = document.documentElement.clientHeight;

  const toLeft = () => {
    oDrag.style.width =
      offsetWidth + offsetLeft - movedClientX + 'px';
    oDrag.style.left = movedClientX + 'px';
  };
  const toRight = () => {
    oDrag.style.width = movedClientX - offsetLeft + 'px';
    oDrag.style.right = clientWidth - movedClientX + 'px';
  };
  const toTop = () => {
    oDrag.style.height = offsetHeight + offsetTop - movedClientY + 'px';
    oDrag.style.top = movedClientY + 'px';
  };
  const toBottom = () => {
    oDrag.style.height = movedClientY - offsetTop + 'px';
    oDrag.style.bottom = clientHeight - movedClientY + 'px';
  };
  return {
    toLeft,
    toRight,
    toTop,
    toBottom,
  };
};
/**
 * 拖拽弹窗
 * @param oDrag 拖拽的div
 * @param handle 鼠标按下div
 */
export function drag(oDrag: HTMLDivElement, handle: HTMLDivElement) {
  let disX = 0;
  handle = handle || oDrag;
  handle.style.cursor = 'move';
  handle.onmousedown = function (event) {
    /**弹窗与视口左侧的距离 */
    disX = event.clientX - oDrag.offsetLeft;
    /**弹窗与视口顶部的距离 */
    const disY = event.clientY - oDrag.offsetTop;
    const mousemove = (event: MouseEvent) => {
      /**水平移动距离 */
      let iL = event.clientX - disX;
      /**垂直移动距离 */
      let iT = event.clientY - disY;
      /**视口宽 - 弹窗宽 = 最大水平移动距离 */
      const maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
      /**视口高 - 弹窗高 = 最大垂直移动距离 */
      const maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

      iL <= 0 && (iL = 0);
      iT <= 0 && (iT = 0);
      iL >= maxL && (iL = maxL);
      iT >= maxT && (iT = maxT);

      oDrag.style.left = iL + 'px';
      oDrag.style.top = iT + 'px';

      return false;
    };

    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    return false;
  };
}
