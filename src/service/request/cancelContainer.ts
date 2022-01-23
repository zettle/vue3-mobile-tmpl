/**
 * 存axios关闭函数的容器
 */
class CancelContainer {
  private arr: any[] = [];
  constructor () {
    this.arr = [];
  }

  add (cancel: any) {
    this.arr.push(cancel);
  }
}
export default new CancelContainer();
