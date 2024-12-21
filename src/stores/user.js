import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {ADMIN} from "@/api/auth/auth.js";

export const useUserStore = defineStore('user', () => {

    const role = computed(() => {return ADMIN})
    return {
        role
    }
})
