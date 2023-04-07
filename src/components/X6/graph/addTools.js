/**
 * Author: lixiaoyi 2212884878@qq.com
 * Date: 2023-03-27 16:23:24
 * LastEditors: lixiaoyi 2212884878@qq.com
 * LastEditTime: 2023-03-27 17:53:13
 */
// 新增节点工具
export const addTools = (node, that) => {
  node.addTools([
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '50%',
        y: 0,
        offset: { x: 0, y: -20 },
        onClick({ e, cell }) {
          that.activeNodeAbs = 'top'
          toolClick(e, cell, that)
        }
      }
    },
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '100%',
        y: '50%',
        offset: { x: 20, y: 0 },
        onClick({ e, cell }) {
          that.activeNodeAbs = 'right'
          toolClick(e, cell, that)
        }
      }
    },
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '50%',
        y: '100%',
        offset: { x: 0, y: 20 },
        onClick({ e, cell }) {
          that.activeNodeAbs = 'bottom'
          toolClick(e, cell, that)
        }
      }
    },
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: 0,
        y: '50%',
        offset: { x: -20, y: 0 },
        onClick({ e, cell }) {
          that.activeNodeAbs = 'left'
          toolClick(e, cell, that)
        }
      }
    }
  ])
}

const toolClick = ( e, cell, _this ) => {
  console.log(cell)
  _this.activeNode = cell
  _this.$refs['nodeDnd'].referenceElm = e.target || e.srcElement
  _this.$refs['nodeDnd'].doToggle()
}