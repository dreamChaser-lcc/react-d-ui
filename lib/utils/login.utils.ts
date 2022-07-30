import { ReactNode } from 'react';
import { message, notification } from 'antd';

type ValidateErrorEntity<T = any> = {
  errors: T[];
  name: T[];
  warnings: T[];
};
type FieldParams = ValidateErrorEntity[];
/**
 * notification
 * 验证表单或请求失败后的提示
 * @param errorField 验证失败的提示信息
 */
export const handleVerifyError = (errorField: FieldParams) => {
  if (Array.isArray(errorField)) {
    errorField.forEach((item) => {
      const errors = item?.errors;
      if (errors && Array.isArray(errors)) {
        item.errors.forEach((val) => {
          notification.warning({
            message: val,
          });
        });
      }
    });
  }
};

/**
 * 成功提示
 * @param tip 提示信息
 */
export const handleVerifySuccess = (tip: ReactNode) => {
  message.success(tip);
};
/**
 * 保存账号密码及token
 * @param account 账号
 * @param password 密码
 * @param token token
 */
export const remenber = (account: string, password: string, token?: any) => {
  localStorage.setItem('account', account);
  localStorage.setItem('password', password);
  localStorage.setItem('token', token);
};
export const clearRemenber = () => {
  localStorage.removeItem('account');
  localStorage.removeItem('password');
  localStorage.removeItem('token');
};
