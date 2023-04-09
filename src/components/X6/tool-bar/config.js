/**
 * Author: lixiaoyi 2212884878@qq.com
 * Date: 2023-03-22 19:11:28
 * LastEditors: pengwenlei pwl330109371@gmail.com
 * LastEditTime: 2023-03-29 14:15:49
 */
export const Tools = {
  undo: {
    svg: 'undo',
    can: false,
    title: '撤销'
  },
  redo: {
    svg: 'redo',
    can: false,
    title: '重做'
  },
  // zoomin: {
  //   svg: 'zoomin',
  //   title: '放大'
  // },
  // zoomout: {
  //   svg: 'zoomout',
  //   title: '缩小'
  // },
  copy: {
    svg: 'copy',
    title: '复制'
  },
  delete: {
    svg: 'dustbin',
    title: '删除',
    can: true
  },
  focus: {
    svg: 'focus',
    title: '居中'
  },
  selectAll: {
    svg: 'select_all',
    title: '全选'
  },
  requestFullscreen: {
    svg: 'flex-1',
    title: '全屏'
  }
}

// 引导文案
export const TipsContent = [
  {
    label: 'Command/Ctrl+a',
    value: '单元全选'
  },
  {
    label: 'Command/Ctrl+c',
    value: '单元复制'
  },
  {
    label: 'Command/Ctrl+v',
    value: '单元粘贴'
  },
  {
    label: 'Delete / BackSpace',
    value: '单元删除'
  },
  {
    label: 'Command/Ctrl+z',
    value: '单元撤销'
  },
  {
    label: 'Ctrl+y',
    value: '单元重做'
  },
  {
    label: 'Esc',
    value: '取消所有选中单元'
  },
  // {
  //   label: 'Alt+h',
  //   value: '帮助信息'
  // },
  {
    label: 'Option/Alt+f',
    value: '画布居中'
  },
  {
    label: 'Command/Ctrl+(+/-)',
    value: '放大/缩小'
  },
  {
    label: 'Ctrl+leftMouseDown',
    value: '框选'
  }
]
export const typeContent = [
  {
    label: '简单连接器',
    value: 'normal'
  },
  {
    label: '平滑连接器',
    value: 'smooth'
  },
  {
    label: '圆角连接器',
    value: 'rounded'
  },
  {
    label: '跳线连接器',
    value: 'jumpover'
  }
]
export const typeAlign = [
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '居中对齐',
    value: 'mid'
  },
  {
    label: '右对齐',
    value: 'right'
  }
]

export const typeWidthAndHeight = [
  {
    label: '宽度匹配',
    value: 'width'
  },
  {
    label: '高度匹配',
    value: 'height'
  },
  {
    label: '宽高匹配',
    value: 'widthAndHeight'
  }
]

export const typeLock = [
  {
    label: '锁定',
    value: 'lock'
  },
  {
    label: '解锁',
    value: 'unLock'
  }
]