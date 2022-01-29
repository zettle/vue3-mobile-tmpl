import { defaultTitle } from '@/global/config';
/***********
 * 设置title
 ***********/
export function setDocTitle(title: string = defaultTitle): void {
  document.title = title;
}
