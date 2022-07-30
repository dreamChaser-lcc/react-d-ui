// 组件
// import { IDeepTableProps } from '../../dist/base/deepTable/interface';
import moment from 'moment';
import React from 'react';
// 常量
import { columns, formItems } from './tableConfig';
import { Table } from '../../dist';
import { IDeepTableProps } from '../../dist/base/deepTable/interface';

export default (props: Partial<IDeepTableProps>) => {
  // 模拟数据
  const dataSource: any[] = new Array(20).fill(1).map((item, index) => {
    return {
      // key: '1',
      name: `user${index}`,
      age: 34,
      gender: index % 2 > 0 ? 'girl' : 'boy',
      activeStatus: index % 2 > 0,
      address: `仓山区万达1${index}号`,
      datePicker: `1988-04-${index < 10 ? '0' + (index + 1) : index}`,
    };
  });
  console.log();
  return (
    <div id="tableId">
      <Table
        dataSource={dataSource}
        rowKey="name"
        formItems={formItems}
        columns={columns}
        onOperationClick={() => {}}
        {...props}
      />
    </div>
  );
};
