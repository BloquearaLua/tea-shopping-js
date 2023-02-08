var express = require('express');
var router = express.Router();

const users = require('../controller/users')

// 密码登录
router.post('/login', users.login);
// 验证码登录
router.post('/login/code', users.loginByCode);
// 添加用户
router.post('/add', users.addUser);
// 注册用户
router.post('/register', users.register)
// 查询用户是否存在
router.post('/selectUser', users.isUser);
// 修改密码
router.post('/recovery', users.recoveryPwd)


module.exports = router;
