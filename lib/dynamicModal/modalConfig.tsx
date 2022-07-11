import React, { ReactNode } from "react";
import { Button } from "antd";

export const initBody: ReactNode = (
  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
    <li key="1">① 可拖拽</li>
    <li key="2">② 可八个方位扩展</li>
    <li key="3">③ 可全屏/还原初始</li>
    <li key="4">④ 可自定义title,body,footer</li>
    <li key="5">⑤ 可添加title等额外样式</li>
  </ul>
);
export const initOperate = (
  onCancel?: Function,
  onOk?: Function
): ReactNode[] => {
  const operate = [
    <Button
      key="cancel"
      onClick={() => {
        onCancel?.();
      }}
    >
      取消
    </Button>,
    <Button
      type="primary"
      key="confirm"
      onClick={() => {
        onOk?.();
      }}
    >
      确定
    </Button>,
  ];
  return operate;
};
