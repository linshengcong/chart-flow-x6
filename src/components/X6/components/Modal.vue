<template>
  <transition name="modal">
    <div v-if="show">
      <div class="cus-flexd"></div>
      <div class="cus-modal">
        <div class="header">
          <slot name="header" class="tset">
            {{ title }}
          </slot>
          <div class="close" @click="close">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      required: true,
      type: Boolean,
      default() {
        return false
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.6s;
  transform: translateX(110%);
}
.modal-enter-to {
  transform: translateX(0);
}
.cus-flexd {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1999;
}
.cus-modal {
  width: 600px;
  outline: none;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  background-color: #ffffff;
  box-shadow: 3px 3px 14px 0 #888888;
  .header {
    // flex: 0 0 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    // font-size: 20px;
    font-size: 15px;
    color: #333333;
    font-weight: 600;
    border-bottom: 1px solid #e3e3e3;
    .close {
      position: relative;
      left: 80%;
      cursor: pointer;
      .el-icon-close {
        line-height: 40px;
        font-size: 26px;
      }
    }
  }
  .content {
    padding: 10px 20px;
    margin-right: 4px;
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #a3a3a3;
    }
  }
  .footer {
    // flex: 0 0 80px;
    flex: 0 0 40px;
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #e3e3e3;
  }
}
</style>
