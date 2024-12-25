import service from "@/utils/http.js";

export const listArticle = (queryParam) => {
    return service({
        url: "/system/article/list",
        method: "get",
        params: queryParam
    })
}


export const saveArticle = (form) => {
    return service({
        url: "/system/article",
        method: "post",
        data: form
    })
}

export const updateArticle = (form) => {
    return service({
        url: "/system/article",
        method: "put",
        data: form
    })
}


export const deleteArticle = (id) => {
    return service({
        url: "/system/article/" + id,
        method: "delete"
    })
}

export const getArticle = (id) => {
    return service({
        url: "/system/article/" + id,
        method: "get"
    })
}