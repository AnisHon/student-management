const genderMap = {
    '0': '男',
    '1': '女',
}

export const genderToString = (gender) => {
    return genderMap[gender]
}