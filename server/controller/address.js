const jwt = require('jsonwebtoken');
const addressDao = require('../dao/address');
const userDao = require('../dao/users');

async function addAddress(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel: loginTel } = jwt.decode(token);
        const { name, tel, province, city, county, country = "中国", addressDetail, isDefault, areaCode } = req.body;
        const isUser = await userDao.validateUserTel({ tel: loginTel });
        if (isUser?.length) {
            const uid = isUser[0].id;
            if (!!isDefault) {
                await addressDao.updateDefault({ uid });
            }
            await addressDao.insertAddress({
                uid, name, tel, province, city, county, country, addressDetail, isDefault, areaCode
            });
            res.send({
                code: 0,
                success: true,
                msg: '添加成功',
                data: []
            });
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error,
        })
    }
}

async function getAddressList(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel } = jwt.decode(token);
        const isUser = await userDao.validateUserTel({ tel });
        console.log("user", isUser);
        if (isUser?.length) {
            const uid = isUser[0].id;
            const addressList = await addressDao.selectAddressList({ uid });
            res.send({
                code: 0,
                success: true,
                msg: '获取成功',
                data: addressList
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error,
        })
    }
}

async function deleteAddress(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel: loginTel } = jwt.decode(token);
        const { id } = req.body;
        const isUser = await userDao.validateUserTel({ tel: loginTel });
        if (isUser?.length) {
            await addressDao.deleteAddress({ id });
            res.send({
                code: 0,
                success: true,
                msg: '删除成功',
                data: []
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error,
        })
    }
}

async function editAddress(req, res, next) {
    try {
        const { token } = req.headers;
        const { tel: loginTel } = jwt.decode(token);
        const { id, name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = req.body;
        const isUser = await userDao.validateUserTel({ tel: loginTel });
        if (isUser?.length) {
            const uid = isUser[0].id;
            if (!!isDefault) { // 为默认
                await addressDao.updateDefault({ uid });
            }
            await addressDao.updateAddress({
                id, name, tel, province, city, county, country, addressDetail, isDefault, areaCode
            });
            res.send({
                code: 0,
                success: true,
                msg: '编辑成功',
                data: []
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error,
        })
    }
}


module.exports = {
    addAddress,
    getAddressList,
    deleteAddress,
    editAddress,
}