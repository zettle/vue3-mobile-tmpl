import encBase64 from 'crypto-js/enc-base64';
import encUtf8 from 'crypto-js/enc-utf8';

// 加密
export function encryption (str: string): string {
  return encBase64.stringify(encUtf8.parse(str));
}
// 解密
export function decrypt (str: string): string {
  return encBase64.parse(str).toString(encUtf8);
}
