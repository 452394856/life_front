import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Index from '@/components/index/index.vue'
import ShowTab from '@/components/index/children/showTab.vue'
import ShowAdd from '@/components/index/children/showAdd.vue'
import ShowTotal from '@/components/index/children/showTotal.vue'
import ShowMy from '@/components/index/children/showMy.vue'
import Test from '@/components/test/Test-main.vue'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [{
        path: 'tab',
        name:'tab',
        component: ShowTab
      },{
        path: 'add',
        name:'add',
        component: ShowAdd
      },{
        path: 'total',
        name:'total',
        component: ShowTotal
      },{
        path: 'my',
        name:'my',
        component: ShowMy
      }]
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
});
//判断是否登录，以及token是否过期
router.beforeEach((to, from, next) => {

  if (to.path != '/' && to.path != '') {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let time = Math.ceil((new Date()).valueOf() / 1000) + 200;
    if (userInfo == undefined || userInfo.token == undefined || time > userInfo.time) {
      alert('登录过期，请重新登录');
      next({path: '/'});
    }
  }
  next()   // 进行下一个钩子函数
});
export default router;
