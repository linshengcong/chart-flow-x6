/**
 * Author: pengwenlei pengwenlei@pengwenlei
 * Date: 2022-10-19 09:31:48
 * LastEditors: lixiaoyi 2212884878@qq.com
 * LastEditTime: 2023-01-09 14:20:34
 */
import Vue from 'vue'
import App from './App.vue'
import VueDND from 'awe-dnd'
import './components'
import ElementUi from 'element-ui'

Vue
  .use(ElementUi, {
    size: 'medium'
  })
  .use(VueDND)

new Vue({
  render: h => h(App)
}).$mount('#vue')
