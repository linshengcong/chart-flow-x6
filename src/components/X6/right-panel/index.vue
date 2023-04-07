<template>
  <el-tabs type="border-card" style="width: 252px" @tab-click="handleClick">
    <el-tab-pane label="数据">
      <data-Panel v-if="active === '0'" :node-attrs="nodeAttrs.nodeInfo" />
    </el-tab-pane>
    <el-tab-pane label="属性">
      <property-Panel v-if="active === '1'" :attrs="nodeAttrs.attrs" />
    </el-tab-pane>
    <el-tab-pane label="画布" v-bind="$attrs">
      <tools-graph v-if="active === '2'" :graph="graph" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import dataPanel from './data-panel.vue'
import propertyPanel from './property-panel.vue'
import ToolsGraph from './graph'
export default {
  components: {
    dataPanel,
    propertyPanel,
    ToolsGraph
  },
  props: {
    nodeAttrs: {
      type: Object,
      required: true
    },
    // 画布对象
    graph: {
      type: [String, window.X6.Graph],
      required: true
    }
  },
  data() {
    return {
      active: '0'
    }
  },
  watch: {
    nodeAttrs(data) {
      console.log('nodeAttrs', data)
    }
  },
  methods: {
    handleClick({ index }) {
      console.log(index)
      this.active = index
    }
  }

}
</script>

<style>
.el-tabs--border-card>.el-tabs__content {
  padding: 0;
  height: 100%;
}
.el-tabs__nav {
  width: 100%;
}
.el-tab-pane {
  height: 100%;
}
</style>
