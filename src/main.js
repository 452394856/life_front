// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css'
import store from '@/store/store'
import { ToastPlugin ,DatetimePlugin } from 'vux'

// Vue.use(Mint);
Vue.use(ToastPlugin );
Vue.use(DatetimePlugin );

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
