import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'

import SystemPermission from '@/components/modules/system/SystemPermission.vue'
import SystemRole from '@/components/modules/system/SystemRole.vue'
import SystemUser from '@/components/modules/system/SystemUser.vue'

import MessageSystem from '@/components/modules/message/MessageSystem.vue'
import MessageMine from '@/components/modules/message/MessageMine.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/system/permission',
      name: '权限管理',
      component: SystemPermission
    },
    {
      path: '/system/role',
      name: '角色管理',
      component: SystemRole
    },
    {
      path: '/system/user',
      name: '用户管理',
      component: SystemUser
    },
    {
      path: '/message/system',
      name: '系统消息',
      component: MessageSystem
    },
    {
      path: '/message/mine',
      name: '我的消息',
      component: MessageMine
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
