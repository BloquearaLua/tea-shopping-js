const jwt = require('jsonwebtoken');
const QcloudSms = require("qcloudsms_js");

const userDao = require('../dao/users');
// 登录
async function login(req, res, next) {
    try {
        const { userTel, userPwd } = req.body;
        const isUser = await userDao.validateUserTel({ tel: userTel });
        const payload = { tel: userTel };
        const secret = 'tea_mall';
        const token = jwt.sign(payload, secret, {
            expiresIn: 60
        });
        if (isUser?.length) {
            if (isUser[0].pwd === userPwd + '') {
                await userDao.updateToken({
                    id: isUser[0].id,
                    token,
                });
                const user = await userDao.validateUserTel({ tel: userTel });
                res.send({
                    code: 0,
                    success: true,
                    msg: '登录成功',
                    data: user
                })
            } else {
                res.send({
                    code: 401,
                    success: false,
                    msg: '密码错误'
                })
            }
        } else {
            res.send({
                code: 404,
                success: false,
                msg: '该用户不存在',
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

// 验证码登录
async function loginByCode(req, res, next) {
    const tel = req.body.phone;
    // 短信应用SDK AppID
	var appid = 1400187558;  // SDK AppID是1400开头	
	// 短信应用SDK AppKey
	var appkey = "dc9dc3391896235ddc2325685047edc7";
	// 需要发送短信的手机号码
	var phoneNumbers = [tel];
	// 短信模板ID，需要在短信应用中申请
	var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
	// 签名
	var smsSign = "茶叶网";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
	// 实例化QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, cbRes, resData) {
	    if (err) {
            res.send({
                code: 10000,
                success: false,
                msg: err
            })
	    } else {
        res.send({
				code: 0,
                success: true,
				data:{
					code: cbRes.req.body.params[0]
				}
			})
	    }
	}
    var ssender = qcloudsms.SmsSingleSender();
	//这个变量：params 就是往手机上，发送的短信
	var params = [ Math.floor( Math.random()*(9999-1000))+1000 ];
	ssender.sendWithParam(86, phoneNumbers[0], templateId,
	  params, smsSign, "", "", callback);  // 签名参数不能为空串
}

// 验证码登录成功 => 添加用户
async function addUser(req, res, next) {
    try {
        const { userTel } = req.body;
        const isUser = await userDao.validateUserTel({ tel: userTel });
        if (isUser?.length) {
            res.send({
                code: 0,
                success: true,
                msg: '登录成功',
                data: isUser
            });
        } else {
            // user info
            const payload = { tel: userTel };
            const secret = 'tea_mall';
            const token = jwt.sign(payload, secret, {
                expiresIn: 60
            })
            const insertSuccess = await userDao.insertUser({
                tel: userTel,
                token,
            });
            const user = await userDao.validateUserTel({ tel: userTel });
            if (insertSuccess) {
                res.send({
                    code: 0,
                    success: true,
                    msg: '登录成功',
                    data: user,
                })
            }
        }
    } catch (error) {
        res.send({
            code: 1000,
            success: false,
            msg: error
        })
    }
}

// 注册
async function register(req, res, next) {
    try {
        const { userTel, userPwd } = req.body;
        const isUser = await userDao.validateUserTel({ tel: userTel });
        if (isUser?.length) {
            res.send({
                code: 401,
                success: false,
                msg: '用户已存在'
            })
        } else {
            const insertSuccess = await userDao.insertUser({
                tel: userTel,
                pwd: userPwd,
            })
            if (insertSuccess) {
                res.send({
                    code: 0,
                    success: true,
                    msg: '注册成功',
                })
            }
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

// 查询用户是否存在
async function isUser(req, res, next) {
    try {
        const { userTel } = req.body;
        const isUser = await userDao.validateUserTel({ tel: userTel });
        if (isUser?.length) {
            res.send({
                code: 0,
                success: true,
                msg: '用户已存在',
                data: []
            })
        } else {
            res.send({
                code: 401,
                success: false,
                msg: '用户不存在'
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

// 修改密码
async function recoveryPwd(req, res, next) {
    try {
        const { userTel, userPwd: newPwd } = req.body;
        const isUser = await userDao.validateUserTel({ tel: userTel });
        if (isUser?.length) {
            const { id, pwd: oldPwd } = isUser[0];
            const updateSuccess = await userDao.updatePwd({
                id,
                oldPwd,
                newPwd
            });
            if (updateSuccess) {
                res.send({
                    code: 0,
                    success: true,
                    msg: '更改成功',
                    data: []
                });
            } else {
                res.send({
                    code: 401,
                    success: false,
                    msg: '更改失败'
                });
            }
        } else {
            res.send({
                code: 404,
                success: false,
                msg: '用户不存在',
            })
        }
    } catch (error) {
        res.send({
            code: 10000,
            success: false,
            msg: error
        })
    }
}

module.exports = {
    login,
    loginByCode,
    addUser,
    register,
    isUser,
    recoveryPwd,
}