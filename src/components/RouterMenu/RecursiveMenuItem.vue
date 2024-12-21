<template>


  <el-sub-menu v-if="constRoute.children !== undefined" :index="constRoute.path">
    <template #title>
      <el-icon><Component :is="constRoute.meta.icon"/></el-icon>
      <span>{{ constRoute.meta.title }}</span>
    </template>
    <recursive-menu-item v-for="route of constRoute.children" :url="`${url}/${constRoute.path}`" :const-route="route" style="background-color: #1F2D3D"/>
  </el-sub-menu>

  <el-menu-item v-else :index="`${url}/${constRoute.path}`">

    <el-icon><Component :is="constRoute.meta.icon"/></el-icon>
    <span>{{ constRoute.meta.title }}</span>

  </el-menu-item>




</template>
<script setup>

const {constRoute, url} = defineProps(["constRoute", "url"])


</script>
<style scoped>

</style>