import { FC } from 'react';
import ProForm, { IProFormProps } from './ProForm';
import SearchForm, { ISearchFormProps } from './searchForm';

type DeepFormType = FC<IProFormProps> & {
  SearchForm: FC<ISearchFormProps>;
};
const DeepForm = ProForm as DeepFormType;
DeepForm.SearchForm = SearchForm;
export default DeepForm;
