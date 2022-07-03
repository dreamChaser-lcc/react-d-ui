export enum JigsawEnum {
  /**填cong */
  'fill' = 'fill',
  'stroke' = 'stroke',
  'clip' = 'clip',
}
/**
 *画一个拼图
 * @param {CanvasRenderingContext2D} ctx 容器
 * @param {number} x 初始x轴坐标
 * @param {number} y 初始y轴坐标
 * @param {number} size 初始大小
 * @param {JigsawEnum} type 裁剪或填充
 */
export function jigsawDraw(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  type: JigsawEnum = JigsawEnum.fill,
) {
  /**拼图大小 */
  const width = size,
    height = size,
    radius = Math.floor(size / 5);

  ctx.beginPath();

  // 起始点
  ctx.moveTo(x, y);

  /**左边 */
  ctx.lineTo(x, y + height / 2 - radius);
  ctx.arc(x, y + height / 2, radius, -Math.PI / 2, Math.PI / 2, false);
  ctx.lineTo(x, y + height);

  /**下边 */
  ctx.lineTo(x + width, y + height);

  /**右边 */
  ctx.lineTo(x + width, y + height / 2 + radius);
  ctx.arc(x + width, y + height / 2, radius, Math.PI / 2, -Math.PI / 2, true);
  ctx.lineTo(x + width, y);

  /**上边 */
  ctx.lineTo(x + width / 2 + radius, y);
  ctx.arc(x + width / 2, y, radius, 0, Math.PI, true);
  ctx.closePath();

  ctx.lineWidth = 2;
  if (type === JigsawEnum.clip) {
    ctx.strokeStyle = '#fafafa';
    ctx.stroke();
    ctx.clip();
    return void 0;
  }
  ctx.fillStyle = '#000';
  // ctx.globalAlpha = 0.3;
  ctx.strokeStyle = '#fafafa';
  ctx.stroke();
  ctx.globalCompositeOperation = 'destination-over';
  ctx[type]();
}
// @ts-ignore
export function drawPath(ctx, x, y, operation) {
  const l = 42; // 滑块边长
  const r = 9; // 滑块半径
  const PI = Math.PI;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx.globalCompositeOperation = 'destination-over';
  operation === 'fill' ? ctx.fill() : ctx.clip();
}
/**
 * 获取拼图定位
 * @param width 容器宽度
 * @param height 容器高度
 * @param size 拼图边长(以size为尺寸的正方体)
 * @returns {x:number,y:number}
 */
export const getRandomToPosition = (
  width: number,
  height: number,
  size: number,
) => {
  const randomX = Math.floor(Math.random() * width + size);
  const randomY = Math.floor(Math.random() * height + size);
  // 防止右侧圆被覆盖
  const maxX = Math.floor(width - (size * 3) / 2);
  const maxY = Math.floor(height - size);

  const x = randomX > maxX ? maxX : randomX;
  const y = randomY > maxY ? maxY : randomY;
  return { x, y };
};
