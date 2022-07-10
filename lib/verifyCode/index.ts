import React from "react";

import SliderJigsaw from "./sliderJigsaw";
import RectCode from "./rectCode";
import { ISliderProps } from "./interface";

interface VerifyCodeType extends React.FC<ISliderProps> {
  RectCode: typeof RectCode;
}
export const VerifyCode = SliderJigsaw as VerifyCodeType;
VerifyCode.RectCode = RectCode;

export default VerifyCode;
