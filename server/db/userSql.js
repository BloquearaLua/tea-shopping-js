module.exports = {
    validateUserTel(tel) {
        return `select * from user where tel=${tel}`;
    },
    validateUserPwd(tel, pwd) {
        return `select * from user where tel=${tel} and pwd=${pwd}`;
    },
    insertUser(params) {
        let { userTel, userPwd = '0' }= params;
        return `insert into user(tel, pwd) values(${userTel}, ${userPwd + ''})`;
    }
}