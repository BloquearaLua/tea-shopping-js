var express = require('express');
var router = express.Router();

const users = require('../controller/users')

/* GET users listing. */
router.post('/login', users.login);

module.exports = router;
