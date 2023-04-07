<template>
  <el-popover
    v-model="viewVisible"
    popper-class="view"
    placement="bottom"
    width="200"
    trigger="click">
    <ul class="po-menu">
      <li class="po-menu-item" @click="zoom(0.1,false)">
        <div class="po-menu-item-box">
          <svg-icon icon-class="zoomin" class="po-menu-icon" />
          <span class="text">放大</span> 
          <span class="po-menu-hotkey">Alt+(+)</span>
        </div>
      </li>
      <li class="po-menu-item" @click="zoom(-0.1,false)">
        <div class="po-menu-item-box">
          <svg-icon icon-class="zoomout" class="po-menu-icon" />
          <span class="text">缩小</span> 
          <span class="po-menu-hotkey">Alt+(-)</span>
        </div>
      </li>
      <li class="devider"></li>
      <li
        v-for="item of liData"
        :key="item.value"
        class="po-menu-item"
        @click="zoom(item.value)">
        <div class="po-menu-item-box">
          <span class="text">{{ item.label }}</span>
        </div>
      </li>
      <li class="devider"></li>
      <li class="po-menu-item" @click="zoom(1)">
        <div class="po-menu-item-box">
          <span class="text">重置缩放</span>
        </div>
      </li>
    </ul>
    <span slot="reference">
      视图
    </span>
  </el-popover>
</template>
<script>
import { zoom } from '../trigger'
export default {
  data() {
    return {
      viewVisible: false,
      liData: [{
        value: 0.5,
        label: '50%'
      }, {
        value: 0.75,
        label: '75%'
      }, {
        value: 1,
        label: '100%'
      }, {
        value: 1.5,
        label: '150%'
      }, {
        value: 2,
        label: '200%'
      }]
    }
  },
  methods: {
    /**
     * @description: 放大缩小
     * @param {Number} number 放大/缩小的因子
     * @param {Boolean} absolute 为 true 时，表示将画布缩放到 factor 代表的值,否则 factor 表示放大/缩小的因子
     * @return {void}
     */    
    zoom(number, absolute = true) {
      const graph = window.graph
      zoom(number, absolute, graph)
      this.viewVisible = false
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