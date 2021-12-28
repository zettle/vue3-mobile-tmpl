// storage存的value的格式
interface IStorageValue<T> {
  value: T;
  expire?: number;
}

class BaseStorage<T = any> {
  private webStorage: Storage; // 要控制的是local还是session
  private static readonly prefix = 'mypro-';
  /**
   * 构造函数
   * @param isLocalStorage 是否使用localstorage
   * @param prefix 缓存key的前缀（一般起个项目名）
   */
  constructor (private isLocalStorage: boolean, private itemName: string) {
    this.webStorage = isLocalStorage ? window.localStorage : window.sessionStorage;
  }

  /**
   * 获取完整的keyName名称
   */
  private get storageKeyName () {
    return `${ BaseStorage.prefix }${ this.itemName }`.toLowerCase();
  }

  /**
   * 判断是否在有效期内，过期的话把对应的storage也清掉
   * @param storageValue {IStorageValue} storage的格式
   * @returns true表示在有效期内
   */
  private isValidPeriod (storageValue: IStorageValue<T>): boolean {
    const { expire } = storageValue;
    if (expire && new Date().getTime() > expire) { // 有值并且小于当前时间，说明过期
      this.remove();
      return false;
    }
    return true;
  }

  /**
   * 设置storage
   * @param value {string | object} 要设置的值
   * @param expire {number} 过期时间，单位毫秒
   */
  set (value: T, expire?: number): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    const storageValue: IStorageValue<T> = { value };
    if (expire) {
      if (typeof expire !== 'number') {
        throw new Error('storage.set 第2个参数只能是数字');
      }
      storageValue.expire = new Date().getTime() + expire;
    }
    this.webStorage.setItem(this.storageKeyName, JSON.stringify(storageValue));
  }

  /**
   * 获取storage
   * @return <T> | null
   */
  get (): T | null {
    const resStr = this.webStorage.getItem(this.storageKeyName);
    if (!resStr) { return null; }

    try {
      const storageValue: IStorageValue<T> = JSON.parse(resStr);
      // 判断是否过期
      if (this.isValidPeriod(storageValue)) {
        return storageValue.value;
      }
    } catch (error) {
      console.log(`JSON.parse转为-${ this.storageKeyName }-异常`, error);
    }
    return null;
  }

  /**
   * 移除当前storage
   */
  remove (): void {
    this.webStorage.removeItem(this.storageKeyName);
  }

  /**
   * 清除整个缓存
   * 要判断下是不是该项目开头的前缀，否则会误删其他的key
   */
  static clear (webStorage: Storage): void {
    Object.keys(webStorage).forEach(key => {
      if (key.startsWith(BaseStorage.prefix)) {
        webStorage.removeItem(key);
      }
    });
  }
}

// localstorage的封装类
export class LocalStorage<T = any> extends BaseStorage<T> {
  constructor (itemName: string) {
    super(true, itemName);
  }

  static clear (): void {
    super.clear(window.sessionStorage);
  }
}

// sessionstorage的封装类
export class SessionStorage<T = any> extends BaseStorage<T> {
  constructor (itemName: string) {
    super(false, itemName);
  }

  static clear (): void {
    super.clear(window.sessionStorage);
  }
}

export function defineSessionStorage<T> (keyName: string): SessionStorage<T> {
  return new SessionStorage<T>(keyName);
}

export function defineLocalStorage<T> (keyName: string): LocalStorage<T> {
  return new LocalStorage<T>(keyName);
}
