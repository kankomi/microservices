import Vue from 'vue'
import Router from 'vue-router'
import ContainerList from '@/components/ContainerList'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'ContainerList',

    component: ContainerList

  }]
})
