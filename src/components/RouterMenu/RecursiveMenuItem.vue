<template>


    <el-sub-menu v-if="constRoute.children !== undefined && !constRoute.meta.leaf && show" :index="constRoute.path">
      <template #title>
        <el-icon><Component :is="constRoute.meta.icon"/></el-icon>
        <span>{{ constRoute.meta.title }}</span>
      </template>
      <recursive-menu-item v-for="route of constRoute.children" :url="`${url}/${constRoute.path}`" :const-route="route" style="background-color: #1F2D3D"/>
    </el-sub-menu>

    <el-menu-item v-else-if="!constRoute.meta.hidden && show" :index="`${url}/${constRoute.path}`">

      <el-icon><Component :is="constRoute.meta.icon"/></el-icon>
      <span>{{ constRoute.meta.title }}</span>

    </el-menu-item>






</template>
<script setup>

import {computed} from "vue";
import {useUserStore} from "@/stores/user.js";
import {PUBLIC, STUDENT} from "@/api/auth/auth.js";

const {constRoute, url} = defineProps(["constRoute", "url"])

const userStore = useUserStore()

const show = computed(() => {
  // return true;
  const role = userStore.role;

  const routerRole = constRoute.meta.role;

  if (role !== routerRole && routerRole === STUDENT) {
    return false;
  }

  if (constRoute.meta.no instanceof Array && constRoute.meta.no.some(x => x === role)) {
    return false;
  } else if (constRoute.meta.no === role) {
    return false;
  }

  if (constRoute.meta.yes === role) {
    return true;
  }

  if (routerRole === undefined) {
    return true;
  }

  if (routerRole === PUBLIC) {
    return true;
  }

  if (routerRole instanceof Array) {
    return routerRole.some(item => item >= role)
  } else {
    return role >= routerRole;
  }



})

</script>
<style scoped>

</style>