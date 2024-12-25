import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {ADMIN, me} from "@/api/auth/auth.js";

export const useUserStore = defineStore('user', () => {

    const role = computed(() => {return ADMIN})

    const user = ref(undefined)


    const fetchUser = async () => {
        const {user: userEntity} = await me();
        user.value = userEntity;
    }

    const getUser = async () => {
        if (!user.value) {
            await fetchUser();
        }
        console.log(user.value)
        return user.value;
    }



    return {
        role,
        getUser
    }
})
