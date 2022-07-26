/****************************************
 ********** 设置根节点的fontSize ***********
 *****************************************/
const baseSize = 37.5;
const doc = document.documentElement;
const maxFontSize = 70;

document.body.style = `max-width:${maxFontSize * 10}px;margin-left:auto;margin-right:auto`; // 具体多少无所谓，只是觉得800px整个页面差不多比例

function setRem() {
  // 当前页面宽度相对于 750宽的缩放比例，可根据自己需要修改,一般设计稿都是宽750(图方便可以拿到设计图后改过来)。
  const scale = doc.clientWidth / 375; // 750设计稿的宽度
  const fontSize = baseSize * scale;
  doc.style.fontSize = `${Math.min(fontSize, maxFontSize)}px`; // 设置页面根节点字体大小 最大值80px
}
// 初始化
setRem();

// 改变窗口大小时重新设置 rem
let timer = 0;
window.onresize = function () {
  timer && window.clearTimeout(timer);
  timer = setTimeout(setRem, 200);
};
