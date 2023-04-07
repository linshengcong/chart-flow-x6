<script lang="jsx">
import ColorPicker from '@/components/color-picker'
export default {
  props: {
    // 画布对象
    graph: {
      type: [String, window.X6.Graph],
      required: true
    }
  },
  data() {
    return {
      // 背景颜色
      bgColor: 'rgba(255,255,255,1)',
      // 画布自定义尺寸默认值
      measurementSizes: 1,
      // 画布自定义尺寸
      measurement: [{
        id: 1,
        value: {
          width: 1500,
          height: 2100
        },
        label: 'A3尺寸(1500px*2100px)'
      }, {
        id: 2,
        value: {
          width: 1050,
          height: 1500
        },
        label: 'A4尺寸(1050px*1500px)'
      }, {
        id: 3,
        value: {
          width: 750,
          height: 1050
        },
        label: 'A5尺寸(750px*1050px)'
      }],
      // 画布大小
      grapSizes: {
        width: 1500,
        height: 2100
      },
      // 显示网格
      grid: {
        size: 10, // 网格大小 10px
        sizeValue: 10,
        sizeData: [{
          value: 10,
          label: '小'
        }, {
          value: 15,
          label: '正常'
        }, {
          value: 20,
          label: '大'
        }, {
          value: 30,
          label: '很大'
        }],
        visible: true // 渲染网格背景
      }
    }
  },
  mounted() {
    if (this.graph) {
      this.grid.size = this.graph.getGridSize()
      this.grid.visible = this.graph.grid.grid.visible
      const { clientHeight, clientWidth } = this.graph.container
      this.grapSizes = {
        width: clientWidth,
        height: clientHeight
      }
      this.bgColor = document.querySelector('.x6-graph-background').style.backgroundColor
    }
  },
  render() {
    return <div class="graph-container">
      <div class="flex bgColor">
        <div class="title">背景颜色</div>
        <ColorPicker 
          style={{ width: '36px', flex: 'initial' }}
          v-model={this.bgColor} 
          onInput={val => 
            this.graph.drawBackground({ color: val })
          } >
        </ColorPicker>
      </div>
      <div class="flex">
        <el-select
          v-model={this.measurementSizes}
          placeholder="请选择"
          onChange={val => {
            const item = this.measurement.find(ele => ele.id === val)
            this.grapSizes.width = item.value.width
            this.grapSizes.height = item.value.height
            this.graph.resize(this.grapSizes.width, this.grapSizes.height)
          }}>
          {
            Array.isArray(this.measurement) && this.measurement.map((item, index) => {
              return <el-option key={index} label={item.label} value={item.id}/>
            })
          }
        </el-select>
      </div>
      <div class="flex">
        <el-input
          type="number"
          value={this.grapSizes.width}
          min={0}
          onInput={val => {
            this.grapSizes.width = Math.round(Number(val)) || 0
            this.graph.resize(this.grapSizes.width, this.grapSizes.height)
          }}>
          <span slot="suffix" class="icon">W</span>
        </el-input>
        <div style={{ width: '20px', flex: 'initial' }}></div>
        <el-input
          type="number"
          value={this.grapSizes.height}
          min={0}
          onInput={val => {
            this.grapSizes.height = Math.round(Number(val)) || 0
            this.graph.resize(this.grapSizes.width, this.grapSizes.height)
          }}>
          <span slot="suffix" class="icon">H</span>
        </el-input>
      </div>
      <div class="devider"></div>
      <div class="flex">
        <el-checkbox 
          v-model={this.grid.visible}
          onChange={val => {
            val ? this.graph.showGrid() : this.graph.hideGrid()
          }}>显示网格</el-checkbox>
      </div>
      <div class="flex">
        <div class="label">网格大小</div>
        <el-select
          v-model={this.grid.sizeValue}
          placeholder="请选择"
          onChange={val => {
            this.grid.size = Number(val)
            this.graph.setGridSize(this.grid.size)
          }}>
          {
            Array.isArray(this.grid.sizeData) && this.grid.sizeData.map((item, index) => {
              return <el-option key={index} label={item.label} value={item.value}/>
            })
          }
        </el-select>
      </div>
      <div class="flex">
        <div class="label">网格尺寸</div>
        <el-input
          type="number"
          value={this.grid.size}
          min={0}
          onInput={val => {
            this.grid.size = Number(val)
            if (val >= 10 && val < 20) {
              this.grid.sizeValue = 10
            } else if (val >= 20 && val < 30) {
              this.grid.sizeValue = 20
            } else if (val >= 30) {
              this.grid.sizeValue = 30
            } else if (!val) {
              this.grid.size = 0
            }
            this.graph.setGridSize(this.grid.size)
          }}>
          <span slot="suffix" class="icon">px</span>
        </el-input>
      </div>
      <div class="devider"></div>
    </div>
  }
}
</script>
<style lang="scss" scoped>
.graph-container{
  width: 100%;
  height: 100%;
  // position: fixed;
  // right:0;
  // top: 0;
  // z-index: 999;
  background: #fff;
  padding: 20px;
  .devider{
    height: 0;
    border-top: 1px solid #e9edf2;
    margin: 4px -20px;
  }
  .flex::v-deep{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 32px;
    margin-bottom: 12px;
    > * {
      flex: 1;
    }
    .title {
      font-weight: bold;
    }
    .el-input__inner{
      width:100%;
    }
    .el-input__suffix{
      display: flex;
      align-items: center;
    }
  }
}
</style>
