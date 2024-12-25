<template>
  <div class="home">
    <router-view/>
    <div v-show="route.name === 'Home' " class="app-container home">
      <el-row :gutter="20">
        <el-col :sm="24" :lg="12" style="padding-left: 20px">
          <h2>教务后台管理系统</h2>
          <p>
            仿照经典后台管理系统框架“若依”自主实现的教务管理系统，
            这种样式的web适用于通用的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，
            由于若依的前端高度抽象精简，再者使用了vue2前端，所以我们没有选择在若依上进行二次开发。
            但是部分若依前端组件经过若依码封装后十分精简易上手，出错概率低。所以我们采用了少部分组件，和完整UI样式
          </p>
          <p>
            <b>当前版本:</b> <span>v0.0.1</span>
          </p>
          <p>
            <el-tag type="danger">&yen;已经开源</el-tag>
          </p>
          <p>
            <el-link
                size="small"
                type="primary"
                target="_blank"
                href="https://github.com/AnisHon/studentManageDome"
            >Github</el-link
            >
          </p>
        </el-col>

        <el-col :sm="24" :lg="12" style="padding-left: 50px">
          <el-row>
            <el-col :span="12">
              <h2>技术选型</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <h4>后端技术</h4>
              <ul>
                <li>SpringBoot2</li>
                <li>Spring Security</li>
                <li>JWT</li>
                <li>MyBatis Plus</li>
                <li>Hikari</li>
                <li>Jackson</li>
                <li>...</li>
              </ul>
            </el-col>
            <el-col :span="6">
              <h4>前端技术</h4>
              <ul>
                <li>Vue3</li>
                <li>Pinia</li>
                <li>Element-Plus</li>
                <li>Axios</li>
                <li>Sass</li>
                <li>md-editor-v3</li>
                <li>...</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="false">
        <el-col :sm="24" :lg="12" style="padding-left: 20px">
          <h2>若依后台管理框架</h2>
          <p>
            一直想做一款后台管理系统，看了很多优秀的开源项目但是发现没有合适自己的。于是利用空闲休息时间开始自己写一套后台系统。如此有了若依管理系统，她可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，当然，您也可以对她进行深度定制，以做出更强系统。所有前端后台代码封装过后十分精简易上手，出错概率低。同时支持移动客户端访问。系统会陆续更新一些实用功能。
          </p>
          <p>
            <b>当前版本:</b> <span>v{{ '114.514' }}</span>
          </p>
          <p>
            <el-tag type="danger">&yen;免费开源</el-tag>
          </p>
          <p>
            <el-button
                type="primary"
                icon="cloudy"
                plain
            >访问码云</el-button
            >
            <el-button
                icon="HomeFilled"
                plain
            >访问主页</el-button
            >
          </p>
        </el-col>

        <el-col :sm="24" :lg="12" style="padding-left: 50px">
          <el-row>
            <el-col :span="12">
              <h2>技术选型</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <h4>后端技术</h4>
              <ul>
                <li>SpringBoot</li>
                <li>Spring Security</li>
                <li>JWT</li>
                <li>MyBatis</li>
                <li>Druid</li>
                <li>Fastjson</li>
                <li>...</li>
              </ul>
            </el-col>
            <el-col :span="6">
              <h4>前端技术</h4>
              <ul>
                <li>Vue</li>
                <li>Vuex</li>
                <li>Element-ui</li>
                <li>Axios</li>
                <li>Sass</li>
                <li>Quill</li>
                <li>...</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-row :gutter="20">
            <el-col :sm="24" :lg="24">
              <RecentNotification style="min-height: 500px"/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" >
          <el-card class="update-log" style="min-height: 500px;">
            <template #header>
              <div slot="header" class="clearfix">
                <span>更新日志</span>
              </div>
            </template>

            <el-collapse accordion>
              <el-collapse-item title="v2.0.1 - 2024-12-26">
                <ol>

                  <li>添加数据</li>
                  <li>检查bug</li>
                </ol>
              </el-collapse-item>

              <el-collapse-item title="v2.0.1 - 2024-12-25">
                <ol>

                  <li>基本完成</li>
                  <li>前端即将完成</li>
                </ol>
              </el-collapse-item>

              <el-collapse-item title="v2.0.1 - 2024-12-25">
                <ol>

                  <li>大致完成</li>
                  <li>前端大致完成</li>
                </ol>
              </el-collapse-item>

              <el-collapse-item title="v2.0.1 - 2024-12-25">
                <ol>

                  <li>登录接口</li>
                  <li>前端登录接口</li>
                </ol>
              </el-collapse-item>

              <el-collapse-item title="v2.0.0 - 2024-12-24">
                <ol>

                  <li>实现一堆额外功能</li>
                  <li>前端实现n个页面</li>
                </ol>
              </el-collapse-item>

              <el-collapse-item title="v2.0.0 - 2024-12-24">
                <ol>

                  <li>各种通用实体类</li>
                  <li>数据库创建，采用面向对象设计思想，先对象在数据库</li>
                </ol>
              </el-collapse-item>
              <el-collapse-item title="v1.1.0 - 2024-12-24">
                <ol>

                  <li>后端框架实现</li>
                  <li>前端框架框架实现</li>
                </ol>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log" style="min-height: 500px;">
            <template #header>
              <div slot="header" class="clearfix">
                <span>捐赠支持</span>
              </div>
            </template>

            <div class="body">
              <el-image
                  src="pay.png"
                  alt="donate"
                  width="100%"
              />
              <span style="display: inline-block; height: 30px; line-height: 30px"
              >这是若依官方的付款码，我特意留下，你可以请作者喝杯咖啡表示鼓励</span
              >
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>
</template>
<script setup>
import RecentNotification from "@/components/RecentNotification"
import {useRoute} from "vue-router";

const route = useRoute()

</script>
<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
