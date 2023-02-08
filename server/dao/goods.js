const conn = require('../dao/sql');

/**
 * 获取商品
 * @param {goodsId} params 
 * @returns goodsInfo
 */
function getGoodsById(params) {
    return new Promise((resolve, reject) => {
        const { goodsId } = params;
        const sql = `select * from goods_list where id = ${goodsId}`;
        conn.query(sql, (err, results) => {
            if (!err) {
                resolve(results);
            } else {
                reject(err);
            }
        })
    })
}

/**
 * 
 * @param {keyword, order, orderStr} params 
 * @returns 
 */
function selectGoodsList(params) {
    return new Promise((resolve, reject) => {
        const { keyword, order, orderStr } = params;
        const sql = `select * from goods_list where goods_name like '%${keyword}%' ${ order ? `order by ${orderStr}` : '' }`;
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
    getGoodsById,
    selectGoodsList,
    
}