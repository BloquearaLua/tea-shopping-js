var express = require('express');
var router = express.Router();

//首页推荐
router.get('/index_list/0/data/1', function (req, res, next) {
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
                name: '赛事茶',
                price: 238,
                imgUrl: './images/goods1.jpg'
              },
              {
                id: 2,
                name: '茶具',
                price: 26,
                imgUrl: './images/goods2.jpg'
              },
              {
                id: 3,
                name: '绿茶',
                price: 118,
                imgUrl: './images/goods3.jpg'
              },
              {
                id: 4,
                name: '明前春茶',
                price: 98,
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
  router.get('/index_list/1/data/1', function (req, res, next) {
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
  router.get('/index_list/2/data/1', function (req, res, next) {
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
  
module.exports = router;