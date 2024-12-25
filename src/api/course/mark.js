import service from "@/utils/http.js";

export const mark = (data) => {
    return service({
        url: '/instructor/mark',
        method: 'POST',
        data: data
    })
}

export const getMark = (studentId) => {
    return service({
        url: '/instructor/mark/' + studentId,
        method: 'GET',

    })
}