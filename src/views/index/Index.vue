<template>
  <div class="home">
    <router-view/>
    <div v-show="route.name === 'Home' " class="app-container home">
      <el-row :gutter="20">
        <el-col :sm="24" :lg="24">
          <RecentNotification/>


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
          <el-card class="update-log">
            <div slot="header" class="clearfix">
              <h1>新闻资讯</h1>
            </div>
            <div class="body">
              <div class="news-list">
                <!-- News Item 1 -->
                <div class="news-item">
                  <h2 class="news-title">新闻标题 1</h2>
                  <p class="news-description">这是新闻 1 的简短描述。你可以在这里看到关于该新闻的更多细节。</p>
                  <a href="#" class="news-link">点击阅读更多</a>
                </div>
                <!-- News Item 2 -->
                <div class="news-item">
                  <h2 class="news-title">新闻标题 2</h2>
                  <p class="news-description">这是新闻 2 的简短描述。更多信息请点击链接。</p>
                  <a href="#" class="news-link">点击阅读更多</a>
                </div>
                <!-- News Item 3 -->
                <div class="news-item">
                  <h2 class="news-title">新闻标题 3</h2>
                  <p class="news-description">这是新闻 3 的简短描述，了解更多详细信息。</p>
                  <a href="#" class="news-link">点击阅读更多</a>
                </div>
                <!-- News Item 4 -->
                <div class="news-item">
                  <h2 class="news-title">新闻标题 4</h2>
                  <p class="news-description">这是新闻 4 的简短描述。点击链接查看更多内容。</p>
                  <a href="#" class="news-link">点击阅读更多</a>
                </div>
              </div>

            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log">
            <div slot="header" class="clearfix">
              <h1>公告栏</h1>
            </div>

            <div class="announcement-list">
              <!-- Announcement Item 1 -->
              <div class="announcement-item">
                <h2 class="announcement-title">公告标题 1</h2>
                <p class="announcement-description">这是公告 1 的简短描述。了解更多关于此次公告的详细信息。</p>
                <a href="#" class="announcement-link">点击查看详情</a>
              </div>
              <!-- Announcement Item 2 -->
              <div class="announcement-item">
                <h2 class="announcement-title">公告标题 2</h2>
                <p class="announcement-description">这是公告 2 的简短描述，更多信息请点击查看。</p>
                <a href="#" class="announcement-link">点击查看详情</a>
              </div>
              <!-- Announcement Item 3 -->
              <div class="announcement-item">
                <h2 class="announcement-title">公告标题 3</h2>
                <p class="announcement-description">这是公告 3 的简短描述，点击链接查看更多内容。</p>
                <a href="#" class="announcement-link">点击查看详情</a>
              </div>
              <!-- Announcement Item 4 -->
              <div class="announcement-item">
                <h2 class="announcement-title">公告标题 4</h2>
                <p class="announcement-description">这是公告 4 的简短描述，点击此处查看详细内容。</p>
                <a href="#" class="announcement-link">点击查看详情</a>
              </div>
            </div>

          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log">

            <div class="body">
              <h1>项目介绍</h1>
              <p>
                333
              </p>
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
