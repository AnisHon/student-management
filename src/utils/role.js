import {ADMIN, INSTRUCTOR, PUBLIC, STUDENT, TEACHER} from "@/api/auth/auth.js";

export const roleToString = (role) => {
    let item = "未知"
    switch (role) {
        case PUBLIC:
            item = "未知";
            break;
        case STUDENT:
            item = "学生";
            break;
        case INSTRUCTOR:
            item = "辅导员";
            break;
        case TEACHER:
            item = "教师";
            break;
        case ADMIN:
            item = "管理员";

    }
    return item;
}