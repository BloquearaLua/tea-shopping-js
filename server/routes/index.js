const express = require('express');
// const conn = require('../db/sql');
// const userSql = require('../db/userSql');
// const goodsSql = require('../db/sql/goodsSql');
// const QcloudSms = require("qcloudsms_js");
// const jwt = require('jsonwebtoken');
// const addressSql = require('../db/addressSql');
// const { updateDefault } = require('../db/addressSql');
// const orderSql = require('../db/orderSql');

// const alipaySdk = require('../db/alipay');
// const { default: axios } = require('axios');
// const AlipayFormData = require('alipay-sdk/lib/form').default;

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

// 查询商品数据接口
// router.get('/api/goods/shopList', function(req, res, next) {
//   try {
//     let { keyword, order } = req.query;
//     let orderStr = "";
//     if (order) {
//       const orderName = Object.keys(order);
//       const orderBy = Object.values(order);
//       orderStr = `${orderName[0]} ${orderBy[0]}`;
//       if (orderName.length > 1) {
//         orderStr += `, ${orderName[1]} ${orderBy[1]}`;
//       }
//     }
  
//     console.log("orderstr", orderStr);
//     const sql = `select * from goods_list where goods_name like '%${keyword}%' ${ order ? `order by ${orderStr}` : '' }`;
//     console.log('sql',sql);
//     conn.query(sql, (error, results) => {
//       console.log(results);
//       res.send({
//         code: 0,
//         data: results
//       })
//     })
//   } catch (error) {
//     console.log(error);
//   }
// })

// 分类接口
// router.get('/api/goods/list', function(req, res, next) {
  // res.send({
  //   code: 0,
  //   data: [
  //     {
  //       id: 1,
  //       name: '推荐',
  //       children: [
  //         {
  //           id: 1,
  //           name: '铁观音',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 2,
  //           name: '功夫茶具',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 3,
  //           name: '茶具电器',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 4,
  //           name: '紫砂壶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 5,
  //           name: '龙井',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 6,
  //           name: '武夷岩茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //       ]
  //     },
  //     {
  //       id: 2,
  //       name: '绿茶',
  //       children: [
  //         {
  //           id: 1,
  //           name: '龙井',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 2,
  //           name: '碧螺春',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 3,
  //           name: '毛尖',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 4,
  //           name: '毛峰',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 5,
  //           name: '蒙顶茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 6,
  //           name: '雨花茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //       ]
  //     },
  //     {
  //       id: 3,
  //       name: '红茶',
  //       children: [
  //         {
  //           id: 1,
  //           name: '日照红茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 2,
  //           name: '祁红',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 3,
  //           name: '昭平红',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 4,
  //           name: '霍红',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 5,
  //           name: '滇红',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 6,
  //           name: '越红',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //       ]
  //     },
  //     {
  //       id: 4,
  //       name: '白茶',
  //       children: [
  //         {
  //           id: 1,
  //           name: '白毫银针',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 2,
  //           name: '白牡丹',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 3,
  //           name: '寿眉',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 4,
  //           name: '贡眉',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //       ]
  //     },
  //     {
  //       id: 5,
  //       name: '黑茶',
  //       children: [
  //         {
  //           id: 1,
  //           name: '湖南黑茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 2,
  //           name: '湖北青磚茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 3,
  //           name: '四川藏茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 4,
  //           name: '安徽古黟黑茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //         {
  //           id: 5,
  //           name: '安徽古黟黑茶',
  //           imgUrl: '/images/list1.jpeg',
  //         },
  //       ]
  //     },
  //   ]
  // })
// })

