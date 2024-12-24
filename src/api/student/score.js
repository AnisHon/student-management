import service from "@/utils/http.js";

export const fetchMyScore = () => {
    return service({
        url: '/student/score',
        method: 'GET'
    })
}