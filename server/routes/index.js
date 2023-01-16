const express = require('express');
const conn = require('../db/sql');
const userSql = require('../db/userSql');
var QcloudSms = require("qcloudsms_js");

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//首页推荐
router.get('/api/index_list/0/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      topBar: [
        { id: 0, label: '推荐'},
        { id: 1, label: '大红袍'},
        { id: 2, label: '铁观音'},
        { id: 3, label: '绿茶'},
        { id: 4, label: '普洱'},
        { id: 5, label: '茶具'},
        { id: 6, label: '花茶'},
      ],
      data: [
        // swiper
        { 
          id: 0,
          type: 'swiperList',
          data: [
            { id: 0, imgUrl: './images/swiper1.jpeg' },
            { id: 1, imgUrl: './images/swiper2.jpeg' },
            { id: 2, imgUrl: './images/swiper3.jpeg' },
          ]
        },
        // icons
        { 
          id: 1,
          type: 'iconsList',
          data: [
            {
                id: 1,
                title: '自饮茶',
                imgUrl: './images/icons1.png'
            },
            {
                id: 2,
                title: '茶具',
                imgUrl: './images/icons2.png'
            },
            {
                id: 3,
                title: '茶礼盒',
                imgUrl: './images/icons3.png'
            },
            {
                id: 4,
                title: '领福利',
                imgUrl: './images/icons4.png'
            },
            {
                id: 5,
                title: '官方验证',
                imgUrl: './images/icons5.png'
            },
          ]
        },
        // 爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id:1,
              name:'龙井1號铁罐250g',
              content:'鲜爽甘醇 口粮首选',
              price:'68',
              imgUrl:'./images/recommend.jpeg'
            },
            {
              id:2,
              name:'龙井1號铁罐250g',
              content:'鲜爽甘醇 口粮首选',
              price:'68',
              imgUrl:'./images/recommend.jpeg'
            }
          ]
        },
        // 猜你喜欢
        {
          id: 4,
          type: 'likeList',
          data: [
            {
              id: 1,
              name: '龙井1號铁罐250g',
              price: 299,
              imgUrl: './images/goods1.jpg'
            },
            {
              id: 2,
              name: '龙井2號铁罐250g',
              price: 399,
              imgUrl: './images/goods2.jpg'
            },
            {
              id: 3,
              name: '龙井3號铁罐250g',
              price: 199,
              imgUrl: './images/goods3.jpg'
            },
            {
              id: 4,
              name: '龙井4號铁罐250g',
              price: 189,
              imgUrl: './images/goods4.jpg'
            },
            {
              id: 5,
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
              imgUrl: './images/like.jpeg'
            },
            {
              id: 6,
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
              imgUrl: './images/like.jpeg'
            },
            {
              id: 7,
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
              imgUrl: './images/like.jpeg'
            },
            {
              id: 8,
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
              imgUrl: './images/like.jpeg'
            },
            {
              id: 9,
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
              imgUrl: './images/like.jpeg'
            },
            {
              id: 10,
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
              imgUrl: './images/like.jpeg'
            },
          ]
        }
      ]
    }
  })
})

// 首页大红袍
router.get('/api/index_list/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 1,
        type: 'adList',
        data: [
          {
            id: 1,
            imgUrl: './images/dhp.jpeg',
          },
        ]
      }
    ]
  })
})

// 铁观音
router.get('/api/index_list/2/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 1,
        type: 'adList',
        data: [
          {
            id: 1,
            imgUrl: './images/tgy.jpeg',
          },
        ]
      }
    ]
  })
})

// 查询商品数据接口
router.get('/api/goods/shopList', function(req, res, next) {
  // console.log(req.query);
  let kwd = req.query.keyword;
  const [orderName] = Object.keys(req.query.order);
  const [orderBy] = Object.values(req.query.order);
  const sql = `select * from shopList where name like '%${kwd}%' ${ orderName !== 'combination' ? `order by ${orderName} ${orderBy}` : '' }`;
  conn.query(sql, (error, results) => {
    // console.log(results);
    res.send({
      code: 0,
      data: results
    })
  })
})

// 分类接口
router.get('/api/goods/list', function(req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 1,
        name: '推荐',
        children: [
          {
            id: 1,
            name: '铁观音',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 2,
            name: '功夫茶具',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 3,
            name: '茶具电器',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 4,
            name: '紫砂壶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 5,
            name: '龙井',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 6,
            name: '武夷岩茶',
            imgUrl: '/images/list1.jpeg',
          },
        ]
      },
      {
        id: 2,
        name: '绿茶',
        children: [
          {
            id: 1,
            name: '龙井',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 2,
            name: '碧螺春',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 3,
            name: '毛尖',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 4,
            name: '毛峰',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 5,
            name: '蒙顶茶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 6,
            name: '雨花茶',
            imgUrl: '/images/list1.jpeg',
          },
        ]
      },
      {
        id: 3,
        name: '红茶',
        children: [
          {
            id: 1,
            name: '日照红茶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 2,
            name: '祁红',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 3,
            name: '昭平红',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 4,
            name: '霍红',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 5,
            name: '滇红',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 6,
            name: '越红',
            imgUrl: '/images/list1.jpeg',
          },
        ]
      },
      {
        id: 4,
        name: '白茶',
        children: [
          {
            id: 1,
            name: '白毫银针',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 2,
            name: '白牡丹',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 3,
            name: '寿眉',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 4,
            name: '贡眉',
            imgUrl: '/images/list1.jpeg',
          },
        ]
      },
      {
        id: 5,
        name: '黑茶',
        children: [
          {
            id: 1,
            name: '湖南黑茶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 2,
            name: '湖北青磚茶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 3,
            name: '四川藏茶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 4,
            name: '安徽古黟黑茶',
            imgUrl: '/images/list1.jpeg',
          },
          {
            id: 5,
            name: '安徽古黟黑茶',
            imgUrl: '/images/list1.jpeg',
          },
        ]
      },
    ]
  })
})

