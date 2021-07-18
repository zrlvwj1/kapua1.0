import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'
import Welcome from './views/welcome/welcome.vue'
import Login from './views/login/login.vue'
import Roles from './views/roles/roles.vue'
import Device from './views/device/device.vue'
import Users from './views/users/users.vue'
import Subaccount from './views/subaccount/subaccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'welcome',
          component: Welcome
        },
        {
          path: 'device',
          component: Device
        },
        {
          path: 'user',
          component: Users
        },
        {
          path: 'roles',
          component: Roles
        },
        {
          path: 'setting',
          component: Home
        },
        {
          path: 'subaccount',
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
})
const VueRouterPush = Router.prototype.push

Router.prototype.push = function push(to) {

  return VueRouterPush.call(this, to).catch(err => err)

}
