import React, { FC, useEffect, useRef, useState } from 'react';
// 组件
import { Table } from 'antd';
import HeadToolBar from './headToolBar';
import DeepForm from '../deepForm';
// 方法
import { useColumns } from './hook/useColumns';
import { getBoundTop } from './utils';
import { useResize } from '../detail/hooks/useResize';
// 常量
import { IDeepTableProps } from './interface';
import { SearchFormActionType } from '../deepForm/searchForm/interface';
import classNames from 'classnames';
import { DEEP_TABLE_CLASS_NAME } from '../../../lib/constants/common';

const DeepTable: FC<IDeepTableProps> = (props) => {
  const {
    containerId,
    defaultHight,
    actionRef,
    rowKey,
    onOperationClick,
    formItems,
    columns,
    dataSource,
    pagination,
    ...resProps
  } = props;
  const [tableHight, setTableHight] = useState<number | string>();
  const [loading, setLoading] = useState<boolean>();

  /**查询框 */
  const searchRef = useRef<SearchFormActionType>();
  /**表格容器 */
  const deepTableRef = useRef<HTMLDivElement>(null);
  /**antd 表格 */
  const tableDomRef = useRef<HTMLDivElement>(null);

  /**计算表格高度 */
  const autoHight = () => {
    if (tableDomRef?.current) {
      const container = document.querySelector('body') as HTMLBodyElement;
      setTimeout(() => {
        const top = getBoundTop(tableDomRef?.current);
        const height = container?.clientHeight - top - 130;
        setTableHight(height || 500);
      }, 100);
    }
  };
  useResize(autoHight);
  useEffect(() => {
    !defaultHight || autoHight();
  }, [tableDomRef?.current]);

  const { newColumns, total } = useColumns({
    columns,
    dataSource,
    onOperationClick,
  });
  /**查询回调 */
  const onSearch = (fieldsValue: any) => {
    console.log(fieldsValue);
  };
  /**刷新 */
  const tableReload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  if (actionRef) {
    actionRef.current = {
      reload: tableReload,
      onSearch,
      searchFormRef: searchRef,
    };
  }
  const wrapClass = classNames(
    'deepTable-wrap',
    DEEP_TABLE_CLASS_NAME
  );
  return (
    <div
      id={containerId}
      ref={deepTableRef}
      className={wrapClass}
    >
      <DeepForm.SearchForm
        actionRef={searchRef}
        formItems={formItems}
        onSearch={onSearch}
      />
      <HeadToolBar
        condition={{
          deepTableRef,
          tableReload: tableReload,
        }}
      />
      <Table
        dataSource={dataSource}
        bordered
        rowKey={rowKey}
        {...resProps}
        ref={tableDomRef}
        loading={loading}
        pagination={{
          size: 'small',
          pageSizeOptions: [5, 10, 20, 50],
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination
        }}
        scroll={{ y: defaultHight || tableHight }}
        columns={newColumns}
      />
    </div>
  );
};
export default DeepTable;
