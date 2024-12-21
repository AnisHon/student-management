<template>
  <el-scrollbar height="100vh">
    <transition name="el-fade-in" mode="out-in" tag="h4">
      <Component :is="title"/>
    </transition>
    <el-menu
        :default-active="currentPage"
        :collapse="collapse"
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
        router
    >
      <recursive-menu-item v-for="route of constRouters[0].children" url="" :const-route="route"/>
    </el-menu>
  </el-scrollbar>
</template>
<script setup>
import RecursiveMenuItem from "@/components/RouterMenu/RecursiveMenuItem.vue";
import {constRouters} from "@/router/index.js";
import {useRoute} from "vue-router";
import {computed} from "vue";
import MenuIcon from "@/components/RouterMenu/MenuIcon.vue";
import MenuTitle from "@/components/RouterMenu/MenuTitle.vue";

const route = useRoute()

const currentPage = computed(() => {
  return route.path
})

const title = computed(() => {
  return collapse ? MenuIcon : MenuTitle
})

const {collapse} = defineProps({
  collapse: {
    type: Boolean,
  }
})
</script>
<style scoped>

</style>