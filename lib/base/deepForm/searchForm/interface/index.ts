import { FormInstance } from 'antd';

export interface SearchFormActionRef
  extends Pick<
    FormInstance,
    | 'getFieldsValue'
    | 'scrollToField'
    | 'setFields'
    | 'setFieldsValue'
    | 'resetFields'
    | 'submit'
  > {
  // getFieldsValue: (nameList:(string|number[])) => any;
}
export type SearchFormActionType = Partial<SearchFormActionRef> | undefined;
