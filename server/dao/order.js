const conn = require('./sql');

function selectOrderByOrderId(params) {
    return new Promise((resolve, reject) => {
        const { orderId } = params;
        const sql = `select * from store_order where order_id=${orderId}`;
        conn.query(sql, (err, results) => {
            if (!err) {
                resolve(results);
            } else {
                reject(err);
            }
        })
    });
}

function updateStatus(params) {
    return new Promise((resolve, reject) => {
        const { uid, orderId, orderStatus } = params;
        const sql = `update store_order set order_status=${orderStatus} where uid=${uid} and order_id='${orderId}'`
        conn.query(sql, (err) => {
            if (!err) {
                resolve(true);
            } else {
                reject(err);
            }
        })
    });
}

function insertOrder(params) {
    return new Promise((resolve, reject) => {
        const { uid, orderID, goodsName, goodsPrice, goodsNum, orderStatus } = params;
        const sql = `insert into store_order(uid, order_id, goods_name, goods_price, goods_num, order_status) values(${uid}, ${orderID}, '${goodsName}', ${goodsPrice}, ${goodsNum}, 1)`;
        conn.query(sql, err => {
            if (!err) {
                resolve(true);
            } else {
                reject(err);
            }
        })
    });
}


module.exports = {
    selectOrderByOrderId,
    updateStatus,
    insertOrder,

}

