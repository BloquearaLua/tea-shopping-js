const jwt = require('jsonwebtoken');

const userDao = require('../dao/users');
const cartDao = require('../dao/cart');

// 添加商品到购物车
async function addCart(req, res, next) {
    try {
        const { goodsId } = req.body;
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        
        const isUser = await userDao.validateUserTel({ tel });
        if (isUser?.length) {
            const uid = results[0].id;
            const goodsInfo = await goodsDao.getGoodsById({ goodsId });
            const { goods_name, goods_price, goods_num, goods_imgUrl } = goodsInfo;
            const inCart = await cartDao.getItemByUidGoodsId({
                uid,
                goodsId
            });
            if (inCart?.length) {
                const updateSuccess = await cartDao.updateCartNum({
                    id: inCart[0].id,
                    num: parseInt(inCart[0].goods_num) + 1
                });
                if (updateSuccess) {
                    res.send({
                        code: 0,
                        success: true,
                        msg: '添加成功',
                        data: [],
                      })
                }
            } else {
                const insertSuccess = await cartDao.insertCart({
                    uid,
                    goodsId,
                    goods_name,
                    goods_price,
                    goods_num,
                    goods_imgUrl,
                })
                if (insertSuccess) {
                    res.send({
                        code: 0,
                        success: true,
                        message: '添加成功',
                        data: []
                    });
                }
            }

        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: '添加失败'
        })
    }
}

// 获取购物车列表
async function getCartList(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const isUser = await userDao.validateUserTel({ tel });
        if (isUser?.length) {
            const uid = isUser[0].id;
            const cartList = await cartDao.getCartList({ uid });
            res.send({
                code: 0,
                success: true,
                data: cartList
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

// 删除购物车
async function deleteCartList(req, res, next) {
    try {
        const { ids } = req.body;
        const deleteSuccess = await cartDao.deleteCartList({ ids });
        if (deleteSuccess) {
            res.send({
                code: 0,
                success: true,
                message: '删除成功',
                data: []
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            message: '删除失败',
          })
    }
}

// 修改购物车
async function UpdateCartNum(req, res, next) {
    try {
        const { id, num } = req.body;
        const updateSuccess = await cartDao.updateCartNum({ id, num });
        if (updateSuccess) {
            res.send({
                code: 0,
                success: true,
                message: '更新成功'
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            message: error
          })
    }
}

// 获取购物车总数
async function getCartCount(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const isUser = await userDao.validateUserTel({ tel });
        console.log(isUser);
        if (isUser?.length) {
            const uid = isUser[0].id;
            const count = await cartDao.getCartCount({ uid });
            res.send({
                code: 0,
                success: true,
                data: count
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
          })
    }
}

module.exports = {
    addCart,
    getCartList,
    deleteCartList,
    UpdateCartNum,
    getCartCount,
}