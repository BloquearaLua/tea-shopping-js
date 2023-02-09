var express = require('express');
var router = express.Router();

const address = require('../controller/address')

// 添加地址
router.post('/add', address.addAddress);
// 地址列表
router.post('/list', address.getAddressList);
// 删除地址
router.post('/delete', address.deleteAddress);
// 编辑地址
router.post('/edit', address.editAddress);

module.exports = router;
