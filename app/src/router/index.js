import Vue from 'vue'
import VueRouter from 'vue-router'
import Permit from '../views/Permit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/permit',
    name: 'Permit',
    component: Permit,
  },
]

const router = new VueRouter({
  routes
})

export default router
