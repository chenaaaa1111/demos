import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log('导航守卫在看门', to)
  // ...

  if (to.path === '/login') {
    // 如果访问的是login页面，直接放行，也就是任何人不管有没有登录
    // 都可以访问登录页面
    // 直接调用 next() 方法，表示：访问的是哪个页面，就展示这个页面的内容
    next()
  } else {
    // 访问的不是登录页面

    // 判断用户是否登录成功，
    // 1 当用户登录成功，直接调用 next() 方法放行
    // 2 当用户没有登录，应该调用 next('/login') 跳转到登录页面，让用户登录

    // 通过登录成功时候保存的token，来作为有没有登录成功的条件
    const token = localStorage.getItem('token')
    if (token) {
      // 有，登录成功
      next()
    } else {
      // 没有，登录失败
      next('/login')
    }
  }
})
// router.beforeEach((to, from, next) => {
  
//   //NProgress.start();
  
//   // if (to.path == '/login') {
//   //   sessionStorage.removeItem('user');
//   // }
//   // let user = JSON.parse(sessionStorage.getItem('user'));
//   // if (!user && to.path != '/login') {
//   //   next({ path: '/login' })
//   // } else {
//   //   next()
//   // }
//   let token = window.localStorage.getItem('token') 
//   if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// })
axios.interceptors.request.use(function(config) {
  // 在请求发送之前做一些事情
  // endsWith 字符串的方法,用来判断是不是以参数为结尾,如果是返回值为true

  // 判断如果是登录接口,就不需要添加 Authorization 请求头
  if (!config.url.endsWith('/login')) {
    // config.headers = localStorage.getItem('token')
     config.headers = {
    token: localStorage.getItem('token')
  }
  }

  return config
})



new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

