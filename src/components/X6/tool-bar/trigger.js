/**
 * Author: lixiaoyi 2212884878@qq.com
 * Date: 2023-03-22 19:19:14
 * LastEditors: zengkui527996131@qq.com hw2881HWX
 * LastEditTime: 2023-03-29 16:40:02
 */
export default (graph) => {
  bindKey(graph)
}
const State = {
  offset: 30,
  useLocalStorage: true
}
function bindKey(graph) {
  // 复制
  graph.bindKey(['ctrl+c', 'command+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略。
    return false
  })
  // 粘贴
  graph.bindKey(['ctrl+v', 'command+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  // 全选
  graph.bindKey(['ctrl+a', 'command+a'], () => {
    const cells = graph.getCells()
    if (cells.length) {
      graph.select(cells)
    }
    return false
  })
  // 删除
  graph.bindKey(['delete', 'backspace'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      // 删除前移除所有包含工具
      cells.forEach(currentCell => {
        currentCell.removeTools()
      })
      graph.removeCells(cells)
    }
    return false
  }, 'keydown')
  // 撤销
  graph.bindKey(['ctrl+z', 'command+z'], () => {
    graph.undo()
    return false
  })
  // 重做
  graph.bindKey(['ctrl+y', 'shift+command+z'], () => {
    graph.redo()
    return false
  })
  // Esc 取消所有选中单元 & 关闭提示
  graph.bindKey('esc', () => {
    graph.cleanSelection()
    return false
  })
  
  // 居中
  graph.bindKey(['alt+f', 'option+f'], () => {
    graph.centerContent()
    return false
  })

  // 放大
  graph.bindKey(['alt++', 'alt+=', 'command++', 'command+='], () => {
    zoom(0.1)
    return false
  })
  // 缩小
  graph.bindKey(['alt+-', 'command+-'], () => {
    zoom(-0.1)
    return false
  })
}
// 粘贴
export function onPaste(graph) {
  const cells = graph.getSelectedCells()
  if (cells && cells.length) {
    graph.copy(cells, State)
  }
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste(State)
    graph.cleanSelection()
    graph.select(cells)
  }
}

// 全选
export function selectAll(graph) {
  const cells = graph.getCells()
  if (cells.length) {
    graph.select(cells)
  }
}

export function deleteCells(graph) {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    // 删除前移除所有包含工具
    cells.forEach(currentCell => {
      currentCell.removeTools()
    })
    graph.removeCells(cells)
  }
}

// 画布缩放
// absolute 为 true 时，表示将画布缩放到 factor 代表的值，
// 否则 factor 表示放大/缩小的因子，当 factor 为正数时表示画布放大画布，
// 当 factor 为负数时表示缩小画布
export function zoom(factor = 1, absolute = false, graph = window.graph) {
  graph.zoom(factor, {
    absolute,
    minScale: 0.5,
    maxScale: 2,
    scaleGrid: 0.1
  }) 
}
// 链接类型
export function renewConnector(graph, type, that) {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    cells.forEach(item => {
      item.setConnector && item.setConnector(type)
    })
  } else {
    that.$message.warning('请先选中连接线')
  }
}