import { MutableRefObject } from "react";
import { ProFormItemProps } from "lib/base/deepForm/ProForm/interface";

export enum DetailOperationEnum {
  'arrow' = '返回箭头',
  'cancel' = '取消',
  'confirm' = '确定',
}

export interface DetailActionRef {
  /**详情 */
  detail: (record?: any) => void;
  /**编辑 */
  edit: (record?: any) => void;
  /**显示*/
  show?: () => void;
  /**隐藏*/
  hide?: () => void;
}
export type DetailActionType = DetailActionRef | undefined;
export interface IDetailProps {
  title?: string;
  bindId?: string;
  actionRef?: MutableRefObject<DetailActionType>;
  /**默认每行Field个数 */
  defaultLineNumber?: number;
  /**field配置 */
  formItems: ProFormItemProps[];
  /**返回回调 */
  onBack?: () => void;
  /**自定义提交操作(确定回调) */
  onSubmit?: (filedsValue: any) => void;
  /**提交前参数处理 */
  onBeforeSubmit?: (filedsValue: any) => any | Promise<any>;
  /**请求接口 */
  fetchApi?: (params: any) => Promise<any>;
  /**请求成功回调 */
  onFinish?: (params: any) => void;
  /**请求失败回调 */
  onFail?: (params: any) => void;
}