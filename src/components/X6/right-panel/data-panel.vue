<template>
  <div class="data-panel">
    <div class="base-info">
      <div class="title">
        基本信息
      </div>
      <div class="date-bar" style="display: flex">
        <i class="el-icon-date"></i>
        <el-date-picker
          v-model="nodeInfo.date"
          value-format="yyyy-MM-dd"
          style="width: 180px; border: none"
          type="date"
          placeholder="请选择日期"
          @change="handleInput" />
      </div>
      <div class="user-info">
        <svg-icon class="svg" icon-class="access" />
        <div class="name">
          {{ nodeInfo.name || '江泽旭' }}
        </div>
        <div class="name">
          {{ nodeInfo.job ? `(${nodeInfo.job})` : '(产品经理)' }}
        </div>
      </div>
    </div>

    <div class="base-info">
      <div class="title">
        <div class="txt">
          输入条件
        </div>
        <div class="add" @click="nodeInfo.inputConditionList.push({label: ''})">
          添加
        </div>
      </div>
      <div v-for="(item, index) in nodeInfo.inputConditionList" :key="index">
        <el-input
          v-model="item.label"
          class="input inputCondition"
          placeholder="选择输入条件"
          @input="handleInput"
          @keyup.enter.native="handleAddNewRow(nodeInfo.inputConditionList, index)" />
      </div>
    </div>

    <div class="base-info">
      <div class="title">
        <div class="txt">
          输出条件
        </div>
        <div class="add" @click="nodeInfo.outputConditionList.push({label: ''})">
          添加
        </div>
      </div>

      <div v-for="(item, index) in nodeInfo.outputConditionList" :key="index">
        <el-input
          v-model="item.label"
          class="input outputCondition"
          placeholder="按回车快速新建"
          @input="handleInput"
          @keyup.enter.native="handleAddNewRow(nodeInfo.outputConditionList, index)" />
      </div>
    </div>

    <div class="base-info">
      <div class="title">
        <div class="txt">
          知识
        </div>
        <div class="add" @click="nodeInfo.knowledgeBase.push({label: ''})">
          添加
        </div>
      </div>
      <div v-for="(item, index) in nodeInfo.knowledgeBase" :key="index">
        <el-input
          v-model="item.label"
          class="input knowledgeBase"
          placeholder="选择知识"
          @input="handleInput"
          @keyup.enter.native="handleAddNewRow(nodeInfo.knowledgeBase, index)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataPanel',
  props: {
    nodeAttrs: {
      type: Object,
      default: () => {
        return { job: '项目客服经理', name: '江泽旭', date: '2023-04-05' }
      }
    }
  },
  data() {
    return {
      nodeInfo: {
        date: null,
        inputConditionList: [{ label: '' }],
        outputConditionList: [{ label: '' }],
        knowledgeBase: [{ label: '' }]
      }
    }
  },
  watch: {
    nodeAttrs: {
      handler(data) {
        Object.assign(this.nodeInfo, data)
      },
      deep: true
    }
  },
  methods: {
    // TODO 切换焦点
    handleAddNewRow(item, index) {
      item.splice(index + 1, 0, {})
    },
    handleInput() {
      if (!window.graph.getSelectedCells().length) return false
      window.graph.getSelectedCells()[0].setAttrs({ text: this.nodeInfo })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-panel{
  position: relative;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  & > div {
    margin-bottom: 10px;
  }

  .user-info {
    display: flex;
    align-items: center;

    .access {
      margin-right: 10px;
    }
  }
  .base-info {
    &:nth-child(1) .title {
      border-top: none;
    }
  }
  .title {
    padding: 20px;
    height: 50px;
    background-color: #f8f9fb;
    border: 1px solid #ccc;
    border-left: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;

    .add {
      color: #4675e5;
      cursor: pointer;
    }
  }

  .date-bar {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    i {
      color: #3d87f7;
      margin-right: 10px;
    }
  }

  .user-info {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;

    .svg {
      margin-right: 10px;
    }
  }

  .input {
    padding: 10px 10px 0;
  }
}
</style>