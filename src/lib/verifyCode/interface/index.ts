/**滑块状态 */
export interface IMouseInfoRef {
  /**是否按下状态 */
  isDownRef: Boolean;
  /**起始点坐标 */
  originX: number;
  /**目标坐标 */
  targetX: number;
}
/**滑块状态枚举 */
export enum MaskEnum {
  /**正在滑动 */
  active = 'mask active',
  /**验证成功 */
  success = 'mask success',
  /**验证失败 */
  fail = 'mask fail',
  /**默认 */
  default = 'mask',
}
/**滑块拼图组件属性 */
export interface ISliderProps {
  /**拼图大小 */
  jigsawSize?: 'small' | 'middle' | 'large';
  /**容器宽 */
  width?: number;
  /**容器高 */
  height?: number;
  /**背景图片集 */
  imgSource?: string[];
  /**验证失败自动刷新 */
  isAutoReload?: boolean;
  /**刷新回调 */
  onRefresh?: () => void;
  /**成功回调 */
  onSuccess?: () => void;
  /**失败回调 */
  onFail?: () => void;
  /**自定义验证规则 */
  customVerify?: (cur: number, target: number) => boolean;
}
