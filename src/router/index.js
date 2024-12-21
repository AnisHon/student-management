import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import {ADMIN, PUBLIC, STUDENT, TEACHER} from "@/api/auth/auth.js";
import NProgress from 'nprogress'   // 导入 nprogress


export const constRouters = [
    {
      path: '/',
      component: Layout,
      name: 'index',
      redirect: '/home',
      meta: {
        title: "",
        login: true
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/index'),
          meta: {
            title: "首页",
            role: PUBLIC,
            icon: 'HomeFilled'
          }
        },
        {
          path: 'student',
          name: 'Student',
          meta: {
            title: "学生服务",
            role: STUDENT,
            icon: "Checked"
          },
          children: [],
        },
        {
          path: 'teacher',
          name: 'Teacher',
          meta: {
            title: "教师管理",
            role: TEACHER,
            icon: "UserFilled",
          },
          children: [],
        },
        {
          path: 'system',
          meta: {
            title: "教务管理",
            role: ADMIN,
            icon: "Menu"
          },
          children: [
            {
              path: 'user',
              component: () => import('@/views/system/user'),
              meta: {
                title: "用户管理"
              }
            }
          ]
        },

      ]
    },
  {
    path: '/account',
    name: 'Account',
    redirect: 'login',
    meta: {
      login: false
    },
    children: [
      {
        path: "login",
        name: 'Login',
        meta: {
          title: "登录"
        }
      },
      {
        path: "register",
        name: 'Register',
        meta: {
          title: "注册"
        }
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404页面未找到',
      login: false
    }
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '禁止访问',
      login: false
    }
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constRouters
})


router.beforeEach((to, from, next) => {

  NProgress.start();

  next();
  NProgress.done();
})


export default router
