var express = require('express');
var router = express.Router();

const address = require('../controller/address')

// 添加商品到购物车
router.post('/add', address.addAddress);
// 购物车列表
router.post('/list', address.getAddressList);
// 删除购物车
router.post('/delete', address.deleteAddress);
// 修改购物车
router.post('/edit', address.editAddress);

module.exports = router;
