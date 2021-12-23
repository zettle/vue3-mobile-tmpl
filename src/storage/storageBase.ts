class BaseStorage<T = any> {
  private realStorage: Storage; // 要控制的是local还是session
  private readonly prefix = 'mypro-';
  /**
   * 构造函数
   * @param isLocalStorage 是否使用localstorage
   * @param prefix 缓存key的前缀（一般起个项目名）
   */
  constructor (private isLocalStorage: boolean, private itemName: string) {
    this.realStorage = isLocalStorage ? window.localStorage : window.sessionStorage;
  }

  /**
   * 获取完整的keyName名称
   */
  private get storageKeyName () {
    return `${ this.prefix }${ this.itemName }`.toLowerCase();
  }

  /**
   * 设置storage
   * @param value {string | object} 要设置的值
   */
  public set (value: T): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    // 再包装一层{value}，为了在get方法中JSON.parse的时候方便转化为ts泛型
    this.realStorage.setItem(this.storageKeyName, JSON.stringify({ value }));
  }

  /**
   * 获取storage
   * @return <T> | null
   */
  public get (): T | null {
    const resStr = this.realStorage.getItem(this.storageKeyName);
    if (resStr && resStr !== 'undefined' && resStr !== 'null') {
      try {
        return JSON.parse(resStr).value as T;
      } catch (error) {
        console.log(`JSON.parse转为-${ this.storageKeyName }-异常`, error);
      }
    }
    return null;
  }

  /**
   * 移除当前storage
   */
  public remove (): void {
    this.realStorage.removeItem(this.storageKeyName);
  }

  /**
   * 清除整个缓存
   * 要判断下是不是该项目开头的前缀，否则会误删其他的key
   */
  static clear (): void {
    // Object.keys(this.realStorage).forEach(key => {
    //   if (key.startsWith(this.prefix)) {
    //     this.realStorage.removeItem(key);
    //   }
    // });
  }
}

// localstorage的封装类
export class LocalStorage<T = any> extends BaseStorage<T> {
  constructor (itemName: string) {
    super(true, itemName);
  }
}

// sessionstorage的封装类
export class SessionStorage<T = any> extends BaseStorage<T> {
  constructor (itemName: string) {
    super(false, itemName);
  }
}
