import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useToken = defineStore('token', () => {
    const token = ref("")

    const getToken = () => {

        return token.value
    }

    const setToken = (token_) => {
        console.log("set token")
        token.value = token_
    }

    const clearToken = () => {
        console.log("clear token")
        token.value = "";
    }

    return {
        token,
        getToken,
        setToken,
        clearToken
    }
}, {
    persist: true,
})
