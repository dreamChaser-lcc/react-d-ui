import { MutableRefObject } from 'react';

// 光标样式
export enum DIRECTION_Enum {
  T = 'n-resize',
  B = 's-resize',
  L = 'w-resize',
  R = 'e-resize',
  LT = 'nw-resize',
  LB = 'sw-resize',
  RT = 'ne-resize',
  RB = 'se-resize',
}
type refType = HTMLDivElement | null;
// 拖拽的div
interface divRefType {
  /**向上延展dom元素 */
  resizeTRef: MutableRefObject<refType>;
  /**向下延展dom元素 */
  resizeBRef: MutableRefObject<refType>;
  /**向左延展dom元素 */
  resizeLRef: MutableRefObject<refType>;
  /**向右延展dom元素 */
  resizeRRef: MutableRefObject<refType>;
  /**向左上延展dom元素 */
  resizeLTRef: MutableRefObject<refType>;
  /**向左下延展dom元素 */
  resizeLBRef: MutableRefObject<refType>;
  /**向右上延展dom元素 */
  resizeRTRef: MutableRefObject<refType>;
  /**向右下dom元素 */
  resizeRBRef: MutableRefObject<refType>;
  /**被控dom元素 */
  modalRef: MutableRefObject<refType>;
  /**拖拽dom元素 */
  titleRef: MutableRefObject<refType>;
  /**外层dom元素 */
  modalWarpRef: MutableRefObject<refType>;
}
export interface useModalProps extends divRefType { }
/**方向  上下左右 左上左下右上右下*/
export type directionType = 'T' | 'B' | 'L' | 'R' | 'LT' | 'LB' | 'RT' | 'RB';
