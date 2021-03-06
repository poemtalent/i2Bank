import { createRouter, createWebHistory } from '@ionic/vue-router';
 import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/fund1/fund1.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/myself/myself.vue')
      }
    ]
  },
      {
        path:'/productdetail',
        component: () =>import('@/views/productdetail/productdetail.vue')
      },
    {

        path:'/buy',
        component: () =>import('@/views/buy/buy.vue')
    },
    {

        path: '/test',
        name: 'test',
        component: () => import('@/views/test.vue')
    },
    {

        path:'/successed',
        component: () =>import('@/views/successed/successed.vue')
    },
    {
        path:'/buyed',
        component: () =>import('@/views/buyed/buyed.vue')
    },
    {
        path:'/buydetails',
        component: () =>import('@/views/buydetails/buydetails.vue')
    },
    {
        path:'/sell',
        component: () =>import('@/views/sell/sell.vue')
    },
    {
        path:'/sellSuccessed',
        component: () =>import('@/views/sellSuccessed/successed.vue')
    },
    {
        path:'/personal',
        component: () =>import('@/views/personal/personal.vue')
    },
    {
        path:'/cardList',
        component: () =>import('@/views/cardList/cardList.vue')
    },
    {
        path:'/credit',
        component: () =>import('@/views/credit/credit.vue')
    },
    {
        path: '/total',
        component: () => import('@/views/total/assets.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        component: () => import('@/views/Register.vue')
    },

    {
        path: '/myAccount',
        component: () => import('@/views/MyAccount.vue')
    },
    {
        path: '/firstAccount',
        name: 'First',
        component: () => import('@/components/FirstAccount.vue')
    },
    {
        path: '/eAccount',
        name: 'Electronic',
        component: () => import('@/components/EAccount.vue')
    },
    {
        path: '/openAccount',
        name: 'OpenAccount',
        component: () => import('@/views/OpenAccount.vue')
    },
    {
        path: '/settingPassword',
        name: 'SettingPassword',
        component: () => import('@/views/SettingPassword.vue')
    },
    {
        path: '/bindCard',
        name: 'BindCard',
        component: () => import('@/views/BindCard.vue')
    },
    {
        path: '/keyBoard',
        name: 'KeyBoard',
        component: () => import('@/components/KeyBoard.vue')
    },
    {
        path: '/withdraw',
        name: 'Withdraw',
        component: () => import('@/views/Withdraw.vue')
    },
    {
        path: '/recharge',
        name: 'Recharge',
        component: () => import('@/views/Recharge.vue')
    },
    {
        path: '/transfer',
        name: 'Transfer',
        component: () => import('@/views/TransferAccount.vue')
    },
    {
        path: '/success',
        name: 'Success',
        component: () => import('@/views/Success.vue')
    },
    {
        path: '/userRecords',
        name: 'UserRecords',
        component: () => import('@/views/TrsancsionRecords.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
