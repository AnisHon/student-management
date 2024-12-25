<template>
  <MdEditor v-model="text" :theme="theme" preview-theme="github"/>
</template>

<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {computed} from "vue";
import {useDark} from "@vueuse/core";

const text = defineModel()

const dark = useDark()

const theme = computed(() => {
  return dark ? 'dark' : 'light'
})

</script>

<style>
iframe {
  width: 100%;
  min-height: 400px;
}
</style>