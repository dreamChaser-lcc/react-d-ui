import { createContext } from 'react';

interface IDetailContext {
  detailData: any;
}
export const DetailContext = createContext<IDetailContext>({
  detailData: {},
});
