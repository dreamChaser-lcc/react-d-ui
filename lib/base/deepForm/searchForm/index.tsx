import React from 'react';
import { FC, MutableRefObject, useRef, useState } from 'react';
// 组件
import { Button, Col, Drawer, Space } from 'antd';
import { FunnelPlotOutlined, SearchOutlined } from '@ant-design/icons';
import ProForm from '../ProForm';
// 方法
import { useResize } from '../../../../lib/base/detail/hooks/useResize';
import { filterObj } from '../../../../lib/utils/common.utils';
// 常量
import { SearchFormActionType } from './interface';
import {
  FormActionType,
  FormItemWidthEnum,
  ProFormItemProps,
} from '../ProForm/interface';

export interface ISearchFormProps {
  actionRef?: MutableRefObject<SearchFormActionType>;
  /**查询配置 */
  formItems?: ProFormItemProps[];
  /**查询回调 */
  onSearch?: (fieldsValue: any) => void | Promise<void>;
  /**更多查询宽度 */
  drawerWidth?: number | string;
}
/**表格查询Form */
const SearchForm: FC<ISearchFormProps> = (props) => {
  const { onSearch, formItems, actionRef } = props;
  const [expand, setExpand] = useState(false);
  /**非展开，默认显示的 */
  const [simpleItems, setSimpleItems] = useState<ProFormItemProps[]>([]);
  /**展开抽屉的表单 */
  const [expandItems, setExpandItems] = useState<ProFormItemProps[]>([]);

  const simpleRef = useRef<FormActionType>();
  const expandRef = useRef<FormActionType>();
  const wrapDomRef = useRef<HTMLDivElement>(null);

  /**formItems分类 */
  const getSimpleItem = () => {
    let usAbleWidth =
      (wrapDomRef.current &&
        wrapDomRef.current?.clientWidth - FormItemWidthEnum['Operation']) ||
      0;
    const defaultItems: ProFormItemProps[] = [];
    const expandItems: ProFormItemProps[] = [];
    formItems?.forEach((item) => {
      usAbleWidth -= FormItemWidthEnum[item.formItemType] ?? 0;
      const pushAble = usAbleWidth > 0;
      if (pushAble) {
        defaultItems.push(item);
      } else {
        expandItems.push(item);
      }
    });
    setSimpleItems(defaultItems);
    setExpandItems(expandItems);
  };
  useResize(() => {
    formItems?.length && getSimpleItem();
  });
  /**更多查询展开 */
  const changeMoreSearchAble = () => {
    setExpand(!expand);
  };
  /**查询&重置 */
  const searchBtn = () => {
    if (!formItems?.length) return false;
    return (
      <Col>
        <Space>
          <Button onClick={onSubmit}>重置</Button>
          <span>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSubmit}
            >
              查询
            </Button>
            {expandItems.length ? (
              <Button
                type="primary"
                style={{
                  fontSize: '14px',
                  padding: ' 0 10px',
                  borderLeft: ' 1px solid #dfe6e9',
                }}
                onClick={changeMoreSearchAble}
              >
                <FunnelPlotOutlined />
              </Button>
            ) : null}
          </span>
        </Space>
      </Col>
    );
  };
  /**触发表单提交 */
  const onSubmit = () => {
    simpleRef.current?.form.resetFields();
    expandRef.current?.form.resetFields();
  };
  /**查询 */
  const handleSubmit = async () => {
    const simpleValue = await simpleRef.current?.onValidate();
    const expandValue = await expandRef.current?.onValidate();
    if (expandRef.current && simpleValue && expandValue) {
      const formatData = filterObj({ ...simpleValue, ...expandValue });
      await onSearch?.(formatData);
    } else if (simpleValue) {
      const formatData = filterObj({ ...simpleValue });
      await onSearch?.(formatData);
    } else {
      /**验证失败 */
      return false;
    }
  };
  /**未展开和展开Form实例方法合并（暂时封装） */
  if (actionRef) {
    actionRef.current = {
      submit: onSubmit,
      getFieldsValue:
        (() => {
          const simpleValue = simpleRef.current?.form.getFieldsValue();
          const expandValue = expandRef.current?.form.getFieldsValue();
          return filterObj({ ...simpleValue, ...expandValue });
        }) ||
        ((nameList, filterFunc) => {
          const simpleValue = simpleRef.current?.form.getFieldsValue(nameList);
          const expandValue = expandRef.current?.form.getFieldsValue(nameList);
          return filterObj({ ...simpleValue, ...expandValue });
        }),
      setFieldsValue: (values) => {
        simpleRef.current?.form.getFieldsValue(values);
        expandRef.current?.form.getFieldsValue(values);
      },
      resetFields: (fields) => {
        simpleRef.current?.form.resetFields(fields);
        expandRef.current?.form.resetFields(fields);
      },
    };
  }
  if (!formItems?.length) {
    return null;
  }
  return (
    <div
      ref={wrapDomRef}
      className="proForm-wrap"
    >
      <ProForm
        actionRef={simpleRef}
        isSearch={true}
        formItems={simpleItems}
        extraNode={searchBtn()}
        // onFinish={onFinish}
      />
      {expandItems.length ? (
        <Drawer
          title="更多查询"
          width={400}
          onClose={changeMoreSearchAble}
          visible={expand}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Button onClick={handleSubmit} type="primary">
              查询
            </Button>
          }
        >
          <ProForm
            actionRef={expandRef}
            formItems={expandItems}
            // onFinish={onFinish}
            hideRequiredMark
          />
        </Drawer>
      ) : null}
    </div>
  );
};
SearchForm.defaultProps = {
  drawerWidth: 400,
};
export default SearchForm;
