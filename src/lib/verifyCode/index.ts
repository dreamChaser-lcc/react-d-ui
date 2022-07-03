import SliderJigsaw from "./sliderJigsaw";
import RectCode from "./rectCode";

type VerifyCodeType = typeof SliderJigsaw & {
  RectCode: typeof RectCode;
};
const VerifyCode = SliderJigsaw as VerifyCodeType;
VerifyCode.RectCode = RectCode;

export default VerifyCode;
