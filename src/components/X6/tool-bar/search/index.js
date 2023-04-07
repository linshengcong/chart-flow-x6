/**
 * Author: pengwenlei pwl330109371@gmail.com
 * Date: 2023-03-29 15:02:49
 * LastEditors: pengwenlei pwl330109371@gmail.com
 * LastEditTime: 2023-03-29 15:28:23
 */
class SearchNodeFun {
  // 获取页面node数据
  getNodes() {
    const graph = window.graph
    const nodes = graph.getNodes()
    return nodes
  }
  // 加载默认的graph数据到搜索列表
  querySearch(queryString, cb) {
    const restaurants = this.getNodes()
    const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
    console.log('results', results)
    // 调用 callback 返回建议列表的数据
    cb(results)
  }
  // 关键字查询返回对应的数据列表
  createFilter(queryString) {
    return (restaurant) => {
      console.log('restaurant', restaurant)
      return restaurant.attrs.text.text.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }
  // 点击对应的节点进行选中并定位
  positionNode(label) {
    const graph = window.graph
    const nodes = this.getNodes()
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].getLabel() === label) {
      // Select the node and center the view on it
        graph.cleanSelection()
        graph.select(nodes[i])
        const rect = nodes[i].getBBox()
        graph.scrollToPoint(rect.x, rect.y, { animation: { duration: 400 } })
        break
      }
    }
  }

}

export default new SearchNodeFun()