// 查询商品
// router.get('/api/goods/:id', function (req, res, next) {
  // const shoplist = [
  //   {
  //     id: 1,
  //     name: '龙井1號铁罐250g',
  //     price: 299,
  //     imgUrl: '/images/goods1.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: '龙井2號铁罐250g',
  //     price: 399,
  //     imgUrl: '/images/goods2.jpg'
  //   },
  //   {
  //     id: 3,
  //     name: '龙井3號铁罐250g',
  //     price: 199,
  //     imgUrl: '/images/goods3.jpg'
  //   },
  //   {
  //     id: 4,
  //     name: '龙井4號铁罐250g',
  //     price: 189,
  //     imgUrl: '/images/goods4.jpg'
  //   },
  //   {
  //     id: 5,
  //     name: '建盏茶具套装 红色芝麻毫 12件套',
  //     price: 299,
  //     imgUrl: './images/like.jpeg'
  //   },
  //   {
  //     id: 6,
  //     name: '建盏茶具套装 红色芝麻毫 12件套',
  //     price: 299,
  //     imgUrl: './images/like.jpeg'
  //   },
  //   {
  //     id: 7,
  //     name: '建盏茶具套装 红色芝麻毫 12件套',
  //     price: 299,
  //     imgUrl: './images/like.jpeg'
  //   },
  //   {
  //     id: 8,
  //     name: '建盏茶具套装 红色芝麻毫 12件套',
  //     price: 299,
  //     imgUrl: './images/like.jpeg'
  //   },
  //   {
  //     id: 9,
  //     name: '建盏茶具套装 红色芝麻毫 12件套',
  //     price: 299,
  //     imgUrl: './images/like.jpeg'
  //   },
  //   {
  //     id: 10,
  //     name: '建盏茶具套装 红色芝麻毫 12件套',
  //     price: 299,
  //     imgUrl: './images/like.jpeg'
  //   },
  // ]
  // const id = +req.params.id;
  // res.send({
  //   code: 0,
  //   data: shoplist.filter(item => item.id === id),
  // })
  // const { id } = req.params;
  // conn.query(goodsSql.getGoods({ id: +id }), (err, results) => {
  //   if (!err) {
  //     res.send({
  //       code: 0,
  //       success: true,
  //       data: [...results],
  //     })
  //   } else {
  //     console.log(err);
  //     res.send({
  //       code: 10000,
  //       success: false,
  //       message: err
  //     })
  //   }
  // })
// })

// 登录接口
// router.post('/api/login', function(req, res, next) {
//   const { userTel, userPwd } = req.body;
//   console.log(conn);
//   conn.query(userSql.validateUserTel(userTel), (err, results) => {
//     console.log(results);
//     if (results?.length) {
//       console.log(results);
//       conn.query(userSql.validateUserPwd(userTel, userPwd), (err, pwdResults) => 
//        {
//         console.log(userSql.validateUserPwd(userTel, userPwd),'pwdResults:',pwdResults);
//         if (pwdResults?.length) {
//           const userMsg = [...pwdResults];
//           delete userMsg.pwd;
//           res.send({
//             code: 0,
//             success: true,
//             msg: '登录成功',
//             data: [{
//               ...userMsg[0],
//               token: 'fdsjfsdkjskl'
//             }],
//           })
//         } else {
//           res.send({
//             code: 302,
//             success: false,
//             msg: '密码错误',
//           })
//         }
//       })
//     } else {
//       res.send({
//         code: 301,
//         success: false,
//         msg: '手机号不存在',
//       })
//     }
//   })
// })

// 短信验证码接口
//发送短信验证码
// router.post('/api/login/code',function(req,res,next){
// 	let tel = req.body.phone;
// 	// 短信应用SDK AppID
// 	var appid = 1400187558;  // SDK AppID是1400开头	
// 	// 短信应用SDK AppKey
// 	var appkey = "dc9dc3391896235ddc2325685047edc7";
// 	// 需要发送短信的手机号码
// 	var phoneNumbers = [tel];
// 	// 短信模板ID，需要在短信应用中申请
// 	var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 	// 签名
// 	var smsSign = "茶叶网";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
// 	// 实例化QcloudSms
// 	var qcloudsms = QcloudSms(appid, appkey);
// 	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
// 	function callback(err, cbRes, resData) {
// 	    if (err) {
// 	        console.log("err: ", err);
// 	    } else {
//         res.send({
// 				code: 0,
//         success: true,
// 				data:{
// 					code: cbRes.req.body.params[0]
// 				}
// 			})
// 	    }
// 	}
// 	var ssender = qcloudsms.SmsSingleSender();
// 	//这个变量：params 就是往手机上，发送的短信
// 	var params = [  Math.floor( Math.random()*(9999-1000))+1000   ];
// 	ssender.sendWithParam(86, phoneNumbers[0], templateId,
// 	  params, smsSign, "", "", callback);  // 签名参数不能为空串
// })

