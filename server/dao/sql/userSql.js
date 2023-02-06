module.exports = {
    validateUserTel(tel) {
        return `select * from user where tel=${tel}`;
    },
    validateUserPwd(tel, pwd) {
        return `select * from user where tel=${tel} and pwd=${pwd}`;
    },
    insertUser(params) {
        let { userTel, userPwd = '0', nickName=params.userTel }= params;

        let jwt = require('jsonwebtoken');
        // 用户信息
        let payload = { tel: userTel };
        // 口令
        let secret = 'tea_mall';
        // 生成token
        let token = jwt.sign(payload, secret, {
            expiresIn: 60
        });
        console.log(token);
        return `insert into user(tel, pwd, imgUrl, nick_name, token) values('${userTel}', '${userPwd}', 'images/avatar.jpeg', '${nickName}', '${token}')`;
    },
    updatePwd(params) {
        let { id, oldPwd, newPwd } = params;
        return `update user set pwd = replace(pwd, '${oldPwd}', '${newPwd}') where id = ${id}`
    }
}