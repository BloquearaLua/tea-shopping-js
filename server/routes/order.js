var express = require('express');
var router = express.Router();

const order = require('../controller/order');

// 添加商品到购物车
router.post('/add', order.addOrder);
// 购物车列表
router.post('/list', order.getOrderList);
// 删除购物车
router.post('/submit', order.submitOrder);
// 修改购物车
router.post('/pay', order.payOrder);

router.post('/pay/result', order.payResult);

module.exports = router;