// 添加用户
// router.post('/api/addUser', function(req, res, next) {
//   const { userTel } = req.body;
//   conn.query(userSql.validateUserTel(userTel), (err, results) => {
//     if (results?.length) {
//       res.send({
//         code: 0,
//         success: true,
//         message: '登录成功',
//         data: results,
//       })
//     } else {
//       // 不存在用户，新增一个用户
//       conn.query(userSql.insertUser({ userTel, }), (err, results) => {
//         console.log("insertUser",err, results);
//         if (!err) {
//           conn.query(userSql.validateUserTel(userTel), (err, userResults) => {
//             console.log('queryUser', err, userResults[0]);
//             if (userResults?.length) {
//               res.send({
//                 code: 0,
//                 success: true,
//                 message: '登录成功',
//                 data: [{
//                   ...userResults[0],
//                 }],
//               })
//             }
//           });
//         }
//       })
//     }
//   })
// })

// 注册接口
// router.post('/api/addUser', function(req, res, next) {
//   const { userTel } = req.body;
//   conn.query(userSql.validateUserTel(userTel), (err, results) => {
//     if (results?.length) {
//       res.send({
//         code: 0,
//         success: true,
//         message: '登录成功',
//         data: results[0],
//       })
//     } else {
//       // 不存在用户，新增一个用户
//       conn.query(userSql.insertUser({ userTel, }), (err, results) => {
//         console.log("insertUser",err, results);
//         if (!err) {
//           conn.query(userSql.validateUserTel(userTel), (err, userResults) => {
//             console.log('queryUser', err, userResults[0]);
//             if (userResults?.length) {
//               res.send({
//                 code: 0,
//                 success: true,
//                 message: '登录成功',
//                 data: userResults[0],
//               })
//             }
//           });
//         }
//       })
//     }
//   })
// })

// 注册接口
// router.post('/api/register', function(req, res, next) {
//   const { userTel, userPwd } = req.body;

//   conn.query(userSql.validateUserTel(userTel), (err, results) => {
//     if (results?.length) {
//       res.send({
//         code: 401,
//         success: false,
//         msg: '用户已存在'
//       })
//     } else {
//       conn.query(userSql.insertUser({ userTel, userPwd }), (err, results) => {
//         console.log("insertUser",err, results);
//         if (!err) {
//           conn.query(userSql.validateUserTel(userTel), (err, userResults) => {
//             console.log('queryUser', err, userResults[0]);
//             if (userResults?.length) {
//               res.send({
//                 code: 0,
//                 success: true,
//                 message: '登录成功',
//                 data: userResults[0],
//               })
//             }
//           });
//         }
//       })
//     }
//   })
// })

// 查询用户是否存在
// router.post('/api/selectUser', function(req, res, next) {
//   const { userTel } = req.body;

//   conn.query(userSql.validateUserTel(userTel), (err, results) => {
//     if (results?.length) {
//       res.send({
//         code: 0,
//         success: true,
//         msg: '用户已存在',
//         data: []
//       })
//     } else {
//       res.send({
//         code: 404,
//         success: false,
//         msg: '用户不存在'
//       })
//     }
//   })
// })

// 修改密码
// router.post('/api/recovery', function(req, res, next) {
//   const { userTel, userPwd: newPwd } = req.body;
//   console.log(userTel, newPwd);
//   conn.query(userSql.validateUserTel(userTel), (err, results) => {
//     if (results?.length) {
//       let { id, pwd: oldPwd }= results[0];
//       console.log(userSql.updatePwd({ 
//         id,
//         oldPwd,
//         newPwd
//       }));
//       conn.query(userSql.updatePwd({ 
//         id,
//         oldPwd,
//         newPwd
//       }), (err, results) => {
//         console.log(err);
//         if (!err) {
//           res.send({
//             code: 0,
//             success: true,
//             message: '更改成功',
//             data: []
//           })
//         } else {
//           res.send({
//             code: 401,
//             success: false,
//             message: '更改失败'
//           })
//         }
//       })
//     } else {
//       res.send({
//         code: 404,
//         success: false,
//         msg: '用户不存在'
//       })
//     }
//   })
// })

