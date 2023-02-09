const express = require('express');

var router = express.Router();

// 用户相关
router.use('/api/user', require('./users'));
// 购物车
router.use('/api/cart', require('./cart'));
// 地址
router.use('/api/address', require('./address'));
// 订单
router.use('/api/order', require('./order'));
// 商品
router.use('/api/goods', require('./goods'));
// 首页
router.use('/api/home', require('./home'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
