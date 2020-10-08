import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/components/Login')
const Home = () => import('@/components/Home')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
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
