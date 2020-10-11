import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: () => import('@/components/Home'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/components/Welcome')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/components/user/Users')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/components/roles/Roles')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('@/components/rights/Rights')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/components/goods/Goods')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@/components/params/Params')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/components/categories/Categories')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('@/components/orders/Orders')
      },
      {
        path: '/reports',
        name: 'reports',
        component: () => import('@/components/reports/Reports')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // 如果将要访问的页面是登录页面，则直接放行
  if(to.path === '/login') return next()
  // 获取 token
  const token = window.sessionStorage.getItem('token')
  // token 为空，则表示没有登录，跳转到登录页面
  if(!token) return next('/login')
  // 前面都没有拦截，则表示 token 不为空，直接放行
  next()
})

export default router
