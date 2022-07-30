import { Key, useRef } from 'react';
// 组件
import Table from '../table';
import { Alert, Button, message, Modal } from 'antd';
// 方法
import moment from 'moment';
// 常量
import { formItems } from './detailConfig';
import React from 'react';
import { Detail } from '../../dist';

export default () => {
  const actionRef = useRef<any>();
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: `确定删除${record.name}?`,
      onOk: () => {
        message.success('确认删除');
      },
      onCancel: () => {
        message.error('取消删除');
      },
    });
  };
  const formatData = (record: any) => {
    const { datePicker } = record;
    const transDate = moment(datePicker, 'YYYY-MM-DD');
    return {
      ...record,
      datePicker: transDate,
    };
  };
  const handleOperationClick = (key: Key, record: any, index: number) => {
    if (key === 'detail') {
      return actionRef.current.detail(record);
    }
    if (key === 'edit') {
      const correct = formatData(record);
      return actionRef.current.edit(correct);
    }
    if (key === 'delete') {
      return handleDelete(record);
    }
  };
  return (
    <>
      <Alert
        message="点击操作 查看详情页"
        // description="Additional description and information about copywriting."
        type="info"
        showIcon
      />
      <Table onOperationClick={handleOperationClick} />
      <Detail
        bindId="tableId"
        actionRef={actionRef}
        onBeforeSubmit={(filedsValue) => {
          console.log(filedsValue)
        }}
        formItems={formItems}
      />
    </>
  );
};
