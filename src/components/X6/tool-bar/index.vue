<template>
  <div v-drag class="toolbar-container" draggable>
    <file-bar class="icon" />
    <edit-bar class="icon" />
    <span
      v-for="(icon, key) in tools"
      :key="key"
      class="icon"
      :title="icon.title"
      @click="handleTrigger(icon.svg)">
      <svg-icon
        :class="[
          'can' in icon && !icon.can ? 'disabled' : 'enabled',
          { freeze: icon.freeze },
        ]"
        :icon-class="icon.svg" />
    </span>

    <!-- 搜索 -->
    <span
      v-show="!freeze"
      class="icon"
      @click="handleSearchHover">
      <svg-icon
        :class="{ light: showTips }"
        style="width:16px;height:16px;cursor:pointer"
        icon-class="b_search"
        title="提示" />
    </span>

    <el-dropdown @command="commandChange">
      <span class="el-dropdown-link">
        图层排列<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="topping">
          置于顶层
        </el-dropdown-item>
        <el-dropdown-item command="bottoming">
          置于底层
        </el-dropdown-item>
        <el-dropdown-item command="up">
          上移一层
        </el-dropdown-item>
        <el-dropdown-item command="down">
          下移一层
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span
      v-show="!freeze"
      class="icon"
      @mouseenter="handleTipsHover"
      @mouseleave="handleTipsLeave">
      <svg-icon
        :class="{ light: showTips }"
        style="width:16px;height:16px;"
        icon-class="tips"
        title="提示" />
    </span>

    <transition name="fade">
      <!-- 文案提示容器 -->
      <div
        v-show="showSearch"
        class="search-container"
        @mouseleave="handleSearchLeave">
        <div>
          <el-autocomplete
            ref="myAutocomplete"
            v-model="state"
            popper-class="my-autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
            <template slot-scope="{ item }">
              <div class="name">
                {{ item.attrs.text.text }}
              </div>
            </template>
          </el-autocomplete>
        </div>  
      </div>
    </transition>

    <view-bar class="icon" />
    <span
      v-show="!interlinkage"
      class="icon"
      @mouseenter="handleTipsHover1"
      @mouseleave="handleTipsLeave1">
      <svg-icon
        :class="{ light: showType }"
        style="width:16px;height:16px;"
        icon-class="flex-node"
        title="提示" />
    </span>
    
    <transition name="fade">
      <!-- 文案提示容器 -->
      <div
        v-show="showTips"
        class="tips-container"
        @mouseenter="handleTipsHover"
        @mouseleave="handleTipsLeave">
        <div
          v-for="(content, index) in tipsContent"
          :key="index"
          class="tips-row">
          <div class="label">
            {{ content.label }}
          </div>
          <div class="value">
            {{ content.value }}
          </div>
        </div>
        <div class="arrow"></div>
      </div>
    </transition>
    
    <transition name="fade">
      <!-- 连接类型 -->
      <div
        v-show="showType"
        class="tips-container type-container"
        @mouseenter="handleTipsHover1"
        @mouseleave="handleTipsLeave1">
        <div
          v-for="(content, index) in typeContent"
          :key="index"
          class="tips-row">
          <div class="value" @click="handleTrigger('type-edge',content.value)">
            {{ content.label }}
          </div>
        </div>
        <div class="arrow"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { onPaste, selectAll, deleteCells, renewConnector } from './trigger'
import { Tools, TipsContent, typeContent } from './config.js'
import { exportChart } from './file/export/index'
import { handleFullScreen } from './fullscreen/index'
import { setLevel } from './set-level/'
import searchNode from './search/index'
import ViewBar from './view'
import FileBar from './file/export/index.vue'
import EditBar from './edit/index.vue'

