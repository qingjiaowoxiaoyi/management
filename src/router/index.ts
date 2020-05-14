import Vue from 'vue'
import VueRouter from 'vue-router'

import ParentView from '@/components/parent-view.vue';
import Login from '@/components/Login.vue';
import Welcome from '@/components/Welcome.vue';
import Home from '@/components/Home.vue';

import Users from '@/components/users/Users.vue';
import Goods from '@/components/goods/Goods.vue';
import Params from '@/components/goods/Params.vue';
import Type from '@/components/goods/Type.vue';
import News from '@/components/news/News.vue';
import TotalChart from '@/components/chart-data/Total-chart.vue';
import orderMessage from '@/components/order/orderMessage.vue';
import CollectionTotal from '@/components/chart-data/Collection-total.vue';

import {Message} from 'view-design';

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/Welcome',
        meta: {
            icon: 'ios-phone-portrait',
            title: '首页'
         },
        children: [
            { 
              path: '/home',
              component: Welcome
            },
            {
                path: '/users',
                meta: {
                  icon: 'md-person',
                  title: '用户管理',
                },
                children:[
                    {
                        path: '/users/imformation',
                        meta:{
                            title: '用户信息'
                        },
                        component: Users
                    }
                ],
                component:ParentView
            },
            { 
                path: '/goods',
                component:ParentView,
                meta: {
                   icon: 'ios-paper',
                   title: '商品管理'
                },
                children:[
                  {
                      path: '/goods/imformation',
                      meta:{
                          title: '商品信息'
                      },
                      component: Goods
                  },
                  {
                    path: '/goods/params',
                    meta:{
                        title: '商品分类'
                    },
                    component: Params
                  },
                  {
                    path: '/goods/type',
                    meta:{
                        title: '分类参数'
                    },
                    component: Type
                  }
                ]
            },
            {
                path: '/order',
                meta: {
                  icon: 'md-reorder',
                  title: '订单信息',
                },
                component:ParentView,
                children:[
                    {
                        path: '/order/orderMessage',
                        meta:{
                            title: '订单管理'
                        },
                        component: orderMessage
                    }
                ],
            },
            {
                path: '/news',
                meta: {
                  icon: 'ios-information-circle',
                  title: '信息管理',
                },
                children:[
                    {
                        path: '/news/imformation',
                        meta:{
                            title: '文章新闻'
                        },
                        component: News
                    }
                ],
                component:ParentView
            },
            {
                path: '/chartData',
                meta: {
                  icon: 'md-trending-up',
                  title: '总数据统计',
                },
                children:[
                    {
                        path: '/chartData/TotalChart',
                        meta:{
                            title: '年度数据统计'
                        },
                        component: TotalChart
                    }
                ],
                component:ParentView
            }
            // { path: '/users', component: Users },
            // { path: '/goods', component: Goods },
            // { path: '/params', component: Params },
            // { path: '/type', component: Type },
            // { path: '/news', component: News },
            // { path: '/buyTotal', component: BuyTotal },
            // { path: '/collectionTotal', component: CollectionTotal },
        ]
    }

]

const router = new VueRouter({
    routes
})

// // 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
// router.beforeEach((to, from, next) => {
//   // 访问登录页，放行
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token, 强制跳转到登录页
//   if (!tokenStr) return next('/login')
//   next()
// })

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('tokenName');
   
      if (token === null || token === '' || token===undefined || token==='undefined') {
        (Message as any).error('登录时间过期');
        next('/login');
      } else {
        next();
      }
    }
  });

export default router
