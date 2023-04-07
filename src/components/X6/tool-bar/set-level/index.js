/**
 * Author: pengwenlei pwl330109371@gmail.com
 * Date: 2023-03-28 17:46:34
 * LastEditors: pengwenlei pwl330109371@gmail.com
 * LastEditTime: 2023-03-29 14:12:52
 */
/**
 * name: setLevel
 * description: 设置节点图层层级
 * param {*} val  topping 置顶 bottoming 置底 up 上移一层 down 下移一层
 * return {*}
 */
export function setLevel(val) {
  const graph = window.graph
  const selectNodeList = graph.getSelectedCells()
  const len = selectNodeList.length
  for (let index = 0; index < len; index++) {
    const cell = selectNodeList[index]
    console.log(graph.getNeighbors(cell))
    if (val === 'topping') {
      cell.toFront()
    } else if (val === 'bottoming') {
      cell.toBack()
    } else if ( val === 'up') {
      const nodeLevel = cell.getZIndex()
      console.log('nodeLevel', nodeLevel)
      cell.setZIndex(nodeLevel + 1)
    } else {
      const nodeLevel = cell.getZIndex()
      console.log('nodeLevel', nodeLevel)
      cell.setZIndex(nodeLevel - 1)
    }
  }
}