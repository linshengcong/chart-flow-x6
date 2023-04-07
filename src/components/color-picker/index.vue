<script lang="jsx">
import { Sketch as sketch } from 'vue-color'
export default {
  name: 'ColorPicker',
  props: {
    // 颜色(rgba格式)
    value: {
      type: String,
      default: ''
    },
    // 颜色格式 hex：十六进制、rgba
    format: {
      type: String,
      default: 'rgba'
    },
    // 实时预览，开启后实时回传父组件，否则需点击确定同步
    livePreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      // 取消标识
      cancel: false,
      // 颜色信息
      colors: {
        a: 1,
        hex: '#FFFFFF',
        hex8: '#FFFFFFFF',
        hsl: { 'h': 0, 's': 0, 'l': 1, 'a': 1 },
        hsv: { 'h': 0, 's': 0, 'v': 1, 'a': 1 },
        rgba: { 'r': 255, 'g': 255, 'b': 255, 'a': 1 }
      },
      // 预选色列表
      presetColors: [
        '#FF0000', '#FF4C4C', '#FE8D47', '#FFC036',
        '#FFEB00', '#52C41A', '#00CB9D', '#1E86FF',
        '#1EC0FF', '#5E37E5', '#C348FF', '#E20289',
        '#003CBA', '#671717', '#000000', '#FFFFFF'
      ]
    }
  },
  watch: {
    visible: {
      handler(val) {
        const color = this.value
        // 反选颜色
        if (val && color) {
          if (this.format === 'hex') {
            // 更新十六进制颜色
            this.colors = { hex: color }
          } else {
            const arr = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(',')
            if (arr.length > 3) {
              const alpha = Number(arr[3])
              const rgba = {
                a: Number(arr[3]),
                b: Number(arr[2]),
                g: Number(arr[1]),
                r: Number(arr[0])
              }
              // 更新颜色
              this.colors = { a: alpha, rgba }
            } else {
              console.log('色码非RGBA格式，无法识别，反选颜色失败！\n', color)
            }
          }
        }
      }
    }
  },
  methods: {
    // 颜色修改
    handelChange() {
      // 提取色值 传递父组件
      const { rgba = {}, hex } = this.colors
      if (this.format === 'hex') {
        this.$emit('input', hex)
        this.$emit('change', hex)
      } else {
        // rgba格式
        const color = rgba.a && `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` || ''
        this.$emit('input', color)
        this.$emit('change', color)
      }
    }
  },
  render() {
    return <div class="color-picker-container">
      <el-popover
        v-model={this.visible}
        visibleArrow={true}
        onHide={() => !this.cancel && this.handelChange()}
        trigger="click">
        <div class="color-picker">
          <sketch v-model={this.colors} presetColors={this.presetColors} onInput={() => {
            // 实时预览
            if (this.livePreview) {
              const { rgba = {} } = this.colors
              const color = rgba.a && `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` || ''
              this.$emit('input', color)
            }
          }}/>
          <div class="footer-btn">
            <div class="btn" onClick={() => {
              this.colors = { rgba: {} }
              this.handelChange()
              this.visible = false
            }}>清空</div>
            <div class={this.livePreview ? 'btn primary' : 'btn'} onClick={() => {
              this.visible = false
              this.cancel = true
            }}>{this.livePreview ? '关闭' : '取消'}</div>
            {
              !this.livePreview && <div class="btn primary" onClick={() => {
                this.handelChange()
                this.visible = false
              }}>确定</div>
            }
          </div>
        </div>
        <div slot="reference" class="picker-handle" style={
          this.value && `background-color: ${this.value};`
        } />
      </el-popover>
    </div>
  }
}
</script>

<style lang="scss" scoped>
  .color-picker-container {
    .picker-handle {
      width: 36px;
      height: 36px;
      border: 1px solid #DFE4E8;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    .vc-sketch::v-deep {
      width: 202px;
      padding: 0;
      box-sizing: border-box;
      box-shadow: unset;
      .vc-sketch-field {
        .vc-input__input {
          border-radius: 4px;
          border: 0.5px solid #DFE4E8;
          box-shadow: unset;
        }
        .vc-input__input:focus {
          border-color: #1E86FF;
        }
      }
      .vc-sketch-presets {
        .vc-sketch-presets-color {
          width: 22px;
          height: 22px;
          margin: 0 4px 4px 0;
          border-radius: 4px;
        }
      }
    }
    .footer-btn {
      width: 100%;
      padding-top: 12px;
      padding-bottom: 4px;
      display: flex;
      justify-content: flex-end;
      .btn {
        cursor: pointer;
        color: #434B5B;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC, sans-serif;
      }
      .btn.primary {
        color: #1E86FF;
      }
      .btn + .btn {
        margin-left: 16px;
      }
    }
  }
</style>
