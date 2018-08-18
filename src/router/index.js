import Vue from 'vue'
import Home from '../components/Home'
import Router from 'vue-router'

Vue.use(Router);

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  routes,
  mode: 'history'
})
