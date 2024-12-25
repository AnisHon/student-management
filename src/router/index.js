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
            leaf: true,
            icon: 'HomeFilled'
          },
          children: [
            {
              path: "article-preview",
              name: "ArticlePreview",
              component: () => import("@/components/RecentNotification/Notification.vue"),
              meta: {
                name: "文章预览",
                hidden: true
              }
            }
          ]
        },
        {
          path: 'student',
          name: 'Student',
          meta: {
            title: "学生服务",
            role: STUDENT,
            icon: "Checked"
          },
          children: [
            {
              path: 'score',
              name: 'Score',
              component: () => import('@/views/student/score'),
              meta: {
                title: "成绩查询",
                icon: "Money"
              }
            },
            {
              path: 'enroll',
              name: 'Enroll',
              component: () => import('@/views/student/enroll'),
              meta: {
                title: "选课",
                icon: "Money"
              }
            },
            {
              path: 'result',
              name: 'Result',
              component: () => import('@/views/student/enroll-result'),
              meta: {
                title: "选课结果",
              }
            }


          ],
        },
        {
          path: 'teacher',
          name: 'Teacher',
          meta: {
            title: "教师管理",
            role: TEACHER,
            icon: "UserFilled",
          },
          children: [
            {
              path: "mark",
              component: () => import('@/views/teacher/mark'),
              meta:{
                title: "标记学生",
                icon: "Aim",
              }
            },
            {
              path: "score",
              component: () => import('@/views/teacher/score'),
              meta:{
                title: "分数管理",
                icon: "TrendCharts",
              }
            }
          ],
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
                title: "用户管理",
                icon:"UserFilled"
              }
            },
            {
              path: "student",
              component:() => import('@/views/system/student/index.vue'),
              meta:{
                title: "学生管理",
                // icon: "User",
                icon: "SwitchFilled"
              }
            },
            {
              path:'class',
              component:() => import('@/views/system/class'),
              meta:{
                title: "班级管理",
                icon: "School"
              }
            },
            {
              path:"major",
              component:() => import('@/views/system/major'),
              meta:{
                title: "专业管理",
                icon: "Compass"
              }
            },
            {
              path:"teacher",
              component:() => import('@/views/system/teacher'),
              meta:{
                title: "教师管理",
                icon: "Avatar"
              }
            },
            {
              path: "instructor",
              component:() => import('@/views/system/instructor'),
              meta: {
                title: "辅导员管理",
                icon: "Service"
              }
            },
            {
              path: "course",
              name: "Course",
              component: () => import('@/views/system/course'),
              meta:{
                title: "课程管理",
                icon: "Reading",
                leaf: true,
              },
              children: [
                {
                  path: "resign/:id",
                  name: "Resign",
                  component: () => import('@/views/system/course/Resign.vue'),
                  meta: {
                    title: "分配课程",
                  }
                }
              ]
            },
            {
              path: "article",
              name: "Article",
              component:  () => import("@/views/system/article"),
              meta: {
                title: "文章管理",
                icon: "Tickets",
                leaf: true
              },
              children: [
                {
                  path: 'edit-article',
                  name: 'ArticleEdit',
                  component: () => import("@/views/system/article/EditArticle.vue"),
                  meta: {
                    title: "编辑文章",

                  }
                }
              ]
            },
            // {
            //   path: "mark",
            //   component: () => import('@/views/teacher/mark'),
            //   meta:{
            //     title: "标记学生",
            //     icon: "Aim",
            //   }
            // }
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
        component: () => import("@/views/login"),
        meta: {
          title: "登录"
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
