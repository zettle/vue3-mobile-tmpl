import lodashAssignWith from 'lodash/assignWith';
import lodashIsObject from 'lodash/isObject';

/**
 *
 * @param targetObj 目标对象
 * @param srcObj 源对象
 * @returns 和目标对象一样
 */
export function assignWith<T=any, U=any> (targetObj: T, srcObj: U): void {
  lodashAssignWith(targetObj, srcObj, (objValue, srcValue) => {
    if (lodashIsObject(objValue)) {
      return assignWith(objValue, srcValue);
    } else {
      return srcValue ?? objValue;
    }
  });
}