// 加入购物车
// router.post('/api/addCart', function(req, res, next) {
//   try {
//     const { goodsId } = req.body;
//   const { token } = req.headers;
//   const tokenObj = jwt.decode(token);
//   console.log('userTEl', goodsId);

//   conn.query(userSql.validateUserTel(tokenObj.tel), (err, results) => {
//     if (!err) {
//       // console.log('查询用户手机成功');
//       const uid = results[0].id;
//       conn.query(goodsSql.getGoods({ id: goodsId }), (err, results) => {
//         if (!err) {
//           // console.log('查询商品成功');
//           const goodsId = results[0].id;
//           const goodsName = results[0].name;
//           const goodsPrice = results[0].price;
//           const goodsNum = results[0].num;
//           const goodsImgUrl = results[0].imgUrl;

//           conn.query(goodsSql.checkCartItem({ uid, goodsId }), (err, results) => {
//             if (results.length) {
//               const { id } = results[0];
//               console.log("??", id);
//               conn.query(goodsSql.updateCartNum({ 
//                 id,
//                 num: parseInt(goodsNum) + 1
//               }), (err, results) => {
//                 if (!err) {
//                   res.send({
//                     code: 0,
//                     success: true,
//                     message: '添加成功',
//                     data: {},
//                   })
//                 } else {
//                   console.log("update:", err);
//                 }
//               })
//             } else {
//               conn.query(goodsSql.insertCart({
//                 uid,
//                 goodsId,
//                 goodsName,
//                 goodsPrice,
//                 goodsNum,
//                 goodsImgUrl,
//               }), (err) => {
//                 if (!err) {
//                   res.send({
//                     code: 0,
//                     success: true,
//                     message: '添加成功',
//                     data: []
//                   });
//                 } else {
//                   console.log("insert", err);
//                 }
//               })
//             }
//           })
//         }
//       })
//     }
//   })
//   } catch (error) {
//     res.send({
//       code: 10000,
//       success: false,
//       message: error
//     })
//   }

// })

// 购物车列表
// router.post('/api/selectCart', function (req, res, next) {
//   const { token } = req.headers;
//   const { tel } = jwt.decode(token);
//   conn.query(userSql.validateUserTel(tel), (err, results) => {
//     if (!err) {
//       const uid = results[0].id;
//       conn.query(goodsSql.getCartList({ uid }), (err, results) => {
//         if (!err) {
//           res.send({
//             code: 0,
//             success: true,
//             data: [...results],
//           })
//         } else {
//           console.log(err);
//         }
//       })
//     }
//   })
// })

// 删除购物车
// router.post('/api/cart/delete', function (req, res, next) {
//   const { ids } = req.body;
//   console.log("delete,ids:", ids);
//   conn.query(goodsSql.deleteCart({ ids }), (err, results) => {
//     if (!err) {
//       res.send({
//         code: 0,
//         success: true,
//         message: '删除成功',
//         data: []
//       })
//     } else {
//       console.log(err);
//       res.send({
//         code: 400,
//         success: false,
//         message: '删除失败',
//       })
//     }
//   })
// })

// 修改购物车
// router.post('/api/cart/updateNum', (req, res, next) => {
//   const { id, num } = req.body;
//   conn.query(goodsSql.updateCartNum({ id, num }), (err, results) => {
//     if (!err) {
//       res.send({
//         code: 0,
//         success: true,
//         message: '更新成功'
//       })
//     }
//   })
// })

// 添加地址
// router.post('/api/address/add', (req, res, next) => {
//   const { token } = req.headers;
//   const { tel: loginTel } = jwt.decode(token);
//   const { name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = req.body;
//   conn.query(userSql.validateUserTel(loginTel), (err, results) => {
//     if (!err) {
//       const uid = results[0].id;
//       if (!!isDefault) { // 为默认
//         conn.query(updateDefault({ uid }));
//       }
//       conn.query(addressSql.insertAddress({
//         uid, name, tel, province, city, county, country, addressDetail, isDefault, areaCode
//       }), (err) => {
//         if (!err) {
//           res.send({
//             code: 0,
//             success: true,
//             message: '添加成功',
//             data: []
//           })
//         }
//       });
//     }
//   })
// })

