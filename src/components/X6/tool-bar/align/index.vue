<template>
  <el-popover
    v-model="viewVisible"
    popper-class="view"
    placement="bottom"
    width="200"
    trigger="hover">
    <ul class="po-menu">
      <li
        v-for="item of typeAlignList"
        :key="item.value"
        class="po-menu-item"
        @click="handleAlign(item.value)">
        <div class="po-menu-item-box">
          <span class="text">{{ item.label }}</span>
        </div>
      </li>
      <li class="devider"></li>
      <li
        v-for="item of typeWidthAndHeightList"
        :key="item.value"
        class="po-menu-item"
        @click="handleRectMatch(item.value)">
        <div class="po-menu-item-box">
          <span class="text">{{ item.label }}</span>
        </div>
      </li>
      <li class="devider"></li>
      <li
        v-for="item of typeLockList"
        :key="item.value"
        class="po-menu-item"
        @click="handleLock(item.value)">
        <div class="po-menu-item-box">
          <span class="text">{{ item.label }}</span>
        </div>
      </li>
    </ul>
    <span slot="reference">
      对齐/匹配
    </span>
  </el-popover>
</template>
<script>
import { typeAlign, typeWidthAndHeight, typeLock } from '../config'
import { setWidgetToolsHidden } from '../trigger'
export default {
  data() {
    return {
      viewVisible: false,
      typeAlignList: typeAlign,
      typeWidthAndHeightList: typeWidthAndHeight,
      typeLockList: typeLock
    }
  },
  methods: {
    // 对齐方式
    handleAlign(alignType) {
      const selectArea = []
      // 获取框选的节点
      const graph = window.graph
      const selected = graph.getSelectedCells()
      if (selected.length < 2) {
        return false
      }
      selected.map(item => {
        const { position, size, id } = item.store.data
        const { x, y } = position
        const { width, height } = size
        // 拿到需要的数据 x y width height id push到一个临时数组里面
        selectArea.push({ x, y, width, height, id })
      })
      // 左对齐
      if (alignType === 'left') {
        // 拿到最小的x值
        const minX = Math.min.apply(Math, selectArea.map(function(item) { return item.x }))
        // 拿到最小的x值对应数据的id
        const minId = selectArea.reduce((p, v) => p.x > v.x ? v : p).id
        // 需要左对齐的
        const needAlignLeftList = selectArea.filter(el => { return el.id !== minId })
        // 设置左对齐
        selected.map(node => {
          needAlignLeftList.map(ele => {
            if (node.id === ele.id) {
              node.position(minX, ele.y).resize(ele.width, ele.height)
            }
          })
        })
      }
      if (alignType === 'mid' || alignType === 'right') {
        // 拿到最长的width值
        const maxWidth = Math.max.apply(Math, selectArea.map(function(item) { return item.width }))
        // 拿到最长的width值对应数据的id
        const maxWidthId = selectArea.reduce((p, v) => p.width < v.width ? v : p).id
        // 拿到最长的width值对应数据的x
        const maxWidthX = (selectArea.find(el => { return el.id === maxWidthId }) || {}).x
        // 需要右或者居中对齐的
        const needAlignList = selectArea.filter(el => { return el.id !== maxWidthId })
        // 设置右或者居中对齐
        selected.map(node => {
          needAlignList.map(ele => {
            if (node.id === ele.id) {
              const positionX = alignType === 'right' ? maxWidthX + maxWidth - ele.width :
                alignType === 'mid' ? maxWidthX + (maxWidth - ele.width) / 2 :
                  ele.x
              node.position(positionX, ele.y).resize(ele.width, ele.height)
            }
          })
        })
      }
    },
    // 匹配方式
    handleRectMatch(type) {
      const selectArea = []
      // 获取框选的节点
      const graph = window.graph
      const selected = graph.getSelectedCells()
      if (selected.length < 2) {
        return false
      }
      selected.map(item => {
        const { position, size, id } = item.store.data
        const { x, y } = position
        const { width, height } = size
        // 拿到需要的数据 x y width height id push到一个临时数组里面
        selectArea.push({ x, y, width, height, id })
      })
      // 宽度匹配
      if (type === 'width') {
        // 拿到最长的width值
        const maxWidth = Math.max.apply(Math, selectArea.map(function(item) { return item.width }))
        // 拿到最长的width值对应数据的id
        const maxWidthId = selectArea.reduce((p, v) => p.width < v.width ? v : p).id
        const needWidthMatchList = selectArea.filter(el => { return el.id !== maxWidthId })
        selected.map(node => {
          needWidthMatchList.map(ele => {
            if (node.id === ele.id) {
              node.position(ele.x, ele.y).resize(maxWidth, ele.height)
            }
          })
        })
      }
      // 高度匹配
      if (type === 'height') {
        // 拿到最长的height值
        const maxHeight = Math.max.apply(Math, selectArea.map(function(item) { return item.height }))
        // 拿到最长的height值对应数据的id
        const maxHeightId = selectArea.reduce((p, v) => p.height < v.height ? v : p).id
        const needHeightMatchList = selectArea.filter(el => { return el.id !== maxHeightId })
        selected.map(node => {
          needHeightMatchList.map(ele => {
            if (node.id === ele.id) {
              node.position(ele.x, ele.y).resize(ele.width, maxHeight)
            }
          })
        })
      }
      // 高度匹配
      if (type === 'widthAndHeight') {
        // 拿到最长的width值
        const maxWidth = Math.max.apply(Math, selectArea.map(function(item) { return item.width }))
        // 拿到最长的height值
        const maxHeight = Math.max.apply(Math, selectArea.map(function(item) { return item.height }))
        selected.map(node => {
          const { position } = node.store.data
          const { x, y } = position
          node.position(x, y).resize(maxWidth, maxHeight)
        })
      }
    },

    // 锁定、解锁
    handleLock(lockStr) {
      const graph = window.graph
      const selected = graph.getSelectedCells()
      selected.map(cell => {
        if (cell.store.data && cell.store.data.disableMove) {
          setWidgetToolsHidden(cell.store.data.disableMove)
        }
        Object.assign(cell.store.data || {}, { disableMove: lockStr === 'lock' })
        lockStr === 'lock' && cell.removeTools()
      })
      setWidgetToolsHidden(lockStr === 'lock')
      graph.lockSelectdList = selected
    }
  }
}
</script>
<style lang="scss" scoped>
.po-menu{
  background: #fff;
  border: #e9edf2;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 2px;
  color: #212930;
  font-size: 14px;
  margin: -12px;
  .devider{
    height: 0;
    border-top: 1px solid #e9edf2;
    margin: 4px;
  }
  &-item{
    padding: 0 4px;
    position: relative;
    margin-bottom: 2px;
    &-box{
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      cursor: pointer;
      padding-left: 36px;
      padding-right: 8px;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &:hover{
        background-color: #f3f5f9;
      }
      .po-menu-icon{
        position: absolute;
        left: 8px;
        width: 18px;
        height: 18px;
      }
     .po-menu-hotkey {
        padding-left: 32px;
        color: #a6b9cd;
        font-size: 12px;
      }
    }
  }
}
</style>