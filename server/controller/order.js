const userDao = require('../dao/users');
const orderDao = require('../dao/order');
const cartDao = require('../dao/cart');

const alipaySdk = require('../dao/alipay');
const { default: axios } = require('axios');
const AlipayFormData = require('alipay-sdk/lib/form').default;


async function getOrderList(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const { orderId } = req.body;

        const isUser = await userDao.validateUserTel({ tel });
        if (isUser?.length) {
            const order = await orderDao.selectOrderByOrderId({ orderId });
            res.send({
                code: 0,
                success: true,
                msg: '获取成功',
                data: order
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

async function addOrder(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);

        const { goodsGroup } = req.body; 
        let goodsNameArr = [],
            goodsNum = 0,
            goodsPrice = 0;
        goodsGroup.forEach(item => {
        goodsNameArr.push(item.goods_name);
        goodsNum += parseInt(item.goods_num);
        goodsPrice += parseInt(item.goods_price) * parseInt(item.goods_num);
        });
        let goodsName = goodsNameArr.join(',');

        const isUser = await userDao.validateUserTel({ tel });
        if (isUser?.length) {
            const uid = isUser[0].id;
            const orderID = generateOrderID();
            await orderDao.insertOrder({
                uid, orderID, goodsName, goodsNum, goodsPrice
            });
            const order = await orderDao.selectOrderByOrderId({ orderID });
            if (order?.length) {
                res.send({
                    code: 0,
                    success: true,
                    data: order
                })
            }
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

async function submitOrder(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const { orderId, selectedIds } = req.body;

        const isUser = await userDao.validateUserTel( tel );
        if (isUser?.length) {
            uid = isUser[0].id;
            const order = await orderDao.selectOrderByOrderId({ orderId });
            await orderDao.updateStatus({
                orderStatus: 2,
                uid,
                orderId,
            });
            await cartDao.deleteCartList({ ids: selectedIds });
            res.send({
                code: 0,
                success: true,
                data: []
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

async function payOrder(req, res, next) {
    try {
        const { orderId, name, price } = req.body;
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const isUser = await userDao.validateUserTel({ tel });
        if (isUser?.length) {
            const formData = new AlipayFormData();
            // 调用 setMethod 并传入 get，会返回可跳转到支付页面的url
            formData.setMethod('get');
            // 支付时信息
            formData.addField('bizContent', {
                outTradeNo: orderId,
                productCode: 'FAST_INSTANT_TRADE_PAY',
                totalAmount: price,
                subject: name,
            });
            // 支付成功失败跳转链接
            formData.addField('returnUrl', 'http://localhost:8080/pay');
            alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData }).then(resp => {
                res.send({
                    code: 0,
                    success: true,
                    msg: '支付成功',
                    data: {
                        redirectUrl: resp
                    }
                });
            });
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

async function payResult(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const { trade_no, out_trade_no } = req.body;

        const isUser = await userDao.validateUserTel({ tel });
        const Order = await orderDao.selectOrderByOrderId(out_trade_no);
        const isOrder = Order?.length;

        if (isUser?.length) {
            const uid = isUser[0].id;

            const formData = new AlipayFormData();
            // 调用 setMethod 并传入 get，会返回可跳转到支付页面的url
            formData.setMethod('get');
            // 支付时信息
            formData.addField('bizContent', {
                trade_no,
                out_trade_no
            });
            // 支付成功失败跳转链接
            formData.addField('returnUrl', 'http://localhost:8080/pay');
            alipaySdk.exec('alipay.trade.query', {}, { formData: formData }).then(resp => {
                axios({
                    url: resp,
                    method: 'GET',
                }).then(async(data) => {
                    const resCode = data.data.alipay_trade_query_response;
                    if (resCode === '10000') {
                        switch(  responseCode.trade_status  ){
                            case 'WAIT_BUYER_PAY':
                                res.send({
                                data: {
                                    code: 1001,
                                    success: false,
                                    message: '支付宝有交易记录，没付款'
                                }
                                })
                                break;
                            case 'TRADE_CLOSED':
                                res.send({
                                data: {
                                    code: 1002,
                                    success: false,
                                    message: '交易关闭'
                                }
                                })
                                break;
                            case 'TRADE_FINISHED':
                                if (isOrder) {
                                    await orderDao.updateStatus({
                                        uid,
                                        orderId: out_trade_no,
                                        orderStatus: 3
                                    });
                                    res.send({
                                        code: 0,
                                        success: true,
                                        msg: '交易完成',
                                        data: [],
                                    })
                                }
                                break;
                            case 'TRADE_SUCCESS':
                                if (isOrder) {
                                    await orderDao.updateStatus({
                                        uid,
                                        orderId: out_trade_no,
                                        orderStatus: 3
                                    });
                                    res.send({
                                        code: 0,
                                        success: true,
                                        msg: '交易完成',
                                        data: [],
                                    });
                                }
                                break;
                            }
                    } else if (resCode === '40004') {
                        res.send({
                            code: 404,
                            success: false,
                            msg: '交易不存在'
                        })
                    }
                }).catch(err => {
                    res.send({
                        code: 500,
                        success: false,
                        msg: err
                    });
                });
            });
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

function generateOrderID() {
    return Date.now().toString() + Math.floor(Math.random() * (999999 - 100000) + 100000);
}

module.exports = {
    getOrderList,
    addOrder,
    submitOrder,
    payOrder,
    payResult,
}