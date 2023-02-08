var express = require('express');
var router = express.Router();
const goods = require('../controller/goods');

// 商品列表
router.get('/list', goods.getGoodsList);
// 商品分类
router.get('/category', goods.getGoodsCategory);
// 获取单个商品
router.get('/:id', goods.getGoods);

module.exports = router;
