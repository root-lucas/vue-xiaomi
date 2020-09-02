import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
// 设置全局函数及变量
Vue.prototype.$axios = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
