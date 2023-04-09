/**
 * Author: lixiaoyi 2212884878@qq.com
 * Date: 2023-03-27 17:47:01
 * LastEditors: lixiaoyi xiaogou2019@outlook.com
 * LastEditTime: 2023-04-06 15:14:30
 */
const { Vector } = window.X6
// 添加边
export const createEdge = (source, target, that) => {
  const activeNodeAbs = that.activeNodeAbs
  const port1 = source.port.ports.find(res => res.group === activeNodeAbs).id
  const abs = {
    'left': 'right',
    'top': 'bottom',
    'right': 'left',
    'bottom': 'top'
  }
  const port2 = target.port.ports.find(res => res.group === abs[activeNodeAbs]).id
  return that.graph.createEdge({
    'shape': 'edge',
    'attrs': {
      'line': {
        'stroke': '#5F95FF',
        'strokeWidth': 1,
        'targetMarker': {
          'name': 'classic',
          'size': 8
        }
      }
    },
    'router': {
      'name': 'manhattan'
    },
    source: { 
      cell: source.id,
      port: port1
    },
    target: { 
      cell: target.id,
      port: port2
    }
  })
}

// 添加节点
export const createNode = (number, that) => {
  const graph = that.graph
  const activeNode = that.activeNode
  const activeNodeAbs = that.activeNodeAbs
  let size = ''
  let position = ''
  // 设置节点位置
  if (activeNode && activeNodeAbs) {
    size = activeNode.size()
    position = activeNode.position()
    if (activeNodeAbs === 'right') position.x = position.x + size.width + 50
    else if (activeNodeAbs === 'left') position.x = position.x - size.width - 50
    else if (activeNodeAbs === 'bottom') position.y = position.y + size.height + 50
    else if (activeNodeAbs === 'top') position.y = position.y - size.height - 50
  }
  
  let node = ''
  switch (number) {
    case 1:
      node = graph.createNode({
        shape: 'flow-chart-rect',
        label: '开始',
        position,
        attrs: {
          body: {
            rx: 20,
            ry: 26
          }
        }
      })
      break
    case 2:
      node = graph.createNode({
        shape: 'flow-chart-rect',
        position,
        label: '节点'
      })
      break
    case 3:
      node = graph.createNode({
        shape: 'custom-polygon',
        position,
        label: '判断'
      })
      break
    case 4:
      node = graph.createNode({
        shape: 'flow-chart-rect',
        position,
        label: '结束',
        attrs: {
          body: {
            rx: 20,
            ry: 26
          }
        }
      })
      break
  }
  return node
}

// 选中节点动画
export const sendToken = (node, graph) => {
  // 获取连接到节点/边的输出边，即边的起点为指定节点/边的边
  const edges = graph.getOutgoingEdges(node)
  Array.isArray(edges) && edges.forEach((edge) => {
    // 根据节点/边 ID 或实例查找对应的视图
    const view = graph.findViewByCell(edge)
    const token = Vector.create('circle', { r: 6, fill: '#feb662' })
    const target = edge.getTargetCell()
    setTimeout(() => {
      // 开始一个沿边路径运动的动画，返回一个停止该动画的方法
      view.sendToken(token.node, 1000, () => {
        if (target) {
          sendToken(target, graph)
        }
      })
    }, 300)
  })
}

// 编辑label
export const editLabel = (cell, view) => {
  const oldText = cell.attr('text/text')
  const elem = view.container.querySelector('.x6-edit-text')
  cell.attr('text/style/display', 'none')
  if (elem) {
    elem.innerText = oldText
    elem.focus()
    const range = document.createRange()
    range.selectNodeContents(elem)
    range.collapse(false)
    const sel = window.getSelection()
    // 判断光标位置，如不需要可删除
    if (sel.anchorOffset !== 0) {
      return
    }
    sel.removeAllRanges()
    sel.addRange(range)
  }
  const onBlur = () => {
    cell.attr('text/text', elem.innerText)
    setTimeout(() => {
      cell.attr('text/style/display', 'block')
      elem.innerText = ''
    }, 100)
  }
  if (elem) {
    elem.addEventListener('blur', () => {
      onBlur()
      elem.removeEventListener('blur', onBlur)
    })
  }
}
export const removeShapeEdge = (graph) => {
  graph.getEdges().forEach(item => {
    const view = graph.findViewByCell(item)
    if (view) {
      const path = view.findOne('path')
      if (path) {
        if (path.parentNode.childNodes.length >= 3) {
          path.parentNode.lastChild.remove()
        }
      }
    }
  })
}
export const setAnimate = (id, graph) => {
  const { Vector } = window.X6
  console.log(Vector)
  removeShapeEdge(graph)
  graph.getEdges().filter(item => item.source.cell === id).forEach(item => {
    const view = graph.findViewByCell(item)
    if (view) {
      const path = view.findOne('path')
      if (path) {
        const token = Vector.create('circle', { r: 3, fill: '#5F95FF' })
        token.animateAlongPath({ dur: '2s', repeatCount: 'indefinite' }, path)
        token.appendTo(path.parentNode)
      }
    }
  })

}