// 查询商品
router.get('/api/goods/:id', function (req, res, next) {
  const shoplist = [
    {
      id: 1,
      name: '龙井1號铁罐250g',
      price: 299,
      imgUrl: '/images/goods1.jpg'
    },
    {
      id: 2,
      name: '龙井2號铁罐250g',
      price: 399,
      imgUrl: '/images/goods2.jpg'
    },
    {
      id: 3,
      name: '龙井3號铁罐250g',
      price: 199,
      imgUrl: '/images/goods3.jpg'
    },
    {
      id: 4,
      name: '龙井4號铁罐250g',
      price: 189,
      imgUrl: '/images/goods4.jpg'
    },
    {
      id: 5,
      name: '建盏茶具套装 红色芝麻毫 12件套',
      price: 299,
      imgUrl: './images/like.jpeg'
    },
    {
      id: 6,
      name: '建盏茶具套装 红色芝麻毫 12件套',
      price: 299,
      imgUrl: './images/like.jpeg'
    },
    {
      id: 7,
      name: '建盏茶具套装 红色芝麻毫 12件套',
      price: 299,
      imgUrl: './images/like.jpeg'
    },
    {
      id: 8,
      name: '建盏茶具套装 红色芝麻毫 12件套',
      price: 299,
      imgUrl: './images/like.jpeg'
    },
    {
      id: 9,
      name: '建盏茶具套装 红色芝麻毫 12件套',
      price: 299,
      imgUrl: './images/like.jpeg'
    },
    {
      id: 10,
      name: '建盏茶具套装 红色芝麻毫 12件套',
      price: 299,
      imgUrl: './images/like.jpeg'
    },
  ]
  const id = +req.params.id;
  res.send({
    code: 0,
    data: shoplist.filter(item => item.id === id),
  })
})

// 登录接口
router.post('/api/login', function(req, res, next) {
  const { userTel, userPwd } = req.body;
  conn.query(userSql.validateUserTel(userTel), (err, results) => {
    if (results?.length) {
      console.log(results);
      conn.query(userSql.validateUserPwd(userTel, userPwd), (err, pwdResults) => 
       {
        console.log(userSql.validateUserPwd(userTel, userPwd),'pwdResults:',pwdResults);
        if (pwdResults?.length) {
          const userMsg = [...pwdResults];
          delete userMsg.pwd;
          res.send({
            code: 200,
            success: true,
            msg: '登录成功',
            data: [...userMsg],
          })
        } else {
          res.send({
            code: 302,
            success: false,
            msg: '密码错误',
          })
        }
      })
    } else {
      res.send({
        code: 301,
        success: false,
        msg: '手机号不存在',
      })
    }
  })
})

// 短信验证码接口
//发送短信验证码
router.post('/api/login/code',function(req,res,next){
	let tel = req.body.phone;
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
	        console.log("err: ", err);
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
	var params = [  Math.floor( Math.random()*(9999-1000))+1000   ];
	ssender.sendWithParam(86, phoneNumbers[0], templateId,
	  params, smsSign, "", "", callback);  // 签名参数不能为空串
})

// 添加用户
router.post('/api/addUser', function(req, res, next) {
  const { userTel } = req.body;
  conn.query(userSql.validateUserTel(userTel), (err, results) => {
    if (results?.length) {
      res.send({
        code: 0,
        success: true,
        message: '登录成功',
        data: results[0],
      })
    } else {
      // 不存在用户，新增一个用户
      conn.query(userSql.insertUser({ userTel, }), (err, results) => {
        console.log("insertUser",err, results);
        if (!err) {
          conn.query(userSql.validateUserTel(userTel), (err, userResults) => {
            console.log('queryUser', err, userResults[0]);
            if (userResults?.length) {
              res.send({
                code: 0,
                success: true,
                message: '登录成功',
                data: userResults[0],
              })
            }
          });
        }
      })
    }
  })
})

// 登录接口
router.post('/api/addUser', function(req, res, next) {
  const { userTel } = req.body;
  conn.query(userSql.validateUserTel(userTel), (err, results) => {
    if (results?.length) {
      res.send({
        code: 0,
        success: true,
        message: '登录成功',
        data: results[0],
      })
    } else {
      // 不存在用户，新增一个用户
      conn.query(userSql.insertUser({ userTel, }), (err, results) => {
        console.log("insertUser",err, results);
        if (!err) {
          conn.query(userSql.validateUserTel(userTel), (err, userResults) => {
            console.log('queryUser', err, userResults[0]);
            if (userResults?.length) {
              res.send({
                code: 0,
                success: true,
                message: '登录成功',
                data: userResults[0],
              })
            }
          });
        }
      })
    }
  })
})

// 注册接口
router.post('/api/register', function(req, res, next) {
  const { userTel, userPwd } = req.body;

  conn.query(userSql.validateUserTel(userTel), (err, results) => {
    if (results?.length) {
      res.send({
        code: 401,
        success: false,
        msg: '用户已存在'
      })
    } else {
      conn.query(userSql.insertUser({ userTel, userPwd }), (err, results) => {
        console.log("insertUser",err, results);
        if (!err) {
          conn.query(userSql.validateUserTel(userTel), (err, userResults) => {
            console.log('queryUser', err, userResults[0]);
            if (userResults?.length) {
              res.send({
                code: 0,
                success: true,
                message: '登录成功',
                data: userResults[0],
              })
            }
          });
        }
      })
    }
  })
})
module.exports = router;
