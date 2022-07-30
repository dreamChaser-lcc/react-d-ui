import { createContext } from 'react';
import { FormInstance } from 'antd';

interface IProFormContext {
  form: FormInstance<any> | null;
  dataFormats: any;
}
export default createContext<IProFormContext>({
  form: null,
  dataFormats: {},
});
