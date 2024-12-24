import service from "@/utils/http.js";

export const fetchMyScore = () => {
    return service({
        url: '/student/score',
        method: 'GET'
    })
}


export const dropCourse = (ids) => {
    return service({
        url: '/student/course/drop/' + ids,
        method: 'delete'
    })
}
