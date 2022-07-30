import { Key, MutableRefObject, ReactNode } from 'react';
import { TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ProFormItemProps } from '../../deepForm/ProForm/interface';
import { SearchFormActionType } from '../../deepForm/searchForm/interface';

type AntColumnsType<RecordType> = ColumnType<RecordType>;
export interface columnsProps extends AntColumnsType<any> {
  /* 标题 */
  title: ReactNode | (({ sortOrder, sortColumn, filters }: any) => ReactNode);
  dataIndex: string;
}
interface DeepTableActionRef {
  /**刷新 */
  reload: () => void;
  /**查询回调 */
  onSearch: (fieldsValue: any) => void;
  /**查询框Ref */
  searchFormRef: MutableRefObject<SearchFormActionType>;
}
type DeepTableActionType = DeepTableActionRef | undefined;
export interface IDeepTableProps extends TableProps<any> {
  /**查询配置 */
  formItems?: ProFormItemProps[];
  /**列配置 */
  columns: columnsProps[];
  /**可固定高度,否则自适应 */
  defaultHight?: number | string;
  /**操作按钮回调 若不配置无默认按钮*/
  onOperationClick?: (key: Key, record: any, index: number) => void;
  /** */
  actionRef?: MutableRefObject<DeepTableActionType>;
}
