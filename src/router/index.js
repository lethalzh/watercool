import Vue from 'vue'
import VueRouter from 'vue-router'

import WaterCoolHome from '@/views/WaterCoolHome.vue'
import QueuePage from  '@/views/QueuePage.vue'
import Curve from '@/components/forms/TemperatureCurve.vue'
import Index from "@/views/Index.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/database_table',
    name: 'QueuePagename',
    component: QueuePage
  },


  {
    path: '/water_cool_sheet',
    name:'Curvename',
    component:Curve
  },
  {
    path: '/cooling_calculation_vue',
    component: WaterCoolHome,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: "/",
  routes
})

export default router
