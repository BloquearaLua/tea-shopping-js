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
    },
    updatePwd(params) {
        let { id, oldPwd, newPwd } = params;
        return `update user set pwd = replace(pwd, '${oldPwd}', '${newPwd}') where id = ${id}`
    }
}