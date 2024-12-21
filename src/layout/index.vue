<template>
  <el-container style="height: 100vh">
    <el-aside class="collapse-item" :class="{'collapse': isCollapse}" style="background-color: #304156">
      <router-menu :collapse="isCollapse"/>
    </el-aside>
    <el-container >
      <el-header class="header-container">
        <ul style="display: flex; align-items: center;">
          <li>
            <el-icon size="24px" @click="isCollapse = !isCollapse"  class="collapse-button">
              <DArrowRight  v-show="isCollapse"/>
              <DArrowLeft v-show="!isCollapse"/>
            </el-icon>
          </li>


          <li>
            <Breadcrumb/>
          </li>

          <li style="margin-left: auto;">
            <el-switch v-model="isDark" />
          </li>

          <li style="margin: 0 10px">
            <el-dropdown>
              <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <template #dropdown>
                <el-dropdown-item>
                  退出登录
                </el-dropdown-item>
              </template>
            </el-dropdown>

          </li>

        </ul>
      </el-header>
      <el-scrollbar :ref="scroll">
        <el-main class="content-height">

            <router-view v-slot="{ Component }">

              <transition name="fade-transform" mode="out-in">

                <component :is="Component" :key="route.path"/>


              </transition>

            </router-view>

        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script setup>
import RouterMenu from "@/components/RouterMenu/index.vue"
import Breadcrumb from "@/components/Breadcrumb/index.vue"
import {DArrowLeft, DArrowRight} from "@element-plus/icons-vue";
import {provide, ref} from "vue";
import {useDark} from "@vueuse/core";
import {useRoute} from "vue-router";

const isCollapse = ref(true)

const scroll = ref(undefined)
const route = useRoute()
provide("elMain", scroll)


const isDark = useDark()



</script>

<style lang="scss" scoped>
.collapse {

  width: 63px;

}

.collapse-item {

  transition: width 0.4s ease;
}

.content-height {
  height: calc(100vh - 50px);
}

.collapse-button {
  height: 50px;
  width: 50px;
}

.collapse-button:hover {

  background-color: #f9f9f9;

}
html.dark {
  .collapse-button:hover {

    background-color: #3e3e3e;

  }
}


.header-container {
  box-sizing: content-box;
  height: 50px;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

ul,
li{
  display: inline-block;
  list-style:none;
  margin: 0;
  padding: 0;

}
/* fade-transform */
.fade-transform--move,
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>

<style>
.el-menu {
  border: none;
}
</style>
