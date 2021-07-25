import Vue from 'vue'
import VueRouter from 'vue-router'

import ERC20WithPermit from '../views/ERC20WithPermit.vue'
import EIP1559 from '../views/EIP1559.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ERC20WithPermit.sol',
    name: 'ERC20WithPermit.sol',
    component: ERC20WithPermit,
  },
  {
    path: '/EIP1559',
    name: 'EIP1559',
    component: EIP1559,
  },
]

const router = new VueRouter({
  routes
})

export default router
