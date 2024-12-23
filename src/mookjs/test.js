// import mock from 'mockjs'
// mock.setup()
// export const userData = mock.mock(/\/system\/user\/list\?pageNum=\d+&pageSize=\d+/, "get", {
//     // 属性 list 的值是一个数组，随机生成 1 到 10 个元素
//     "data|1-10": {
//         "total|100-1000": 100,
//         "rows|1-10": [
//             {
//                 // 随机生成1-10个★
//                 "userId|1-10": "★",
//                 // 随机生成1-100之间的任意整数
//                 "userName|1-10": "1",
//                 // 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 10 位。
//                 "nickName|1": "雪豹闭嘴",
//                 // 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
//                 "deptName|1": "理塘",
//                 // 随机生成一个布尔值，值为 false 的概率是 2 / (2 + 5)，值为 true 的概率是 5 / (2 + 5)。
//                 'phonenumber|2-5': 111,
//                 // 从属性值 object 中随机选取 2-4 个属性
//                 "status|1": "1",
//                 // 通过重复属性值 array 生成一个新数组，重复次数为 2
//                 "createTime": [
//                     "AMD",
//                     "CMD",
//                     "UMD"
//                 ],
//             },
//         ]
//     },
//     code: 200,
//     message: 'ok',
// });

import Mock from 'mockjs'
Mock.setup({
    timeout:'500-1000',
});

// 模拟用户列表的接口
Mock.mock(/\/user\/list/, 'get', (options) => {
    console.log('Mock intercepted:', options);  // 打印请求参数

    // 获取查询参数
    const { pageNum, pageSize } = options.url
        .split('?')[1]
        .split('&')
        .reduce((params, param) => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value);
            return params;
        }, {});

    // 随机生成数据
    const total = 100; // 假设有 100 条数据
    const data_ = [];
    for (let i = 0; i < pageSize; i++) {
        data_.push(Mock.mock({
            userId: '@increment',  // 自动递增的用户ID
            userName: '@word(5, 10)',  // 随机生成 5 到 10 个字符的用户名
            nickName: '@cname',  // 随机生成中文名字
            phonenumber: /^1[3-9]\d{9}$/,  // 随机生成手机号
            email: '@email',  // 随机生成邮箱
            status: '0',  // 随机选择状态 0 或 1
            createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',  // 随机生成时间
        }));
    }

    console.log('Mock response:', { rows: data_, total });  // 打印模拟数据

    return {
        message: " ",
        code: 200,
        data: {
            rows: data_,
            total,
        }
    };
});

export {Mock};