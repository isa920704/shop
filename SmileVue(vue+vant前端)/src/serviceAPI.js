const BASEURL='https://www.easy-mock.com/mock/5caac707828c3a52184cd26c/SmileVue/'
const LOCALURL='http://localhost:3000/';
//const LOCALURL='http://120.79.161.167:3000/';
const URL={
   getshoppingMallInfo : BASEURL+'index',
   getGoodsInfo : BASEURL+'getGoodsInfo',
   registerUser : LOCALURL+'user/register', //用户注册接口
   loginUser : LOCALURL+'user/login', //用户登录接口
   getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo', //获取商品详情
   getCategoryList : LOCALURL+'goods/getCategoryList', //获取商品大类别
   getCategorySubList : LOCALURL+'goods/getCategorySubList',//获取商品小类别
   getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID'//根据商品类别获取商品
}

module.exports= URL



