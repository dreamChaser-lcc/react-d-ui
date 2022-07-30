import { MutableRefObject, useEffect, useState } from 'react';
import { getBoundTop } from '../../deepTable/utils';
import { useResize } from './useResize';

/**获取详情页内容自适应高度
 * @element 元素
 */
export const useAutoHight = (detailFormRef: MutableRefObject<any>) => {
  const [autoHight, setAutoHight] = useState<number | string>();
  /**自适应高度 */
  const getAutoHight = () => {
    if (detailFormRef.current) {
      const container = document.querySelector('body') as HTMLBodyElement;
      setTimeout(() => {
        const top = getBoundTop(detailFormRef.current);
        const height = container?.clientHeight - top;
        setAutoHight(height || '100%');
      }, 100);
    }
  };
  useResize(getAutoHight);
  useEffect(() => {
    getAutoHight();
  }, [detailFormRef.current]);
  return {
    autoHight,
  };
};
