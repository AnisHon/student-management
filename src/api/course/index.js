import service from "@/utils/http.js";

export const resignedTeacher = (courseId) => {
    return service({
        url: "/system/course/teacher/" + courseId,
        method: "get"
    })
}

export const assign = (courseId, teacherId) => {
    return service({
        url: `/system/course/assign/${courseId}/${teacherId}`,
        method: "post"
    })
}

export const reclaim = (teachId) => {
    return service({
        url: `/system/course/reclaim/${teachId}`,
        method: "delete",

    })
}

export const assignedCourses = (schoolYear) => {
    return service({
        url: `/system/course/assign/${schoolYear}`,
        method: "get"
    })
}

export const getSchoolYear = () => {
    return service({
        url: "/student/course/school-year",
    })
}