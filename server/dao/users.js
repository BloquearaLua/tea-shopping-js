const conn = require('./sql');

/**
 * 查看用户手机号码是否存在
 * @param { tel } params 
 * @returns 用户信息
 */
function validateUserTel(params) {
    return new Promise((resolve, reject) => {
        const { tel } = params;
        const sql = `select * from user where tel=${ tel }`;
        conn.query(sql, (err, results) => {
            if (!err) {
                resolve(results);
            } else {
                resolve(undefined);
            }
        })
    })
}

/**
 * 
 * @param { id, token } params 
 * @returns 用户信息
 */
function updateToken(params) {
    return new Promise((resolve, reject) => {
        const { id, token } = params;
        const sql = `update user set token='${token}' where id = ${id}`;
        conn.query(sql, (err) => {
            if (!err) {
                resolve(true);
            } else {
                reject(err);
            }
        })
    })
}

/**
 * 
 * @param { tel } 
 * @returns 
 */
function insertUser(params) {
    return new Promise((resolve, reject) => {
        const { tel, pwd, token = '' } = params;
        const sql = `insert into user(tel, pwd, token) values('${tel}', '${pwd}', '${token}')`;
        conn.query(sql, (err, results) => {
            if (!err) {
                resolve(true);
            } else {
                reject(err);
            }
        }) 
    })
}

/**
 * 
 * @param { id, oldPwd, newPwd }
 * @returns
 */
function updatePwd(params) {
    return new Promise((resolve, reject) => {
        const { id, oldPwd, newPwd } = params;
        const sql = `update user set pwd = replace(pwd, '${oldPwd}', '${newPwd}') where id = ${id}`;
        conn.query(sql, err => {
            if (!err) {
                resolve(true);
            } else {
                reject(err);
            }
        })
    })
}


module.exports = {
    validateUserTel,
    updateToken,
    insertUser,
    updatePwd,
}