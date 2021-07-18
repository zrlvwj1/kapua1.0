import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/global.css'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://exam.etao.net:8081/v1/'; //设置请求的基本地址
Vue.prototype.$http = axios  //挂在到vue原型对象上
//引入字体图标
import '../public/iconfont/iconfont.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
