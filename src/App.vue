<!--
 * @Author: lixiaoyi 2212884878@qq.com
 * @Date: 2023-03-21 14:17:26
 * @LastEditors: lixiaoyi 2212884878@qq.com
 * @LastEditTime: 2023-03-22 15:42:12
-->
<template>
  <div class="flows">
    <el-form
      ref="flowForm"
      :model="ruleForm"
      :rules="rules"
      label-width="0">
      <el-button type="primary" plain @click="handlerActive(3)">
        提交
      </el-button>
    </el-form>

    <!-- 流程图 -->
    <div class="flow-content">
      <flow-edit />
    </div>
  </div>
</template>
<script>
import FlowEdit from './components/X6/index.vue'
export default {
  name: 'Flow',
  components: {
    FlowEdit
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        input1: '深圳中海汇德里',
        input2: '组织加载启动评审',
        input3: '充分拉通，一旦确定，后期不随意更改'
      },
      // 表单验证规则
      rules: {
        input1: [{ required: true, message: '不能为空', trigger: 'blur' }],
        input2: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 显示输入框
    handlerTag() {
      this.$message.success('添加标签')
    },
    /**
     * @description: 按钮事件
     * @return {void}
     */
    handlerActive() {
      this.flowSubmit()
    },
    // 获取流程图数据保存
    flowSubmit() {
      if (window.graph) {
        const graphJSON = window.graph.toJSON()
        console.log('graphJSON', graphJSON)
        localStorage.setItem('graphJSON', JSON.stringify(graphJSON))
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
  .flowForm {
    padding: 20px 20px 0;
    border: 1px solid #eee;
    .tags {
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding: 0;
      }
    }

    .el-col {
      .el-form-item::v-deep {
        width: 100%;
        .label {
          width: 65px;
          display: inline-block;
        }
        &.is-required {
          .el-form-item__content::before {
            content: '*';
            color: #f56c6c;
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
  .flow-content {
    margin-top: 20px;
    height: calc(100vh - 170px);
    overflow: hidden;
  }
}
</style>