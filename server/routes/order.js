var express = require('express');
var router = express.Router();

const order = require('../controller/order');

// 生成订单
router.post('/add', order.addOrder);
// 获取单个订单
router.post('/list', order.getOrder);
// 提交订单
router.post('/submit', order.submitOrder);
// 付款
router.post('/pay', order.payOrder);
// 付款结果
router.post('/pay/result', order.payResult);
// 获取订单列表
// router.post('/order_list', order.getOrderList);

module.exports = router;
