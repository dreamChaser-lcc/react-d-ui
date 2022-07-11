import React, { ReactNode, FC, useRef } from "react";
// hooks
import { useModal } from "./hook/useModal";
import { initBody, initOperate } from "./modalConfig";
import { Space } from "antd";
import classNames from "classnames";
import "./style.less";

interface IDynamicModal {
  /**对话框默认宽度 */
  modalWidth?: number;
  /**是否可见 */
  visible: boolean;
  /**头部 */
  title?: ReactNode;
  /**尾部 */
  footer?: ReactNode;
  /**body自定义样式 */
  bodyExtraClass?: string;
  /**确定按钮回调 */
  onOk?: () => void;
  /**关闭按钮回调事件 */
  onCancel?: () => void;
}
/**
 * 动态弹窗
 * feature:可调整窗口尺寸
 */
const DynamicModal: FC<IDynamicModal> = (props) => {
  const {
    modalWidth,
    visible,
    children,
    title,
    footer,
    bodyExtraClass,
    onOk,
    onCancel,
  } = props;

  const resizeTRef = useRef<HTMLDivElement>(null);
  const resizeBRef = useRef<HTMLDivElement>(null);
  const resizeLRef = useRef<HTMLDivElement>(null);
  const resizeRRef = useRef<HTMLDivElement>(null);
  const resizeLTRef = useRef<HTMLDivElement>(null);
  const resizeLBRef = useRef<HTMLDivElement>(null);
  const resizeRTRef = useRef<HTMLDivElement>(null);
  const resizeRBRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const modalWarpRef = useRef<HTMLDivElement>(null);

  const { fullScreen, revert } = useModal({
    resizeTRef,
    resizeBRef,
    resizeLRef,
    resizeRRef,
    resizeLTRef,
    resizeLBRef,
    resizeRTRef,
    resizeRBRef,
    modalRef,
    titleRef,
    modalWarpRef,
  });
  const onFullScreen = () => {
    fullScreen();
  };
  const onRevert = () => {
    revert();
  };
  const onClickClose = () => {
    onCancel?.();
  };
  /**body样式 */
  const bodyClassName = classNames("ant-modal-body", {
    [`${bodyExtraClass}`]: !!bodyExtraClass,
  });
  /**对话框样式 */
  const modalClassName = classNames("ant-modal", { "modal-extra": true });
  /**默认的底部操作按钮 */
  const footOperate = initOperate(onClickClose, onOk);

  return visible ? (
    <div id="dynamicModal">
      <div className="ant-modal-root">
        <div className="ant-modal-mask"></div>
        <div className="ant-modal-wrap">
          <div
            ref={modalRef}
            className={modalClassName}
            style={{ width: modalWidth }}
          >
            <div className="ant-modal-content content-extra">
              <section id="lcc-modal-cursorTool">
                <div ref={resizeTRef} className="resizeT"></div>
                <div ref={resizeBRef} className="resizeB"></div>
                <div ref={resizeLRef} className="resizeL"></div>
                <div ref={resizeRRef} className="resizeR"></div>
                <div ref={resizeLTRef} className="resizeLT"></div>
                <div ref={resizeLBRef} className="resizeLB"></div>
                <div ref={resizeRTRef} className="resizeRT"></div>
                <div ref={resizeRBRef} className="resizeRB"></div>
              </section>
              <header className="ant-modal-title">
                <div ref={titleRef} className="ant-modal-header title-extra">
                  <div id="lcc-modal-footer">{title ? title : "title"}</div>
                  <div id="lcc-modal-operate" className="modal-oprate">
                    <button
                      onClick={onRevert}
                      title="还原"
                      type="button"
                      className="min"
                    ></button>
                    <button
                      onClick={onFullScreen}
                      title="全屏"
                      type="button"
                      className="max"
                    ></button>
                    <button
                      onClick={onClickClose}
                      type="button"
                      className="close"
                    ></button>
                  </div>
                </div>
              </header>
              <article id="lcc-modal-body" className={bodyClassName}>
                {children ? children : initBody}
              </article>
              <footer id="lcc-modal-footer" className="ant-modal-footer">
                {footer ? (
                  footer
                ) : (
                  <>
                    <Space> {footOperate.map((item) => item)}</Space>
                  </>
                )}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
DynamicModal.defaultProps = {
  modalWidth: 520,
  visible: false,
};
export default DynamicModal;
