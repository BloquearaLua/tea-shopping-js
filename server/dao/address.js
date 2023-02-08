const conn = require('./sql');

/**
 * 
 * @param {uid, name, tel, province, city, county, country, addressDetail, isDefault, areaCode} params 
 * @returns boolean
 */
function insertAddress(params) {
    return new Promise((resolve, reject) => {
        const { uid, name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = params;
        const sql =  `insert into address(uid, name, tel, city, province, county, country, address_detail, is_default, area_code) values(${uid}, '${name}', '${tel}', '${city}', '${province}', '${county}', '${country}', '${addressDetail}', '${isDefault}', '${areaCode}')`;
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
 * @param {uid} params 
 * @returns boolean
 */
function updateDefault(params) {
    return new Promise((resolve, reject) => {
        const { uid } = params;
        const sql = `update address set is_default=replace(is_default, '1', '0') where uid=${uid}`;
        conn.query(sql, err => {
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
 * @param {id, name, tel, province, city, county, country, addressDetail, isDefault, areaCode} params 
 * @returns 
 */
function updateAddress(params) {
    return new Promise((resolve, reject) => {
        const { id, name, tel, province, city, county, addressDetail, isDefault, areaCode } = params;
        const sql = `update address set name='${name}', tel='${tel}', city='${city}', province='${province}', county='${county}', address_detail='${addressDetail}', is_default='${isDefault}', area_code='${areaCode}' where id=${id}`;
        conn.query(sql, err => {
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
 * @param {id} params 
 * @returns boolean
 */
function deleteAddress(params) {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sql = `delete from address where id=${id}`;
        conn.query(sql, err => {
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
 * @param {uid} params 
 * @returns addressList
 */
function selectAddressList(params) {
    return new Promise((resolve, reject) => {
        const { uid } = params;
        const sql = `select * from address where uid=${uid}`;
        conn.query(sql, (err, results) => {
            if (!err) {
                resolve(results);
            } else {
                reject(err);
            }
        })
    })
}
module.exports = {
    insertAddress,
    updateDefault,
    updateAddress,
    deleteAddress,
    selectAddressList,
}
