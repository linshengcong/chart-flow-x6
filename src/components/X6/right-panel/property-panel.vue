<template>
  <div class="property-panel">
    <div class="item">
      <div class="title">
        填充
      </div>
      <div class="content">
        <div class="txt">
          背景颜色
        </div>
        <div class="backgroundColor" :style="{backgroundColor: attrs.body.fill}">
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">
        线条
      </div>
      <div class="content">
        <div class="txt">
          边框颜色
        </div>
        <div class="backgroundColor" :style="{backgroundColor: attrs.body.stroke}">
        </div>
      </div>
      <div class="content">
        <div class="txt">
          线条宽度
        </div>
        <div class="txt">
          {{ attrs.body.strokeWidth + 'px' }}
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">
        文本
      </div>
      <div class="content">
        <div class="txt">
          字体颜色
        </div>
        <div class="backgroundColor" :style="{backgroundColor: attrs.text.fill}">
        </div>
      </div>
      <div class="content">
        <div class="txt">
          字体大小
        </div>
        <div class="txt">
          {{ attrs.text.fontSize + 'px' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyPanel',
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {
          body: {
            fill: '#ffffff', // 背景颜色
            stroke: '#5F95FF', // 边框颜色
            strokeWidth: 1 // 边框粗细
          }
        }
      }
    }
  },
  watch: {
    attrs: {
      handler(data) {
        console.log('data', data)
      },
      deep: true,
      immediate: true
    }
  }
  // data() {
  //   return {
  //     attrs: {
  //       body: {
  //         fill: '#2ECC71', // 背景颜色
  //         stroke: '#000', // 边框颜色
  //         strokeWidth: 1 // 边框粗细
  //       }
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.property-panel {
  background-color: #f6f7f8;
  height: 100%;

  .item {
    padding: 10px;

    .title {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .content {
      display: flex;
      justify-content: space-between;
      align-self: center;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      margin-bottom: 5px;
    }
  }

  .backgroundColor {
    width: 30px;
    height: 20px;
    background: #000;
  }
}
</style>
