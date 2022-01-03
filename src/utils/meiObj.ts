import lodashAssignWith from 'lodash/assignWith';
import lodashIsObject from 'lodash/isObject';

export function assignWith<T=any, U=any> (targetObj: T, srcObj: U): T & U {
  return lodashAssignWith(targetObj, srcObj, (objValue, srcValue) => {
    if (lodashIsObject(objValue)) {
      return assignWith(objValue, srcValue);
    } else {
      return srcValue ?? objValue;
    }
  });
}
