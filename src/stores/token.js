import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useToken = defineStore('token', () => {
    const token = ref("")

    const getToken = () => {
        return token.value
    }

    const setToken = (token_) => {
        token.value = token_
    }

    const clearToken = () => {
        token.value = "";
    }

    return {
        getToken,
        setToken,
        clearToken
    }
})
