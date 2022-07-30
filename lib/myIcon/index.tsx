import React from 'react';
import { CSSProperties, FC, useMemo } from 'react';

import { createFromIconfontCN } from '@ant-design/icons';

type iconSizeType = 'large' | 'middle' | 'small';
interface IMyIconProps {
  /**图标 */
  type: string;
  /**图标大小 */
  size?: iconSizeType | number;
  /**颜色 */
  color?: string;
  /**图标源 */
  scriptUrl?: string;
  /**样式 */
  style?: CSSProperties;
}
const MyIcon: FC<IMyIconProps> = (props) => {
  const { scriptUrl, size, color, style, ...restProps } = props;
  const Icon = createFromIconfontCN({
    scriptUrl: scriptUrl
      ? scriptUrl
      : '//at.alicdn.com/t/font_3262579_e6elutcp1q.js', // 在 iconfont.cn 上生成
  });
  const iconSize = useMemo(() => {
    const sizeObj = {
      small: 14,
      middle: 16,
      large: 20,
    };
    if (typeof size !== 'number' && size) {
      return sizeObj[size];
    }
    return size;
  }, [size]);
  return (
    <Icon style={{ fontSize: iconSize, color, ...style }} {...restProps}></Icon>
  );
};
MyIcon.defaultProps = {
  size: 25,
};
export default MyIcon;
