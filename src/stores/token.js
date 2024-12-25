import { defineStore } from 'pinia'

// export const useToken = defineStore('token', () => {
//     const token = ref("")
//
//     const getToken = () => {
//
//         return token.value
//     }
//
//     const setToken = (token_) => {
//         console.log("set token")
//         token.value = token_
//     }
//
//     const clearToken = () => {
//         console.log("clear token")
//         token.value = "";
//     }
//
//     return {
//         token,
//         getToken,
//         setToken,
//         clearToken
//     }
// }, {
//     persist: true,
// })


export const useToken = defineStore('token', {
    state: () => {
        return {
            token: null,
        }
    },
    actions: {
        set(content) {
            this.token = content
        },
        clear() {
            console.log("123123")
            this.token = ''
        }
    },
    persist: true,
})
