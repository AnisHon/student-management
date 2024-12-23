import service from "@/utils/http.js";
// import {userData} from "@/mookjs/test.js";

// userData.setup()

const listUser = (query) => {
    return service({
        url: '/user/list',
        method: 'get',
        params: query
    })
}

const getUser = (userId) => {
    return service({
        url: '/user/' + parseStrEmpty(userId),
        method: 'get'
    })
}

const delUser = (userId) => {
    return service({
        url: '/user/' + userId,
        method: 'delete'
    })
}

const addUser = (data) => {
    return service({
        url: '/user',
        method: 'post',
        data: data
    })
}

const updateUser = (data) => {
    return service({
        url: '/user',
        method: 'put',
        data: data
    })
}

const changeUserStatus = (userId, status) => {
    const data = {
        userId,
        status
    }
    return service({
        url: '/user/changeStatus',
        method: 'put',
        data: data
    })
}



export {
    listUser,
    getUser,
    delUser,
    addUser,
    updateUser,
    changeUserStatus,
}
