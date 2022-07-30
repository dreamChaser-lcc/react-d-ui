// import { ProFormItemProps } from "@/component/base/deepForm/ProForm/interface";
// import { columnsProps } from "@/component/base/deepTable/interface";

import { ProFormItemProps } from "../../lib/base/deepForm/ProForm/interface";
import { columnsProps } from "../../lib/base/deepTable/interface";


/**列配置 */
export const columns: columnsProps[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];
/**查询配置 */
export const formItems: ProFormItemProps[] = [
  {
    name: 'field1',
    label: 'field1',
    formItemType: 'Input',
    // span: 6,
    rules: [{ required: true }],
    fieldProps: {
      Input: {
        name: '13',
        placeholder: 'field1',
      },
    },
  },
  {
    name: 'field2',
    label: 'field2',
    formItemType: 'Select',
    // span: 6,
    rules: [{ required: true }],
    fieldProps: {
      Select: {
        placeholder: 'field2',
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ],
      },
    },
  },
  {
    name: 'field3',
    label: 'field3',
    formItemType: 'Select',
    // span: 6,
    fieldProps: {
      Select: {
        placeholder: 'field3',
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ],
      },
    },
  },
  {
    name: 'field4',
    label: 'field4',
    formItemType: 'Select',
    // span: 6,
    fieldProps: {
      Select: {
        placeholder: 'field4',
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ],
      },
    },
  },
  {
    name: 'field5',
    label: 'field5',
    formItemType: 'Select',
    // span: 6,
    rules: [{ required: true }],
    fieldProps: {
      Select: {
        placeholder: 'field5',
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ],
      },
    },
  },
  {
    name: 'field6',
    label: 'field6',
    formItemType: 'Select',
    // span: 6,
    fieldProps: {
      Select: {
        placeholder: 'field4',
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ],
      },
    },
  },
];
