module.exports = {
    getGoods(params) {
        const { id } = params;
        return `select * from goods_list where id = ${id}`;
    },
    getCartList(params) {
        return `select * from cart_list where uid = ${params.uid}`;
    },
    insertCart(params) {
        const { uid, goodsId, goodsName, goodsPrice, goodsNum, goodsImgUrl } = params;
        return `insert into cart_list(uid, goods_id, goods_name, goods_price, goods_num, goods_imgUrl) values(${uid}, ${goodsId}, '${goodsName}', '${goodsPrice}', ${goodsNum}, '${goodsImgUrl}')`;
    },
    checkCartItem(params) {
        const { uid, goodsId } = params;
        return `select * from cart_list where uid=${uid} and goods_id=${goodsId}`;
    },
    deleteCart(params) {
        const { ids } = params;
        return `delete from cart_list where id in (${ids.join(',')})`;
    },
    updateCartNum(params) {
        const { id, num } = params;
        return `update cart_list set goods_num=${num} where id=${id}`;
    }
}