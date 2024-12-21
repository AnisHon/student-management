<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <el-link v-if="item.path === '/'"  @click="pushTo(item.name)" :underline="false">首页</el-link>
        <el-link v-else-if="!!item.components" type="primary" @click="pushTo(item.name)" :underline="false">
          {{ item.meta.title }}
        </el-link>

        <span v-else>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const levelList = computed(() => {
  return route.matched.filter(item => item.meta.title !== "首页");
})

const pushTo = (name) => {
  router.push({name: name})
}





</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}


/* 动画效果 */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.1s ease;
}

.breadcrumb-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.breadcrumb-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.breadcrumb-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.breadcrumb-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
