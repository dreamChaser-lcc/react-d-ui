import React from 'react';

import SliderJigsaw from './sliderJigsaw';
import RectCode from './rectCode';
import { ISliderProps } from './interface';

interface VerifyCodeType extends React.FC<ISliderProps> {
  SliderJigsaw: typeof SliderJigsaw;
  RectCode: typeof RectCode;
}
export const VerifyCode = SliderJigsaw as VerifyCodeType;
VerifyCode.SliderJigsaw = SliderJigsaw;
VerifyCode.RectCode = RectCode;

export default VerifyCode;
