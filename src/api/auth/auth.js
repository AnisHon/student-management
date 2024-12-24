import {useUserStore} from "@/stores/user.js";
import {useToken} from "@/stores/token.js";
import {useRouter} from "vue-router";
import router from "@/router/index.js";
import service from "@/utils/http.js";

const PUBLIC = 0;
const STUDENT = 1;
const INSTRUCTOR = 5;
const TEACHER = 10;
const ADMIN = 20;


const logout = () => {
   const token = useToken();
   token.clearToken();
   router.push({name: "Login"});

}

const getCaptcha = () => {
    return service({
        url: "/auth/captcha",
        method: "GET",
    })
}


export {
    PUBLIC,
    STUDENT,
    TEACHER,
    INSTRUCTOR,
    ADMIN,
    logout,
    getCaptcha
}
