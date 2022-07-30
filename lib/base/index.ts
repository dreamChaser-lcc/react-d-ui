
import './base.style.less';
import React from 'react';

import Table from './deepTable';
import Detail from './detail';
import { IDetailProps } from './detail/interface';

interface BaseType extends React.FC<IDetailProps> {
  Table: typeof Table;
  Detail: typeof Detail;
}
export const VerifyCode = Table as BaseType;
VerifyCode.Table = Table;
VerifyCode.Detail = Detail;

export default VerifyCode;