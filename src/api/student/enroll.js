import service from "@/utils/http.js";


export const enrollList = (queryParam) => {
    return service({
        url: "/student/course",
        method: "get",
        params: queryParam
    })
}

export const enroll = (teachId) => {
    return service({
        url: "/student/course/enroll/" + teachId,
        method: "put",
    })
}

export const drop = (teachId) => {
    return service({
        url: "/student/course/drop/" + teachId,
        method: "delete",
    })
}