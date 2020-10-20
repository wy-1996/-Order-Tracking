// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
      ak: 'xW4Ta7tQMbyLUMmbs4VTt6jMcapNCKvf'
})

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import wx from 'weixin-js-sdk'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.bus = new Vue;
Vue.prototype.wx=wx;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
