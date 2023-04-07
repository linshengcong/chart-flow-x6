const { Graph, Addon, Shape } = window.X6
import jsonData from './data'
import jsonData2 from './data2'
import trigger from '../tool-bar/trigger'
import './shape'
export const initX6 = (_this) => {
  _this.graph = new Graph({
    container: document.getElementById('container'), // 画板的dom容器
    // width: '1000px', // 画板的宽度
    // height: '1000px', // 画板的高度
    // 监听容器大小改变，并自动更新画布大小
    // https://x6.antv.vision/zh/docs/api/graph/graph#autoresize
    autoResize: true,
    scroller: true,
    // 网格
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1 // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4 // 主次网格线间隔
        }
      ]
    },
    // 键盘快捷键 Keyboard
    // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard/#gatsby-focus-wrapper
    keyboard: {
      enabled: true,
      global: true
    },
    // 点选/框选，默认禁用。
    selecting: {
      enabled: true,
      showNodeSelectionBox: true,
      // https://x6.antv.vision/zh/docs/tutorial/basic/selection
      rubberband: true // 启用框选
      // modifiers: 'ctrl' // 组合键
    },
    // 画布是否可以拖拽平移
    panning: {
      enabled: true,
      modifiers: ['alt', 'shift', 'space'], // 修饰键：按下修饰键并点击鼠标触发
      eventTypes: 'leftMouseDown' // 触发画布平移的交互方式
    },
    // 开启画布缩放
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
      minScale: 0.5,
      maxScale: 2
    },
    // 迷你地图
    minimap: {
      enabled: false,
      width: 200,
      height: 150,
      container: document.getElementById('minimap'),
      padding: 40
    },
    // 配置全局的连线规则
    // https://x6.antv.vision/zh/docs/api/graph/interaction
    connecting: {
      // 自动吸附
      snap: true,
      // 不允许连接到画布空白位置的点
      allowBlank: false,
      // 不允许创建循环连线
      allowLoop: false,
      // 不允许在相同的起始节点和终止之间创建多条边
      // withPort=>起始和终止节点之间可以创建多条边，但必须要要链接在不同的链接桩上
      allowMulti: 'withPort',
      // 高亮显示所有可用的连接桩或节点
      // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#highlight
      highlight: true,
      // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
      sourceAnchor: {
        name: 'center'
      },
      // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
      targetAnchor: 'center',
      // 指定连接点，默认值为 boundary。
      connectionPoint: 'anchor',
      // 连接器将起点、路由返回的点、终点加工为 元素的 d 属性，决定了边渲染到画布后的样式，默认值为 normal。
      connector: {
        name: 'rounded',
        args: {
          radius: 20
        }
      },
      // 路由将边的路径点 vertices 做进一步转换处理，并在必要时添加额外的点，然后返回处理后的点，默认值为 normal。
      router: 'metro',
      // 连接的过程中创建新的边
      createEdge() {
        // X6 的 Shape 命名空间中内置 Edge、DoubleEdge、ShadowEdge 三种边
        return new Shape.Edge({
          zIndex: -1,
          attrs: {
            line: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              targetMarker: {
                name: 'classic',
                size: 8
              }
            }
          }
        })
      },
      // 在移动边的时候判断连接是否有效，如果返回false，当鼠标放开的时候，不会连接到当前元素
      validateConnection(params) {
        const { sourceView, targetView, sourceMagnet, targetMagnet } = params
        if (sourceView === targetView) {
          return false
        }
        if (!sourceMagnet) {
          return false
        }
        if (!targetMagnet) {
          return false
        }
        return true
      }
    },
    // 可以通过 highlighting 选项来指定触发某种交互时的高亮样式
    // https://x6.antv.vision/zh/docs/api/graph/interaction/#highlighting
    highlighting: {
      // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            strokeWidth: 8,
            stroke: 'rgba(30,134,255,0.3)'
          }
        }
      },
      // 连线过程中，自动吸附到链接桩时被使用
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            strokeWidth: 8,
            stroke: '#1E86FF'
          }
        }
      }
    },
    resizing: true,
    rotating: true,
    snapline: true,
    history: true,
    zIndex: 1,
    clipboard: {
      enabled: true
    },
    embedding: {
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox()
        return this.getNodes().filter((node) => {
          // 只有 data.parent 为 true 的节点才是父节点
          const data = node.getData()
          if (data && data.parent) {
            const targetBBox = node.getBBox()
            return bbox.isIntersectWithRect(targetBBox)
          }
          return false
        })
      }
    }
  })
  // console.log(jsonData)

  const graph = _this.graph
  window.graph = graph
  // 基础节点
  // 左侧面板
  _this.dnd = new Addon.Dnd({
    target: graph,
    scaled: false,
    animation: true,
    validateNode(droppingNode, options) {
      console.log(droppingNode, options)
      return true
    }
  })
  _this.initEvent()
  trigger(graph)

  if (_this.$route.query.id) {
    const graphJSON = JSON.parse(localStorage.getItem('graphJSON2'))
    _this.graph.fromJSON(graphJSON || jsonData2)
  } else {
    const graphJSON = JSON.parse(localStorage.getItem('graphJSON'))
    _this.graph.fromJSON(graphJSON || jsonData)
  }
}
