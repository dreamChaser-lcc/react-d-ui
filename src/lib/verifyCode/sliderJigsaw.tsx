import { FC, useEffect, useRef, useState } from "react";
// 方法
import { getRandomToPosition, jigsawDraw, JigsawEnum } from "./utils/util";
import { unstable_batchedUpdates } from "react-dom";
// 常量
import { IMouseInfoRef, ISliderProps, MaskEnum } from "./interface";
// import imageUrl from "../assets/slideBackground.jpg";
import "./styles/style.less";

const imgSource: string[] = [
  "https://img1.baidu.com/it/u=3110752325,1740512856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
  "https://img2.baidu.com/it/u=2159511503,712980543&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  "https://img1.baidu.com/it/u=1591125390,164012472&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
];

/**滑动拼图 */
const SliderJigsaw: FC<ISliderProps> = (props) => {
  const {
    jigsawSize,
    width,
    height,
    imgSource,
    isAutoReload,
    onRefresh,
    onSuccess,
    onFail,
    customVerify,
  } = props;
  if (!width || !height || !imgSource) return null;

  const mainRef = useRef<HTMLCanvasElement>(null);
  const jigsawRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [maskClass, setMaskClass] = useState<MaskEnum>(MaskEnum.default);
  const mouseRef = useRef<IMouseInfoRef>({
    isDownRef: false,
    originX: 0,
    targetX: 0,
  });
  /**当前滑动值 */
  const [mouseGap, setMouseGap] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>();

  const imgLoad = () => {
    setLoading(false);
    if (!imgRef.current) return void 0;
    const img = imgRef.current;
    const jigsawObj = {
      small: 30,
      middle: 40,
      large: 50,
    };
    const size = jigsawSize ? jigsawObj[jigsawSize] : 30;
    const mainCtx = mainRef.current?.getContext("2d");
    const jigsawCtx = jigsawRef.current?.getContext("2d");
    const { x, y } = getRandomToPosition(width, height, size);
    if (!mainCtx || !jigsawCtx || !jigsawRef.current) {
      return void 0;
    }
    mouseRef.current.targetX = x;
    // 裁剪图片到左侧
    jigsawDraw(mainCtx, x, y, size, JigsawEnum.fill);
    jigsawDraw(jigsawCtx, x, y, size, JigsawEnum.clip);

    mainCtx.drawImage(img, 0, 0, width, height);
    jigsawCtx.drawImage(img, 0, 0, width, height);

    // 裁剪尺寸偏移量
    const offsetY = y - (size * 1) / 2;
    // 裁剪图片尺寸大小
    const clipSource = (size * 3) / 2;

    // 裁剪图片到左侧
    const imageData = jigsawCtx.getImageData(
      x,
      offsetY,
      clipSource,
      clipSource
    );
    jigsawRef.current.width = clipSource;
    jigsawCtx.putImageData(imageData, 0, offsetY);
  };
  const initDraw = () => {
    const mainCtx = mainRef.current?.getContext("2d");
    const jigsawCtx = jigsawRef.current?.getContext("2d");
    if (!mainCtx || !jigsawCtx) {
      return;
    }
    imgRef.current = new Image();
    const img = imgRef.current;
    // 允许跨域
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgLoad();
    };
    // img.src = imageUrl;
    img.src = imgSource[0];
  };

  useEffect(() => {
    resetState();
    initDraw();
  }, []);
  /**验证是否滑到指定范围 */
  const verify = (cur: number, target: number) => {
    const diffRange = Math.abs(target - cur);
    return diffRange > 10 ? false : true;
  };
  /**重置所有状态 */
  const resetState = () => {
    mouseRef.current = {
      isDownRef: false,
      originX: 0,
      targetX: 0,
    };
    unstable_batchedUpdates(() => {
      setMaskClass(MaskEnum.default);
      setMouseGap(0);
      setLoading(true);
    });
  };
  const reload = () => {
    if (!imgRef.current || !jigsawRef.current) return void 0;
    if (typeof onRefresh === "function") onRefresh();
    resetState();

    const randomRange = Math.random() * (imgSource.length - 1);
    const index = Math.floor(randomRange);

    const mainCtx = mainRef.current?.getContext("2d");
    const jigsawCtx = jigsawRef.current?.getContext("2d");

    // 重置画布
    jigsawRef.current.width = width;
    mainCtx?.clearRect(0, 0, width, height);
    jigsawCtx?.clearRect(0, 0, width, height);

    // 更新图片来源
    imgRef.current.setAttribute("src", imgSource?.[index]);
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement | HTMLCanvasElement, MouseEvent>
  ) => {
    if (mouseRef.current.isDownRef) return false;
    setMaskClass(MaskEnum.active);
    const originX = e.clientX;
    mouseRef.current = Object.assign(mouseRef.current, {
      isDownRef: true,
      originX,
    });
    setMouseGap(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mouseRef.current.isDownRef) return false;
    const curX = e.clientX;
    const gap = curX - mouseRef.current.originX;
    if (gap < 0 || gap > width - 38) return false;
    setMouseGap(gap);
  };
  /**松开 */
  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement | HTMLCanvasElement, MouseEvent>
  ) => {
    if (!mouseRef.current.isDownRef) return false;
    mouseRef.current.isDownRef = false;
    const curGap = e.clientX - mouseRef.current.originX;
    const target = mouseRef.current.targetX;
    console.log(`当前滑动${curGap},拼图起始位置${mouseRef.current.targetX}`);
    const isCorrect =
      typeof customVerify === "function"
        ? customVerify(curGap, target)
        : verify(curGap, target);
    if (isCorrect) {
      alert("success");
      onSuccess?.();
      setMaskClass(MaskEnum.success);
    } else {
      alert("fail");
      onFail?.();
      setMaskClass(MaskEnum.fail);
      isAutoReload && reload();
    }
  };

  return (
    <div>
      <div
        style={{ position: "relative", width}}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <span className="reload-icon" title="刷新" onClick={reload}>
          ↻
        </span>
        <canvas ref={mainRef} width={width} height={height} />
        <canvas
          ref={jigsawRef}
          width={width}
          height={height}
          className="jigsaw"
          style={{ left: mouseGap }}
          onMouseDown={handleMouseDown}
        />
        <div className="slider-track" style={{ width }}>
          <div className={maskClass} style={{ width: mouseGap + 35 }}>
            <div
              className="slide-icon"
              style={{ left: mouseGap }}
              onMouseDown={handleMouseDown}
            >
              →
            </div>
          </div>
        </div>
        {loading && (
          <div className="loading-mask">
            <div className="icon">↻</div>
            <div className="tips">加载中...</div>
          </div>
        )}
      </div>
    </div>
  );
};
SliderJigsaw.defaultProps = {
  width: 300,
  height: 200,
  imgSource,
  isAutoReload: true,
  jigsawSize: "middle",
};
export default SliderJigsaw;
