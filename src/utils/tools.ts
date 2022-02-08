import { defaultTitle } from '@/global/config';
/***********
 * 设置title
 ***********/
export function setDocTitle(title: string = defaultTitle): void {
  document.title = title;
}

/**
 * 解析arrayBuffer并且下载
 */
export function downloadArrayBuffer(data: BlobPart, fileName = '图片下载.png') {
  const blob = new Blob([data]);
  const blobUrl = window.URL.createObjectURL(blob);
  const tmpLink = document.createElement('a');
  tmpLink.style.display = 'none';
  tmpLink.href = blobUrl;
  tmpLink.setAttribute('download', fileName);
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
  window.URL.revokeObjectURL(blobUrl);
}

/**
 * 创建<form>标签，post请求接口下载
 */
export function downloadWinForm(url: string, params?: { [s: string]: string }) {
  const myForm = document.createElement('form');
  myForm.method = 'post';
  myForm.action = url;
  myForm.style.display = 'none';
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      const myInput = document.createElement('input');
      myInput.setAttribute('name', key);
      myInput.setAttribute('value', val);
      myForm.appendChild(myInput);
    }
  }
  document.body.appendChild(myForm);
  myForm.submit();
  document.body.removeChild(myForm);
}
