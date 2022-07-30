import React from 'react';
import { Children, FC } from 'react';
interface IDetailProps {
  /**详情显示下划线 */
  isDetail?: boolean;
  /**默认显示值 */
  filedValue?: any;
}
const DetailBlock: FC<IDetailProps> = (props) => {
  const { isDetail, filedValue } = props;
  if (isDetail) {
    return (
      <div className='detail-line'>{filedValue}</div>
    );
  }
  return (
    <>
      {Children.map(props.children, (child) => {
        return child;
      })}
    </>
  );
};
DetailBlock.defaultProps = {
  isDetail: true,
};
export default DetailBlock;
