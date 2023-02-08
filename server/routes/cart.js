var express = require('express');
var router = express.Router();

const cart = require('../controller/cart');

// 添加商品到购物车
router.post('/add', cart.addCart);
// 购物车列表
router.post('/list', cart.getCartList);
// 删除购物车
router.post('/delete', cart.deleteCartList);
// 修改购物车
router.post('/update', cart.UpdateCartNum);
// 购物车
router.post('/count', cart.getCartCount);

module.exports = router;
