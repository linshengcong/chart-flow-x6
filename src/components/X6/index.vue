<template>
  <div id="graph-container" class="flow" @click.stop="showContextMenu = false">
    <div class="content">
      <Toolbar :data="graphData" />
      <MenuBar v-if="showContextMenu" ref="menuBar" @callBack="contextMenuFn" />

      <!--左侧工具栏-->
      <div id="stencil" class="stencil" :style="{'left':leftVisible?'0':'-140px'}">
        <div class="leftButton" @click="leftVisible = !leftVisible">
          <svg-icon v-show="!leftVisible" icon-class="right_double" />
          <svg-icon v-show="leftVisible" icon-class="left_double" />
        </div>
        <div class="title" @click="nodeVisible = !nodeVisible">
          <svg-icon v-if="nodeVisible" icon-class="down_circle" />
          <svg-icon v-else icon-class="right_circle" />
          基础图形
        </div>
        <div v-show="nodeVisible">
          <div
            v-for="item of nodeDnd"
            :key="item.value"
            :data-type="item.value"
            :class="`dnd-rect-${item.value}`"
            @mousedown="startDrag">
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <!--流程图工具栏-->
        <div class="toolbar">
          <!-- <tool-bar v-if="isReady" /> -->
        </div>
        <!--流程图画板-->
        <div id="container" :class="['x6-graph x6-graph-pannable', {'format-brush': isFormatBrush}]"></div>
        <!-- 迷你地图 -->
        <div id="minimap" class="mini-map"></div>
      </div>
      <Right-Panel :node-attrs.sync="nodeAttrs" :graph="graph" />
      <el-popover
        ref="nodeDnd"
        placement="right"
        trigger="click">
        <div class="stencil stencil2">
          <div
            v-for="item of nodeDnd"
            :key="item.value"
            :data-type="item.value"
            :class="`dnd-rect dnd-rect-${item.value}`"
            @click="addNode($event,item)">
            <span>{{ item.label }}</span>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { initX6 } from './graph/graph'
