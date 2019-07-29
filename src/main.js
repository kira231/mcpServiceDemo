import Vue from 'vue'
import App from './App'
import router from './router'
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import echarts from "echarts";
import './static/css/app.css'
import './static/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
