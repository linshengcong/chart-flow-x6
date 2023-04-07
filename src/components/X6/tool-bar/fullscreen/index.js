/**
 * Author: pengwenlei pwl330109371@gmail.com
 * Date: 2023-03-29 14:59:23
 * LastEditors: pengwenlei pwl330109371@gmail.com
 * LastEditTime: 2023-03-29 14:59:47
 */

// 全屏
export function handleFullScreen(_this, element) {
 
  // 判断是否已经是全屏
  // 如果是全屏，退出
  if (_this.fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    console.log('已还原！')
  } else { // 否则，进入全屏
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen()
    }
    console.log('已全屏！')
  }
  // 改变当前全屏状态
  _this.fullscreen = !_this.fullscreen
  element.style.backgroundColor = '#fff'
}
