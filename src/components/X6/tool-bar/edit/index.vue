<template>
  <div>
    <el-popover
      ref="popover"
      v-model="editMenuVisible"
      placement="bottom"
      width="200"
      trigger="click">
      <FormatBrush :edit-menu-visible.sync="editMenuVisible" />
      <DefaultStyle :edit-menu-visible.sync="editMenuVisible" />
    </el-popover>
    <div v-popover:popover>
      编辑
    </div>
  </div>
</template>

<script lang="jsx">
import FormatBrush from './format-brush/index.vue'
import DefaultStyle from './defaultStyle/index.vue'


export default {
  name: 'Edit',
  components: {
    FormatBrush,
    DefaultStyle
  },
  data() {
    return {
      editMenuVisible: false
    }
  }
  // render() {
  //   return (
  //     <div>
  //       <el-popover
  //         ref="popover"
  //         placement="bottom"
  //         width="200"
  //         trigger="click"
  //       >
  //         <FormatBrush editMenuVisible={this.editMenuVisible} />
  //         <DefaultStyle editMenuVisible={this.editMenuVisible} />
  //       </el-popover>
  //       <div v-popover:popover>
  //         编辑
  //       </div>
  //     </div>
  //   )
  // }
}
</script>
