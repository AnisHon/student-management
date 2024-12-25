import service from "@/utils/http.js";
import axios from "axios";
import {shallowReactive} from "vue";
// import {userData} from "@/mookjs/test.js";

// userData.setup()
// import { Mock } from '@/mookjs/test.js'


const listUser = (query) => {
    return service({
        url: '/system/user/list',
        method: 'get',
        params: query
    })
}

const listClass = (query) =>{
    return service({
        url:'/system/class/list',
        method:'get',
        params: query
    })
}

const listClassAll = () => {
    return service({
        url: 'system/class/all',
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

const listMajorAll = () => {
    return service({
        url: '/system/major/all',
        method: 'get'
    })
}

const listTeacher = (query) => {
    return service({
        url: '/system/teacher/list',
        method: 'get',
        params:query
    })
}

const listInstructor = (query) =>{
    return service({
        url: '/system/instructor/list',
        method: 'get',
        params: query
    })
}

const listCourse = (query) => {
    return service({
        url: '/system/course/list',
        method: 'get',
        params: query,
    })
}

const listMark = () => {
    return service({
        url: '/system/mark/list',
        method: 'get',
    })
}

const getUser = (userId) => {
    return service({
        url: '/system/user/' +userId,
        method: 'get'
    })
}

const getMajor = (majorId) => {
    return service({
        url: '/system/major/' + majorId,
        method: 'get'
    })
}

const getStudent = (userId) => {
    return service({
        url: '/system/student/' +userId,
        method: 'get'
    })
}

const getClass = (classId) => {
    return service({
        url: '/system/class/' +classId,
        method: 'get'
    })
}

const getTeacher = (userId) => {
    return service({
        url: '/system/teacher/' + userId,
        method: 'get'
    })
}

const getInstructor = (userId) => {
    return service({
        url: '/system/instructor/' + userId,
        method: 'get'
    })
}

const getCourse = (courseId) => {
    return service({
        url: '/system/course/' + courseId,
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

const delClass = (classId) => {
    return service({
        url: '/system/class/' + classId,
        method: 'delete'
    })
}

const delMajor = (majorId) => {
    return service({
        url:'/system/major/' +majorId,
        method: 'delete'
    })
}

const delTeacher = () =>{
    return service({
        url: '/system/teacher/' + userId,
        method: 'delete'
    })
}

const delInstructor = () =>{
    return service({
        url: '/system/instructor/' + userId,
        method: 'delete'
    })
}

const delCourse = (courseId) => {
    return service({
        url: '/system/course/' + courseId,
        method: 'delete'
    })
}

const delMark = (userId) => {
    return service({
        url: '/system/mark/' + userId,
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

const addClass = (data) => {
    return service({
        url: '/system/class',
        method: 'post',
        data: data,
    })
}

const addTeacher = (data) => {
    return service({
        url: '/system/teacher',
        method: 'post',
        data: data,
    })
}

const addInstructor = (data) => {
    return service({
        url: '/system/instructor',
        method: 'post',
        data: data,
    })
}

const addCourse = (data) => {
    return service({
        url: '/system/course',
        method: 'post',
        data: data,
    })
}

const addMark = (data) => {
    return service({
        url: '/system/mark' ,
        method: 'post',
        data: data,
    })
}

const updateUser = (data) => {
    return service({
        url: '/system/user/',
        method: 'put',
        data: data
    })
}

const updateClass = (data) => {
    return service({
        url: '/system/class',
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

const updateTeacher = (data) => {
    return service({
        url: '/system/teacher',
        method: 'put',
        data: data
    })
}

const updateInstructor = (data) => {
    return service({
        url: '/system/instructor',
        method: 'put',
        data: data
    })
}

const updateCourse = (data) => {
    return service({
        url: '/system/course',
        method: 'put',
        data: data
    })
}

const updateMark = (data) => {
    return service({
        url: '/system/mark',
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
    getClass,
    listClassAll,
    addClass,
    updateClass,
    delClass,

    listStudent,
    addStudent,
    updateStudent,
    delStudent,
    getStudent,

    listMajor,
    listMajorAll,
    addMajor,
    updateMajor,
    getMajor,
    delMajor,

    listTeacher,
    getTeacher,
    updateTeacher,
    delTeacher,
    addTeacher,

    listInstructor,
    getInstructor,
    updateInstructor,
    addInstructor,
    delInstructor,

    listCourse,
    getCourse,
    updateCourse,
    addCourse,
    delCourse,

    listMark,
    updateMark,
    addMark,
    delMark,
}
