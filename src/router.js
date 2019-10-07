import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from '@/components/Login'
import About from '@/views/About'
import Dashboard from '@/components/DashBoard'
import Calendar from '@/components/Calendar'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /* {
      path: '/',
      name: 'home',
      component: Home
    }, */
    {
      path: '/',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
