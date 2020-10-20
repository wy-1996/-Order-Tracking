import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shipment from '@/pages/Shipment'
import Index from '@/pages/Index'
import centered from '@/components/personage/centered'
import personal from '@/components/personage/personal'
import orders from '@/components/personage/orders'
import near from '@/components/personage/near'
import nearDemo from '@/components/personage/nearDemo'
import Business from '@/components/personage/Business'
import Demo from '@/components/personage/Demo'


Vue.use(Router)

//设置游览器标题
// Vue.directive({
//   inserted: function(el,binding){
//   document.title = el.dataset.title
//   }
//   })
// router.beforeEach((to,from,next)=>{//beforeEach是router的钩子函数，在进入路由前执行
//   if(to.meta.title){//判断是否有标题
//   document.title = to.meta.title
//   }
//   next() //执行进入路由，如果不写就不会进入目标页
//   })

const router = new Router({
  mode: 'history',  //去掉url中的#
  base: '/',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/centered',
      name: 'centered',
      meta: { title: "个人中心" },
      component: centered
    },
    {
      path: '/personal',
      name: 'personal',
      meta: { title: "我的订单" },
      component: personal
    },
    {
      path: '/orders',
      name: 'orders',
      meta: { title: "订单详情" },
      component: orders
    },
    {
      path: '/near',
      name: 'near',
      meta: { title: "附近设备" },
      component: near
    },
    {
      path: '/nearDemo',
      name: 'nearDemo',
      meta: { title: "附近设备" },
      component: nearDemo
    },
    {
      path: '/Demo',
      name: 'Demo',
      meta: { title: "附近设备" },
      component: Demo
    },
    {
      path: '/Business',
      name: 'Business',
      meta: { title: "关于我们" },
      component: Business
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/shipment',
      name: 'Shipment',
      component: Shipment
    },



  ]

})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行

  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next() //执行进入路由，如果不写就不会进入目标页
})
export default router