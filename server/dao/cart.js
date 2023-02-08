const conn = require('../dao/sql');

/**
 * 判断商品是否已经在购物车里
 * @param {uid，goodsId}
 * @returns goodsInfo
 */
function getItemByUidGoodsId(params) {
    return new Promise((resolve, reject) => {
        const { uid, goodsId } = params;
        const sql = `select * from cart_list where uid=${uid} and goods_id=${goodsId}`;
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
 * 更新购物车中的数量
 * @param { id, num }
 * @returns
 */
function updateCartNum(params) {
    return new Promise((resolve, reject) => {
        const { id, num } = params;
        const sql = `update cart_list set goods_num=${num} where id=${id}`;
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
 * 添加商品到购物车
 * @param { uid, goodsId, goodsName, goodsPrice, goodsNum, goodsImgUrl }
 * @returns
 */
function insertCart(params) {
    return new Promise((resolve, reject) => {
        const { uid, goodsId, goods_name, goods_price, goods_num, goods_imgUrl } = params;
        const sql = `insert into cart_list(uid, goods_id, goods_name, goods_price, goods_num, goods_imgUrl) values(${uid}, ${goodsId}, '${goods_name}', '${goods_price}', ${goods_num}, '${goods_imgUrl}')`;
        conn.query(sql, (err, results) => {
            if (!err) {
                resolve(true)
            } else {
                reject(err);
            }
        })
    })
}

/**
 * 获取购物车列表
 * @param {uid}
 * @returns
 */
function getCartList(params) {
    return new Promise((resolve, reject) => {
        const { uid } = params;
        const sql = `select * from cart_list where uid = ${uid}`;
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
 * 批量删除购物车商品
 * @param {ids} 
 * @returns
 */
function deleteCartList(params) {
    return new Promise((resolve, reject) => {
        const { ids } = params;
        const sql = `delete from cart_list where id in (${ids.join(',')})`;
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
 * 获取购物车总数
 * @param {id, num}
 * @returns
 */
function getCartCount(params) {
    return new Promise((resolve, reject) => {
        const { uid } = params;
        const sql = `select count(*) as count from cart_list where uid = ${uid}`;
        conn.query(sql, (err, results) => {
            !err ? resolve(results[0]) : reject(err);
        })
    })
}

module.exports = {
    getItemByUidGoodsId,
    updateCartNum,
    insertCart,
    getCartList,
    deleteCartList,
    getCartCount,
}