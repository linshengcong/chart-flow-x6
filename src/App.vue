<template>
  <div class="flows">
    <el-button type="primary" plain @click="flowSubmit()">
      提交
    </el-button>
    <!-- 流程图 -->
    <div class="flow-content">
      <flow-edit />
    </div>
  </div>
</template>

<script>
import FlowEdit from '@/components/X6/index.vue'
export default {
  name: 'Flow',
  // 注册draggable组件
  components: {
    FlowEdit
  },
  methods: {
    /**
     * @description: 按钮事件
     * @param {Number} number 事件类型
     * @return {void}
     */
    // 获取流程图数据保存
    flowSubmit() {
      if (window.graph) {
        const graphJSON = window.graph.toJSON()
        // if (this.$route.query.id) {
        //   localStorage.setItem('graphJSON2', JSON.stringify(graphJSON))
        // } else {
        localStorage.setItem('graphJSON', JSON.stringify(graphJSON))
        // }
        this.$message.success('保存成功')
      } else {
        this.$message.error('保存失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flows {
  padding: 20px 20px 0;
  .flow-content {
    margin-top: 20px;
    height: calc(100vh - 170px);
    overflow: hidden;
  }
}
</style>
