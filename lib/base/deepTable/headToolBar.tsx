import React from 'react';
import { FC, ReactNode, CSSProperties, memo, MutableRefObject } from 'react';
// 组件
import { FullscreenOutlined, RedoOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { exitFullscreen, isFullScreen, requestFullScreen } from '../../../lib/utils/dom.utils';
// 方法
//常量
// 枚举
import { DEEP_TABLE_CLASS } from '../../../lib/constants/common';

enum TOOL_Enum {
  'fullScreen' = 'fullScreen',
  'reload' = 'reload',
}
enum TOOL_TIP_Enum {
  'fullScreen' = '全屏',
  'reload' = '刷新',
}

interface ICondition {
  /**表格实例 */
  deepTableRef: MutableRefObject<HTMLDivElement | null>;
  /**表格刷新 */
  tableReload: () => void;
}
interface IHeadToolBarProps {
  /**表格参数 */
  condition: ICondition;
  /**头部操作按钮 */
  headOperation?: ReactNode[];
  /**工具栏字典配置 */
  tools?: TOOL_Enum[];
}
/**头部操作&工具栏 */
const HeadToolBar: FC<IHeadToolBarProps> = (props) => {
  const { headOperation, tools, condition } = props;

  const handleFullScreen = () => {
    const element = condition.deepTableRef?.current;
    isFullScreen() ? exitFullscreen() : requestFullScreen(element);
  };
  const handleToolClick = (toolKey: TOOL_Enum) => {
    switch (toolKey) {
      case TOOL_Enum.fullScreen:
        return handleFullScreen();
      case TOOL_Enum.reload:
        return condition.tableReload();
    }
  };

  /**工具栏 */
  const renderTool = () => {
    return tools?.map((toolKey) => {
      const props = {
        key: toolKey,
        onClick: () => {
          handleToolClick(toolKey);
        },
      };
      let tool: ReactNode;
      switch (toolKey) {
        case 'fullScreen':
          tool = <FullscreenOutlined {...props} />;
          break;
        case 'reload':
          tool = <RedoOutlined {...props} />;
          break;
      }
      return (
        <Tooltip
          key={props.key}
          placement="top"
          title={TOOL_TIP_Enum[toolKey]}
          getPopupContainer={() =>
            document.querySelector(DEEP_TABLE_CLASS) || document.body
          }
          arrowPointAtCenter
        >
          {tool}
        </Tooltip>
      );
    });
  };

  return (
    <div className='deepTable-tools-rows' >
      <div>
        <Space>{headOperation}</Space>
      </div>
      <Space className='deepTable-tools-item'>{renderTool()}</Space>
    </div>
  );
};

HeadToolBar.defaultProps = {
  tools: [TOOL_Enum.reload, TOOL_Enum.fullScreen],
  // headOperation: [
  //   <Button type="primary" icon={<PlusOutlined />}>
  //     新增
  //   </Button>,
  //   <Button>Clear filters</Button>,
  // ],
};

export default memo(HeadToolBar);
