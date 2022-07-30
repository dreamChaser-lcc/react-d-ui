import React from 'react';
import { FC, MutableRefObject, ReactNode } from 'react';
// 组件
import { Form, FormInstance, FormProps, notification, Row } from 'antd';
// 方法
import { useFormItems } from './hooks/useFormItems';
// 常量
import { ProFormItemProps, FormActionType } from './interface';

export interface IProFormProps
  extends FormProps,
    Pick<ProFormItemProps, 'isSearch'> {
  actionRef?: MutableRefObject<FormActionType>;
  /**表单配置 */
  formItems: ProFormItemProps[];
  /**额外添加非表单元素 */
  extraNode?: ReactNode;
}
const ProForm: FC<IProFormProps> = (props) => {
  const { children, extraNode, formItems, actionRef, isSearch, ...restProps } =
    props;
  const [form] = Form.useForm<FormInstance>();
  /**格式化 */
  const newFormItems = useFormItems(formItems, isSearch);
  
  /**验证表单并提示 */
  const handleValidate = async () => {
    const correctValues = await form.validateFields().catch((errorInfo) => {
      errorInfo?.errorFields?.forEach((val: any) => {
        const msg = val?.errors?.[0];
        msg && notification.warning({ message: msg });
      });
    });
    return correctValues ? correctValues : false;
  };

  if (actionRef) {
    actionRef.current = {
      onValidate: handleValidate,
      form,
    };
  }

  return (
    <Form
      form={form}
      // name="advanced_search"
      // className="ant-advanced-search-form"
      // onFinish={onFinish}
      {...restProps}
    >
      <Row gutter={24} style={{ margin: 0 }}>
        {newFormItems}
        {extraNode}
      </Row>
    </Form>
  );
};
export default ProForm;