import { addTools } from './graph/addTools'
import { createEdge, createNode, setAnimate, removeShapeEdge } from './graph/cellNode'
import Toolbar from './tool-bar'
import jsonData from './graph/data'
import RightPanel from './right-panel/index'
import MenuBar from './components/menuBar.vue'
import insertCss from 'insert-css'
import { setWidgetToolsHidden } from './tool-bar/trigger'
// import Modal from './Modal'
insertCss(`
  @keyframes ant-line {
    to {
        stroke-dashoffset: -1000
    }
  }
`)
export default {
  name: 'X6',
  components: {
    RightPanel,
    Toolbar,
    MenuBar
  },
  provide() {
    return {
      disabled: this.disabled,
      activeFormatBrush: this.activeFormatBrush,
      handleResetStyle: this.handleResetStyle,
      handleSetDefaultStyle: this.handleSetDefaultStyle
    }
  },
  data() {
    return {
      formatBrushConnectorType: '',
      disabled: false,
      defaultStyle: {},
      isFormatBrush: false,
      showContextMenu: false,
      graph: '',
      dnd: '',
      graphData: [],
      activeNode: '', // 选中节点点击加号
      activeNodeAbs: 'right', // 选中节点点击加号方向
      nodeAttrs: {},
      // 基础图形数据
      nodeDnd: [{
        label: '开始',
        value: '1'
      }, {
        label: '节点',
        value: '2'
      }, {
        label: '判断',
        value: '3'
      }, {
        label: '结束',
        value: '4'
      }],
      nodeVisible: true, // 基础图形状态
      leftVisible: true, // 左侧导航状态
      currentCellFormatAttr: {}
    }
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.isFormatBrush = false
        this.currentCellFormatAttr = {}
        this.formatBrushConnectorType = ''
      }
    })
    // 加载X6
    this.$nextTick(() => {
      initX6(this)
      this.getResetGraph()
    })
  },
  methods: {
    // 重置样式
    handleResetStyle() {
      this.defaultStyle = {}
    },
    // 设置默认样式
    handleSetDefaultStyle() {
      Reflect.deleteProperty(this.nodeAttrs.attrs.text, 'text')
      Object.assign(this.defaultStyle, this.nodeAttrs.attrs)
    },
    // 格式刷
    // TODO node 刷 edge 样式, edge 刷 node 样式 
    activeFormatBrush() {
      this.isFormatBrush = true
      const selected = this.graph.getSelectedCells()
      if (!selected.length) return
      if (this.formatBrushType === 'node') {
        Reflect.deleteProperty(this.nodeAttrs.attrs.text, 'text')
        this.currentCellFormatAttr = this.nodeAttrs.attrs
        this.formatBrushConnectorType = ''
      } else {
        this.formatBrushConnectorType = selected[0].getConnector() ? selected[0].getConnector()['name'] : 'rounded'
        this.currentCellFormatAttr = {}
      }
    },
    contextMenuFn(type, node) {
      switch (type) {
        case 'remove':
          if (node.type === 'edge') {
            this.graph.removeEdge(node.item.id)
          } else if (node.type === 'node') {
            this.graph.removeNode(node.item.id)
          }
          this.showContextMenu = false
          break
        case 'edit':
          break
      }
    },
    getResetGraph() {
      const graphJSON = this.graph.toJSON()
      this.graphData = JSON.parse(JSON.stringify(graphJSON)).cells
    },
    handleSaveGraph() {
      const graphJSON = this.graph.toJSON()
      localStorage.setItem('graphJSON', JSON.stringify(graphJSON))
      this.$message.success('保存成功')
    },
    handleResetGraph() {
      localStorage.removeItem('graphJSON')
      this.graph.fromJSON(jsonData)
      this.$message.success('重置成功')
    },
    // 添加节点
    startDrag(e) {
      const target = e.currentTarget
      const type = target.getAttribute('data-type')
      const node = createNode(Number(type || 1), this)
      if (node) {
        const { body, text } = node.attrs
        node.setAttrs({ body: Object.assign(body, this.defaultStyle.body), rect: Object.assign(body, this.defaultStyle.body), text: Object.assign(text, this.defaultStyle.text) })
        this.dnd.start(node, e)
      } else {
        this.$message.error('添加失败')
      }
    },
    // 新增节点
    addNode(e, item) {
      e.stopPropagation()
      const target = e.currentTarget
      const type = target.getAttribute('data-type')
      const node = createNode(Number(type || 1), this)
      if (node) {
        const { body, text } = node.attrs
        node.setAttrs({ body: Object.assign(body, this.defaultStyle.body), rect: Object.assign(body, this.defaultStyle.body), text: Object.assign(text, this.defaultStyle.text) })
        this.graph.addCell([node, createEdge(this.activeNode, node, this)])
        this.$refs['nodeDnd'].doClose()
        this.activeNode = ''
        this.activeNodeAbs = 'right'
      } else {
        this.$message.error('添加失败')
      }
      console.log(e, item)
    },
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    initEvent() {
      const { graph } = this
      const that = this
      const container = document.getElementById('container')
      graph.on('node:click', ({ node }) => {
        const disableMove = node.store.data.disableMove
        if (disableMove) {
          setWidgetToolsHidden(disableMove)
          return false
        }
        setAnimate(node.store.data.id, graph)
        this.formatBrushType = 'node'
        this.nodeAttrs = {
          attrs: node.attrs,
          nodeInfo: Object.assign({
            date: '',
            inputConditionList: [{ label: '' }],
            outputConditionList: [{ label: '' }],
            knowledgeBase: [{ label: '' }]
          }, node.store.data.attrs.text)
        }
        if (this.isFormatBrush && Object.keys(this.currentCellFormatAttr).length) {
          const { body, text } = node['attrs']
          node.setAttrs({ body: Object.assign(body, this.currentCellFormatAttr.body), rect: Object.assign(body, this.currentCellFormatAttr.body), text: Object.assign(text, this.currentCellFormatAttr.text) })
        }
      })

      graph.on('edge:click', () => {
        this.formatBrushType = 'edge'
        if (this.isFormatBrush && this.formatBrushConnectorType) {
          const selected = this.graph.getSelectedCells()
          selected.forEach(el => {
            el.setConnector && el.setConnector(this.formatBrushConnectorType)
          })
        }
      })

      graph.on('blank:click', () => {
        const selected = graph.getSelectedCells()
        if (!selected.length) {
          this.isFormatBrush = false
          this.currentCellFormatAttr = {}
          this.formatBrushConnectorType = ''
        }
      })
      graph.on('node:dblclick', ({ node }) => {
        const label = node.label
        if (label === '加载产品定价') {
          this.$router.push({ name: 'Flow', query: { id: node.id } })
        }
      })

      graph.on('edge:contextmenu', ({ e, edge }) => {
        this.showContextMenu = true
        this.$nextTick(() => {
          this.$refs.menuBar.initFn(e.offsetX, e.offsetY, { type: 'edge', item: edge })
        })
      })

      graph.on('node:contextmenu', ({ x, y, node }) => {
        this.showContextMenu = true
        this.$nextTick(() => {
          // const p = graph.localToPage(x, y)
          this.$refs.menuBar.initFn(x, y, { type: 'node', item: node })
        })
      })
      // 鼠标移入 显示连接桩
      const { FunctionExt } = window.X6
      graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
        const ports = container.querySelectorAll('.x6-port-body')
        const disableMove = node.store.data.disableMove
        this.showPorts(ports, !disableMove)
      }), 500)
      // 鼠标移出 隐藏连接桩
      graph.on('node:mouseleave', () => {
        const ports = container.querySelectorAll('.x6-port-body')
        this.showPorts(ports, false)
      })

      graph.on('node:collapse', ({ node, e }) => {
        e.stopPropagation()
        node.toggleCollapse()
        const collapsed = node.isCollapsed()
        const cells = node.getDescendants()
        cells.forEach(n => {
          if (collapsed) {
            n.hide()
          } else {
            n.show()
          }
        })
      })

      // 节点鼠标进入
      graph.on('node:mousedown', ({ node }) => {
        const disableMove = node.store.data.disableMove
        if (disableMove) {
          return false
        }
        addTools(node, that)
      })

      // 节点鼠标移除
      graph.on('node:unselected', ({ cell }) => {
        cell.removeTools()
        this.$refs['nodeDnd'].doClose()
        this.activeNode = ''
        this.activeNodeAbs = 'right'
        removeShapeEdge(that.graph)
        this.disabled = !graph.getSelectedCells().length
      })
      graph.on('node:selected', () => {
        this.disabled = !graph.getSelectedCells().length
      })
    }
  }
}
</script>
<style lang="scss" src="./index.scss"></style>
<style lang="scss" scoped>
.format-brush {
  cursor: url('https://linshengcong-cra.oss-cn-shenzhen.aliyuncs.com/format-brush.ico'), auto !important;
}
</style>
