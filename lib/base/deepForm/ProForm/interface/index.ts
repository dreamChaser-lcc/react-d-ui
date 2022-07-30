import { ReactNode } from 'react';
import { FormItemProps, Rule } from 'antd/lib/form';
import {
  InputProps,
  InputRef,
  Select,
  TreeSelect,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  FormInstance,
} from 'antd';

/**
 * 自动推断参数类型
 * inter 若 T 为函数返回:自动推断类型 P ，不为函数返回 any
 */
type GetParamType<T> = T extends (arg: infer P) => void ? P : any;

export type ProFormItemType =
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'TreeSelect'
  | 'Cascader'
  | 'DatePicker'
  | 'Switch';
export interface ProFieldProps {
  /**文本输入框 */
  Input?: InputProps & React.RefAttributes<InputRef>;
  /**数字输入框 */
  InputNumber?: GetParamType<typeof InputNumber>;
  /**选择框 ( GetParamType 获取Select选择框组件参数) */
  Select?: GetParamType<typeof Select>;
  /**选择框 ( GetParamType 获取Select选择框组件参数) */
  TreeSelect?: GetParamType<typeof TreeSelect>;
  /**级联 */
  Cascader?: GetParamType<typeof Cascader>;
  /**日期选择器 */
  DatePicker?: GetParamType<typeof DatePicker>;
  /**快关 */
  Switch?: GetParamType<typeof Switch>;
}
export interface ProFormItemProps extends FormItemProps {
  name?: string | number | undefined;
  label?: ReactNode;
  /**表单类型 */
  formItemType: ProFormItemType;
  /**表单配置 */
  fieldProps?: ProFieldProps;
  /**所占栅格 */
  span?: number | string;
  /**元素宽度 */
  width?: number | string | FormItemWidthEnum;
  /**验证格式 */
  rules?: Rule[];
  /**是否查询框表单 */
  isSearch?: boolean;
  /**是否为详情状态 */
  isDetail?: boolean;
  /**自定义渲染 */
  render?: () => JSX.Element | null;
}

/**默认表单宽度(px) */
export enum FormItemWidthEnum {
  'Input' = 150,
  'InputNumber' = 150,
  'Select' = 200,
  'TreeSelect' = 200,
  'Cascader' = 200,
  'DatePicker' = 200,
  'Switch' = 150,
  'Operation' = 280,
}
export declare interface IFormActionRef<T = any> {
  onValidate: () => Promise<any> | undefined;
  form: FormInstance<T>;
}

export declare type FormActionType<T = any> = IFormActionRef<T> | undefined;
