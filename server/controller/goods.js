const goodsDao = require('../dao/goods');

async function getGoods(req, res, next) {
    console.log("-0-");
    try {
        const { id } = req.params;
        const goods = await goodsDao.getGoodsById({ goodsId: id });
        if (goods?.length) {
            res.send({
                code: 0,
                success: true,
                data: goods,
            })
        }
    } catch (error) {
        res.send({
            code: 0,
            success: false,
            msg: error
        })
    }
}


async function getGoodsList(req, res, next) {
    try {
        let { keyword, order } = req.query;
        let orderStr = "";
        if (order) {
            const orderName = Object.keys(order);
            const orderBy = Object.values(order);
            orderStr = `${orderName[0]} ${orderBy[0]}`;
            if (orderName.length > 1) {
                orderStr += `, ${orderName[1]} ${orderBy[1]}`;
            }
        }
        const goodsList = await goodsDao.selectGoodsList({
            keyword,
            order,
            orderStr,
        })
        res.send({
            code: 0,
            success: true,
            data: goodsList
        })
    } catch (error) {
        res.send({
            code: 0,
            success: false,
            msg: error
        })
    }
}


async function getGoodsCategory(req, res, next) {
    console.log("???????????");
    try {
        console.log("?????????");
        res.send({
            code: 0,
            success: true,
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
    } catch (error) {
        res.send({
            code: 0,
            success: false,
            msg: error
        })
    }
}

module.exports = {
    getGoods,
    getGoodsList,
    getGoodsCategory,
}