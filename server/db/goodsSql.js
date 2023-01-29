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
    }
}