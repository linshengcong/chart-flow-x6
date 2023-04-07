<script lang="jsx">
export default {
  name: 'MenuBar',
  data() {
    return {
      x: '',
      y: '',
      item: {}
    }
  },
  methods: {
    initFn(x, y, item) {
      this.x = parseInt(x) + ''
      this.y = y + ''
      if (item) {
        this.item = item
      }
    },
    setItem(item) {
      this.item = item
    },
    callBack(type) {
      if (this.item.item && this.item.item.store.data.disableMove) {
        return
      }
      this.$emit('callBack', type, this.item)
    }
  },
  render() {
    return (
      <el-card
        class="box-card"
        style={{ 'left': this.x + 'px', 'top': this.y + 'px' }}
      >
        {
          this.item.type !== 'edge' && <div class="item disabled" vOn:click_stop={() => this.callBack('edit')}>
            编辑
          </div>
        }
        <div
          class={['item', { 'disabled': this.item.item && this.item.item.store.data.disableMove }]}
          vOn:click_stop={() => this.callBack('remove')}>
            删除
        </div>
      </el-card>
    )
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  position: absolute;
  z-index: 112;
}

.box-card ::v-deep .el-card__body {
  padding: 0;
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
}
.disabled {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: no-drop;
}
.item:hover {
  color: #ffffff;
  background-color: #409eff;
}

.box-card {
  width: 150px;
}
</style>
