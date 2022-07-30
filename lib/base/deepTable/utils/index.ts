/**
 * 获取自身到目标元素的顶部距离
 * @param el 自身元素
 * @param target 目标元素
 */
export const getBoundTop = (
  el: HTMLElement | null,
  target?: HTMLElement,
): number => {
  if (!el) return 0;
  const parentNode = (el?.offsetParent as HTMLElement) ?? null;
  const top = el?.offsetTop ?? 0;
  if (target && parentNode === target) {
    return top;
  }
  if (parentNode?.tagName === 'BODY') {
    return top;
  }
  return getBoundTop(parentNode) + top;
};
