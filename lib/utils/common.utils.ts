import { cloneDeep } from 'lodash';

/**
 * 过滤对象中的 undefined & null
 * @param obj
 */
export const filterObj = (obj: Record<string | number, any>) => {
  const result = cloneDeep(obj);
  for (let [name, v] of Object.entries(result)) {
    if (v === undefined || v === null) {
      delete result[name];
    }
  }
  return result;
};

/**对象转对象数组 */
export const objToArr = (obj: any) => {
  if (
    Object.prototype.toString.call(obj) !== '[object Object]' ||
    JSON.stringify(obj) === '{}'
  ) {
    return [];
  } else {
    const arr = [];
    for (let [name, val] of Object.entries(obj)) {
      arr.push({ name: name, value: val });
    }
    return arr;
  }
};