export default {
  components: {
    ViewBar,
    FileBar,
    EditBar
  },
  directives: {
    drag(el) {
      const oDiv = el // 当前元素
      // let self = this // 上下文
      // 禁止选择网页上的文字
      oDiv.onselectstart = function(e) {
        if (e.target.className !== 'el-input__inner') {
          return false
        }
      }
      oDiv.onmousedown = function(e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop
        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          const t = e.clientY - disY
          // 移动当前元素
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
        }
        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        if (e.target.className !== 'el-input__inner') {
          return false
        }
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fullscreen: false,
      showSearch: false,
      showTips: false,
      timeId: null,
      restaurants: [],
      state: '',
      freeze: false,
      interlinkage: false,
      showType: false,
      tools: Tools,
      // 引导文案
      tipsContent: TipsContent,
      typeContent: typeContent
    }
  },
  mounted() {
    // 监听是否可操作
    setTimeout(() => {
      const graph = window.graph
      const _history = graph.history
      _history.on('change', () => {
        this.tools.undo.can = _history.canUndo()
        this.tools.redo.can = _history.canRedo()
      })
    }, 1000)
  },
  methods: {
    handleSearchHover() {
      this.showSearch = !this.showSearch 
      clearTimeout(this.timeId)
    },
    handleSearchLeave(delay = 500) {
      this.timeId = setTimeout(() => {
        if (this.showSearch) {
          this.$refs['myAutocomplete'].blur()
        }
        this.showSearch = false
        this.timeId = null
      }, delay)
    },
    /**
     * @name: commandChange
     * @description: 设置层级
     * @param {*} val topping 置顶 bottoming 置底 up 上移一层 down 下移一层
     * @return {*}
     */
    commandChange(val) {
      setLevel(val)
    },
    handleTipsHover() {
      this.showTips = true
      clearTimeout(this.timeId)
    },
    handleTipsLeave(delay = 500) {
      this.timeId = setTimeout(() => {
        this.showTips = false
        this.timeId = null
      }, delay)
    },
    handleSelect(item) {
      console.log(item)
      searchNode.positionNode(item.attrs.text.text)
    },
    querySearch(queryString, cb) {
      searchNode.querySearch(queryString, cb)
    },
    handleTipsHover1() {
      this.showType = true
      clearTimeout(this.timeId)
    },
    handleTipsLeave1(delay = 500) {
      this.timeId = setTimeout(() => {
        this.showType = false
        this.timeId = null
      }, delay)
    },
    handleTrigger(name, type) {
      const graph = window.graph
      switch (name) {
        // 撤销/重做
        case 'undo':
        case 'redo':
          if (this.tools[name].can) graph[name]()
          break
        case 'zoomin':
          graph.zoom(0.1)
          break
        case 'zoomout':
          graph.zoom(-0.1)
          break
        case 'copy':
          onPaste(graph)
          break
        case 'dustbin':
          deleteCells(graph)
          break
        case 'focus':
          graph.centerContent()
          break
        case 'select_all':
          selectAll(graph)
          break
        case 'file_download':
          exportChart(graph, 'PNG')
          break
        case 'flex-1':
          handleFullScreen(this, document.getElementById('graph-container'))
          break
        case 'type-edge':
          renewConnector(graph, type, this)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin set_w_h($width: 100%, $height: $width) {
  width: $width;
  height: $height;
}
.toolbar-container {
  position: fixed;
  top: 167px;
  left: 250px;
  z-index: 9999;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #DFE4E8;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(67, 75, 91, 0.2);
  display: flex;
  align-items: center;
  .icon {
    margin: 3px 20px;
    cursor: pointer;
    .svg-icon{
      width:20px;
      height: 20px;
    }
  }
  .enabled {
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
    &:hover {
      transform: scale(1.1);
      color: #333;
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .disabled {
    cursor: not-allowed;
    transition: none;
    color: #999;
    &:hover {
      transform: none;
      color: #999;
    }
    &:active {
      transform: none;
    }
  }
  .freeze {
    cursor: not-allowed;
    transition: none;
    color: #999;
    &:hover {
      transform: none;
      color: #999;
    }
    &:active {
      transform: none;
    }
  }
  .tips {
    cursor: pointer;
    color: #333;
    // margin-left: auto;
    // margin-right: 30px;
  }
  .light {
    color: #67c23a;
  }
  .search-container {
    position: absolute;
    top: 45px;
    right: 160px;
    z-index: 999;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
  }
  .tips-container {
    position: absolute;
    top: 45px;
    right: 120px;
    z-index: 999;
    @include set_w_h(300px, auto);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    text-align: justify;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
    padding: 18px 0;
    font-size: 14px;
    color: #606266;
    .arrow {
      position: absolute;
      z-index: -1;
      top: -15px;
      right: 0;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-bottom: 50px solid #fff;
    }

    // 文案容器
    .tips-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      .label {
        padding: 1px 5px;
        background-color: #5f5f61;
        border-radius: 3px;
        color: #fff;
      }
      .value {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .type-container {
    width: 120px;
    cursor: pointer;
    right: 10px;
    .value {
      padding: 3px 0;
    }
    .tips-row {
      justify-content: center;
    }
    .value:hover{
      color: #67c23a;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
