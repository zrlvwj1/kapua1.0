import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'
import Welcome from './views/welcome/welcome.vue'
import Login from './views/login/login.vue'
import Roles from './views/roles/roles.vue'
import Device from './views/device/device.vue'
import Users from './views/users/users.vue'
import Setting from './views/setting/Setting.vue'
import Subaccount from './views/subaccount/subaccount.vue'

Vue.use(Router)
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/device',
        component: Device
      },
      {
        path: '/user',
        component: Users
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/setting',
        component: Setting
      },
      {
        path: '/subaccount',
        component: Subaccount
      }
    ]
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/login',
    component: Login
  }
]
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})
router.beforeEach((to, from, next) => {
  // // 如果去的是login页面 直接放
  if (to.path === '/login') next()
  // 否则需要验证token
  else {
    const nToken = window.localStorage.getItem('token')
    if (!nToken) {
      return next('/login')
    }
    next()
    // if (!nToken) return next('/login')
    // next()
  }
})
const VueRouterPush = Router.prototype.push

Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
export default router
