import React, { useState, useEffect, useReducer, useMemo } from 'react';
// 组件
import MyIcon from '../../../../lib/myIcon';
import { Dropdown, Menu } from 'antd';
// 方法
import { cloneDeep } from 'lodash';
// 常量
import { columnsProps } from '../interface';
import { DEEP_TABLE_CLASS } from '../../../../lib/constants/common';

const handleColumns = (
  state: columnsProps[],
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case 'init':
      const temp = cloneDeep(state);
      /**配置才显示 */
      if (typeof action.payload?.onOperationClick === 'function') {
        temp.push({
          title: '操作',
          dataIndex: 'operation',
          fixed: 'right',
          width: 150,
          render: (value, record, index) => {
            const size = 'middle';
            const menu = (
              <Menu
                onClick={(menuInfo) => {
                  action.payload?.onOperationClick(
                    menuInfo?.key,
                    record,
                    index,
                  );
                }}
              >
                <Menu.Item
                  key="edit"
                  icon={<MyIcon size="middle" type="icon-bianji" />}
                >
                  编辑
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  style={{ color: 'red' }}
                  icon={<MyIcon size="middle" type="icon-shanchu" />}
                >
                  删除
                </Menu.Item>
              </Menu>
            );

            return (
              <>
                <Dropdown.Button
                  overlay={menu}
                  onClick={() =>
                    action.payload?.onOperationClick('detail', record, index)
                  }
                  /**
                   * github issues 全屏bug
                   * https://github.com/ant-design/ant-design/issues/24250
                   */
                  getPopupContainer={() =>
                    document.querySelector(DEEP_TABLE_CLASS) || document.body
                  }
                  key="detail"
                >
                  <MyIcon size="middle" type="icon-chakan" />
                  查看
                </Dropdown.Button>
              </>
            );
          },
        });
      }
      return temp;
    default:
      return [...state];
  }
};

export function useColumns(props: any) {
  const { columns, dataSource, onOperationClick } = props;
  const [newColumns, dispatchColumns] = useReducer(handleColumns, [
    ...(columns as []),
  ]);

  const total = useMemo(() => {
    return dataSource?.length ?? 0;
  }, [dataSource]);

  useEffect(() => {
    dispatchColumns({ type: 'init', payload: { onOperationClick } });
  }, []);

  return { newColumns, total };
}
