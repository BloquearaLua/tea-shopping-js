module.exports = {
    insertOrder(params) {
        const { uid, orderID, goodsName, goodsPrice, goodsNum, orderStatus } = params;
        return `insert into store_order(uid, order_id, goods_name, goods_price, goods_num, order_status) values(${uid}, ${orderID}, '${goodsName}', ${goodsPrice}, ${goodsNum}, 1)`;
    },
    selectOrderByOrderID(params) {
        const { orderID } = params;
        return `select * from store_order where order_id=${orderID}`;
    },
    updateStatus(params) {
        const { uid, orderId, orderStatus } = params;
        return `update store_order set order_status=${orderStatus} where uid=${uid} and order_id='${orderId}'`
    }
}