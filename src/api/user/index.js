import service from "@/utils/http.js";
import axios from "axios";
// import {userData} from "@/mookjs/test.js";

// userData.setup()
import { Mock } from '@/mookjs/test.js'


const listUser = (query) => {
    return service({
        url: '/system/user/list',
        method: 'get',
        params: query
    })
}

const listClass = () =>{
    return service({
        url:'/system/class/all',
        method:'get'
    })
}

const listStudent = (query) => {
    return service({
        url: '/system/student/list',
        method: 'get',
        params: query
    })
}

const listMajor = (query) => {
    return service({
        url: '/system/major/list',
        method: 'get',
        params: query
    })
}

const getUser = (userId) => {
    return service({
        url: '/system/user/' + parseStrEmpty(userId),
        method: 'get'
    })
}

const delUser = (userId) => {
    return service({
        url: '/system/user/' + userId,
        method: 'delete'
    })
}

const delStudent = (userId) => {
    return service({
        url: '/system/student/' + userId,
        method: 'delete'
    })
}

const addUser = (data) => {
    return service({
        url: '/system/user',
        method: 'post',
        data: data
    })
}

const addMajor = (data) => {
    console.log(data);
    return service({
        url: '/system/major',
        method: 'post',
        data: data
    })
}

const addStudent = (data) => {
    return service({
        url: '/system/student',
        method: 'post',
        data: data
    })
}

const updateUser = (data) => {
    return service({
        url: '/system/user',
        method: 'put',
        data: data
    })
}

const updateStudent = (data) => {
    return service({
        url: '/system/student',
        method: 'put',
        data: data
    })
}

const updateMajor = (data) => {
    return service({
        url: 'system/major',
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
        url: '/system/user/changeStatus',
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
    listClass,
    listStudent,
    listMajor,
    addMajor,
    updateMajor,
    addStudent,
    updateStudent,
    delStudent,
}
