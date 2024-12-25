import axios from 'axios'
import {useToken} from "@/stores/token.js";
import {Message} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage, ElNotification} from "element-plus";
import {title} from "mockjs/src/mock/random/text.js";
import router from "@/router/index.js";





const errorCode = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
};

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: "/api",
    // baseURL:"http://192.168.20.191:8080",
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {


    const token = useToken()


    config.headers['token'] = token.token
    return config
}, error => {
    // console.log(error)
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        console.log("interceptor -", res)
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.message || errorCode['default']
        // 二进制数据则直接返回
        if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
            return res.data
        }

        if (code === 401) {
            ElNotification.warning("登录状态已过期，请重新登录")
            const token = useToken()
            const router = useRouter()
            token.clear()
            router.replace({name: "auth"})
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            ElMessage.error(msg)
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            ElMessage.warning(msg)
            return Promise.reject('error')
        } else if (code !== 200) {
            Notification.error({ title: msg })
            return Promise.reject('error')
        } else {

            console.log("interceptor", res)
            // console.log(res.data.data)
            return res.data.data
        }
    },
    error => {

        let code = 200;


        if (error.response && error.response.data) {
            code = error.response.data.code;
        }

        if (code === 401) {
            ElNotification.warning("登录状态已过期，请重新登录")
            const token = useToken()
            token.clear()
            router.replace({name: "Account"})
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            ElMessage.error(msg)
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            ElMessage.warning(msg)
            return Promise.reject('error')
        }

        if (code === 400) {
            ElNotification.error({message: error.response.data.message, duration: 5000})
            return Promise.reject(error)
        }
        let { message } = error;
        if (message === "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage.error({ message: message, type: 'error', duration: 5 * 1000 })
        return Promise.reject(error)
    }
)

export default service