// 编辑地址
// router.post('/api/address/edit', (req, res, next) => {
//   const { token } = req.headers;
//   const { tel: loginTel } = jwt.decode(token);
//   const { id, name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = req.body;
//   conn.query(userSql.validateUserTel(loginTel), (err, results) => {
//     if (!err) {
//       const uid = results[0].id;
//       if (!!isDefault) { // 为默认
//         conn.query(updateDefault({ uid }));
//       }
//       conn.query(addressSql.updateAddress({
//         id, name, tel, province, city, county, country, addressDetail, isDefault, areaCode
//       }), (err) => {
//         if (!err) {
//           res.send({
//             code: 0,
//             success: true,
//             message: '编辑成功',
//             data: []
//           })
//         }
//       });
//     }
//   })
// })

// 删除地址
// router.post('/api/address/delete', (req, res, next) => {
//   const { token } = req.headers;
//   const { tel: loginTel } = jwt.decode(token);
//   const { id } = req.body;
//   conn.query(userSql.validateUserTel(loginTel), (err, results) => {
//     if (!err) {
//       conn.query(addressSql.deleteAddress({ id }), (err) => {
//         if (!err) {
//           res.send({
//             code: 0,
//             success: true,
//             message: '删除成功',
//             data: []
//           })
//         }
//       });
//     }
//   })
// })

// 获取地址
// router.post('/api/address', (req, res, next) => {
//   const { token } = req.headers;
//   const { tel } = jwt.decode(token);

//   conn.query(userSql.validateUserTel(tel), (err, results) => {
//     if (!err) {
//       const uid = results[0].id;
//       conn.query(addressSql.selectAddress({ uid }), (err, results) => {
//         if (!err) {
//           res.send({
//             code: 0,
//             success: true,
//             data: results
//           })
//         }
//       })
//     }
//   })
// })

// 生成订单
// router.post('/api/order/add', (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     const { tel } = jwt.decode(token);

//     const { goodsGroup } = req.body; 
//     let goodsNameArr = [],
//         goodsNum = 0,
//         goodsPrice = 0;
//     goodsGroup.forEach(item => {
//       goodsNameArr.push(item.goods_name);
//       goodsNum += parseInt(item.goods_num);
//       goodsPrice += parseInt(item.goods_price) * parseInt(item.goods_num);
//     });
//     let goodsName = goodsNameArr.join(',');

//     conn.query(userSql.validateUserTel(tel), (err, results) => {
//       if (!err) {
//         const uid = results[0].id;
//         const orderID = generateOrderID();
//         conn.query(orderSql.insertOrder({
//           uid, orderID, goodsName, goodsNum, goodsPrice
//         }), (err, results) => {
//           if (err) console.log('orderInsert', err);
//           if (!err) {
//             conn.query(orderSql.selectOrderByOrderID({ orderID }), (err, results) => {
//               if (err) console.log('orderSelect', err);
//               if (!err) {
//                 res.send({
//                   code: 0,
//                   data: results
//                 })
//               }
//             })
//           }
//         })

//       }
//     })
//   } catch (error) {
//     console.log(error);
//   }
//
//   function generateOrderID() {
//     return Date.now().toString() + Math.floor(Math.random() * (999999 - 100000) + 100000);
//   }
// })

// 提交订单
// router.post('/api/order/submit', (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     const { tel } = jwt.decode(token);
    
//     const { orderId, selectedIds } = req.body;
//     conn.query(userSql.validateUserTel(tel), (err, results) => {
//       if (!err) {
//         const uid = results[0].id;
//         conn.query(orderSql.selectOrderByOrderID({ orderID:  orderId}), (err, results) => {
//           console.log("select", err);
//           if (!err) {
//             conn.query(orderSql.updateStatus({
//               orderStatus: 2,
//               uid,
//               orderId,
//             }), (err, results) => {
//               if(!err) {
//                 conn.query(goodsSql.deleteCart({ ids: selectedIds }), (err, results) => {
//                   if (!err) {
//                     res.send({
//                       code: 0,
//                       success: true,
//                       message: '更改成功',
//                       data: []
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })  
//       }
//     })
//   } catch (error) {
//     console.log("???", error);
//   }
// })

//发起支付
// router.post('/api/order/pay', (req, res, next) => {
//   try {
//     const { orderId, name, price } = req.body;
//     const { token } = req.headers;
//     const { tel } = jwt.decode(token);

