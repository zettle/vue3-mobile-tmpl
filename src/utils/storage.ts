/****************************************
********* 浏览器storage的相关方法 **********
*****************************************/
const namePreFix = 'myPre-';
/**
 * 获取完整的keyName名称
 * @param {string} key keyName的值
 * @return {string} 完整的keyName
 */
function getKeyName (key: string) {
  return `${ namePreFix }${ key }`.toLowerCase();
}

/**
 * 要控制的是local还是session
 * @param {boolean} isLocalStorage 要操作的是不是local
 */
function getLocalOrSession (isLocalStorage = false) {
  return isLocalStorage ? localStorage : sessionStorage;
}

export default {
  /**
   * 设置storage
   * @param key {string} 要存储的key
   * @param value {string | object} 要设置的值
   * @param expire {Number} 有效期，单位毫秒
   * @param isLocalStorage 是否要用localStorage默认否
   */
  set (name: string, value: any, isLocalStorage = false): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    const _storage = getLocalOrSession(isLocalStorage);
    // 再包装一层{value}，为了在get方法中JSON.parse的时候方便转化为ts泛型
    _storage.setItem(getKeyName(name), JSON.stringify({ value }));
  },

  /**
   * 获取storage
   * @param name {string} 要获取的key
   * @param isLocalStorage {boolean} 是否要用localStorage默认否
   * @return <T> | null
   */
  get<T> (name: string, isLocalStorage = false): T | null {
    const _storage = getLocalOrSession(isLocalStorage);
    const resStr = _storage.getItem(getKeyName(name));
    if (resStr && resStr !== 'undefined' && resStr !== 'null') {
      try {
        return JSON.parse(resStr).value as T;
      } catch (error) {
        console.log(`JSON.parse转为-${ name }-异常`, error);
      }
    }
    return null;
  },

  /**
   * 移除某个缓存
   * @param name {string} 要获取的key
   * @param isLocalStorage {boolean} 是否要用localStorage默认否
   */
  remove (name: string, isLocalStorage = false): void {
    const _storage = getLocalOrSession(isLocalStorage);
    _storage.removeItem(getKeyName(name));
  },

  /**
   * 清除整个缓存
   * @param isLocalStorage {boolean} 是否要用localStorage默认否
   * 要判断下是不是该项目开头的前缀，否则会误删其他的key
   */
  clear (isLocalStorage = false): void {
    const _storage = getLocalOrSession(isLocalStorage);
    Object.keys(_storage).forEach(key => {
      if (key.startsWith(namePreFix)) {
        _storage.removeItem(key);
      }
    });
  }
};
