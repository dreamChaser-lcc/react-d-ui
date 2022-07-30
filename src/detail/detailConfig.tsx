import { ProFormItemProps } from "../../lib/base/deepForm/ProForm/interface";

export const formItems: ProFormItemProps[] = [
  {
    label: '姓名',
    name: 'name',
    formItemType: 'Input',
    rules: [{ required: true }],
  },
  {
    label: '性别',
    name: 'gender',
    formItemType: 'Select',
    fieldProps: {
      Select: {
        options: [
          { label: 'boy', value: 'boy' },
          { label: 'girl', value: 'girl' },
        ],
      },
    },
    rules: [{ required: true }],
  },
  {
    label: '主题',
    name: 'treeSelect',
    formItemType: 'TreeSelect',
    initialValue:'dark',
    fieldProps: {
      TreeSelect: {
        treeData: [
          {
            title: '主题',
            value: 'theme',
            key: 'theme',
            children: [
              { title: '光亮', value: 'light',key: 'light', },
              { title: '暗黑', value: 'dark' ,key: 'dark',},
            ],
          },
        ],
      },
    },
    rules: [{ required: true }],
  },
  {
    label: '详细地址',
    name: 'address',
    // initialValue:['zhejiang','hangzhou'],
    formItemType: 'Cascader',
    fieldProps: {
      Cascader: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
              },
            ],
          },
        ],
      },
    },
    rules: [{ required: true }],
  },
  {
    label: '生日',
    name: 'datePicker',
    formItemType: 'DatePicker',
    rules: [{ required: true }],
  },
  {
    label: '年龄',
    name: 'age',
    formItemType: 'InputNumber',
    rules: [{ required: true }],
  },
  {
    label: '激活状态',
    name: 'activeStatus',
    formItemType: 'Switch',
    valuePropName: 'checked',
    rules: [{ required: true }],
  },
];