//     const formData = new AlipayFormData();
//     // 调用 setMethod 并传入 get，会返回可跳转到支付页面的url
//     formData.setMethod('get');
//     // 支付时信息
//     formData.addField('bizContent', {
//       outTradeNo: orderId,
//       productCode: 'FAST_INSTANT_TRADE_PAY',
//       totalAmount: price,
//       subject: name,
//     });
//     // 支付成功失败跳转链接
//     formData.addField('returnUrl', 'http://localhost:8080/pay');
//     alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData }).then(resp => {
//       res.send({
//         code: 0,
//         success: true,
//         msg: '支付成功',
//         data: {
//           redirectUrl: resp
//         }
//       })
//     })
//   } catch (error) {
//     console.log("err", error);
//   }

// })


// 支付状态
// router.post('/api/payment/result', (req, res, next) => {
//   const { token } = req.headers;
//   const { tel } = jwt.decode(token);

//   const { trade_no, out_trade_no } = req.body;
//   const formData = new AlipayFormData();
//     // 调用 setMethod 并传入 get，会返回可跳转到支付页面的url
//     formData.setMethod('get');
//     // 支付时信息
//     formData.addField('bizContent', {
//       trade_no,
//       out_trade_no
//     });
//     // 支付成功失败跳转链接
//     formData.addField('returnUrl', 'http://localhost:8080/pay');
//     alipaySdk.exec('alipay.trade.query', {}, { formData: formData }).then(resp => {
//       axios({
//         url: resp,
//         method: 'GET',
//       }).then(data => {
//         const resCode = data.data.alipay_trade_query_response;
//         if (resCode === '10000') {
//           switch(  responseCode.trade_status  ){
//             case 'WAIT_BUYER_PAY':
//               res.send({
//                 data: {
//                   code: 1001,
//                   success: false,
//                   message: '支付宝有交易记录，没付款'
//                 }
//               })
//               break;
//             case 'TRADE_CLOSED':
//               res.send({
//                 data: {
//                   code: 1002,
//                   success: false,
//                   message: '交易关闭'
//                 }
//               })
//               break;
//             case 'TRADE_FINISHED':
//               connection.query(userSql.validateUserTel(tel), (err,results) => {
//                 //用户id
//                 let uid = results[0].id;
//                 connection.query(selectOrderByOrderID(out_trade_no), (err,result) => {
//                   let id = result[0].id;
//                   //订单的状态修改掉2==》3
//                   connection.query(updateStatus({
//                     uid,
//                     orderId: out_trade_no,
//                     orderStatus: 3
//                   }), () => {
//                     res.send({
//                       data:{
//                         code: 0,
//                         success: true,
//                         message: '交易完成',
//                         data: []
//                       }
//                     })
//                   })
//                 })
//               })
//               break;
//             case 'TRADE_SUCCESS':
//               connection.query(userSql.validateUserTel(tel), (err,results) => {
//                 //用户id
//                 let uid = results[0].id;
//                 connection.query(selectOrderByOrderID(out_trade_no), (err,result) => {
//                   let id = result[0].id;
//                   //订单的状态修改掉2==》3
//                   connection.query(updateStatus({
//                     uid,
//                     orderId: out_trade_no,
//                     orderStatus: 3
//                   }), () => {
//                     res.send({
//                       data:{
//                         code: 0,
//                         success: true,
//                         message: '交易完成',
//                         data: []
//                       }
//                     })
//                   })
//                 })
//               })
//             break;
//           }
//         } else if (resCode === '40004') {
//           res.send({
//             code: 404,
//             success: false,
//             message: '交易不存在'
//           })
//         }
//       }).catch(err => {
//         res.send({
//           code: 500,
//           success: false,
//           message: '交易失败'
//         })
//       })
//     })
// })

// 获取订单
// router.post('/api/order', (req, res, next) => {
//   const { token } = req.headers;
//   const { tel } = jwt.decode(token);
//   const { orderId } = req.body;

//   conn.query(userSql.validateUserTel(tel), (err, results) => {
//     if (!err) {
//       conn.query(orderSql.selectOrderByOrderID(orderId))
//     }
//   })
// })
module.exports = router;
