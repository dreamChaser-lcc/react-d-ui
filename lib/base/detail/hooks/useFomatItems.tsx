import React, { useMemo } from 'react';
// 组件
import DetailBlock from '../detailBlock';
// 方法
import { cloneDeep } from 'lodash';
// 常量
import { ProFormItemProps } from '../../deepForm/ProForm/interface';

/**格式化配置 */
export const useFormatItems = (
  formItems: ProFormItemProps[],
  defaultLineNumber: any,
  detailData: any,
  isDetail: boolean = true,
) => {
  const span = Math.round(24 / defaultLineNumber);
  const newFormItems = useMemo(() => {
    const clone = cloneDeep(formItems);
    const items = clone.map((item) => {
      const { name, initialValue, render } = item;
      /**详情展示 */
      if (isDetail) {
        item.isDetail = true;
        if (!render) {
          item.render = () => {
            const renderText = initialValue || (name && detailData?.[name]);
            return <DetailBlock isDetail filedValue={renderText ?? '--'} />;
          };
        }
      } else {
      }
      item.span = span;
      return item;
    });
    return items;
  }, [formItems, defaultLineNumber, detailData, isDetail]);
  return [newFormItems];
};
