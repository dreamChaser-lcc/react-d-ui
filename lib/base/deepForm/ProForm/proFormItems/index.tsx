import React from 'react';
import { FC, useMemo } from 'react';
// 组件
import { Col, Form } from 'antd';
// 方法
import classNames from 'classnames';
// 常量
import { FormItemWidthEnum, ProFormItemProps } from '../interface';
import '../styles/index.less';

const ProFormItem: FC<ProFormItemProps> = (props) => {
  const {
    span,
    isSearch,
    children,
    label,
    width,
    fieldProps,
    formItemType,
    ...restProps
  } = props;

  /**文本显示配置 */
  const labelConfig = useMemo(() => {
    if (isSearch) {
      return {
        className: classNames({ 'append-tips': isSearch }),
        'data-tips': label,
      };
    }
    return { label };
  }, [isSearch, label]);

  /**FormItem宽度配置 */
  const wrapConfig = useMemo(() => {
    if (isSearch) {
      return {
        style: { width: width ? width : FormItemWidthEnum[formItemType] },
      };
    }
    return { span };
  }, [span, width]);
  return (
    <Col {...wrapConfig}>
      <Form.Item name={restProps?.name} {...labelConfig} {...restProps}>
        {children}
      </Form.Item>
    </Col>
  );
};
ProFormItem.defaultProps = {
  isSearch: false,
  span: 24,
};
export default ProFormItem;
