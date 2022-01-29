/**
 * 给每个url生产一个随机字符串的唯一key
 * toString(36) 36/16/8 数字越小长度越长
 */
export default function generUrlKey(): string {
  return Math.random().toString(16).substring(2);
}
