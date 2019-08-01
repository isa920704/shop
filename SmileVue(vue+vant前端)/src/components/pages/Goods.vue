<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topImg">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-price">￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title="评价">
         <div class="comment">暂无评价</div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import url from '../../serviceAPI.js'
  import {toMoney} from '@/filter/moneyFilter.js'
  import { Toast } from 'vant'

    export default {
        data(){
          return{
            goodsId:'',
            goodsInfo:''
          }
        },
      created() {
        this.goodsId= this.$route.query.goodsId ?this.$route.query.goodsId : this.$route.params.goodsId
        console.log(this.goodsId)
        this.getInfo()
      },
      filters:{
        moneyFilter(money){
          return toMoney(money)
        }
      },
      methods:{
        getInfo(){
          axios({
            url:url.getDetailGoodsInfo,
            method:'post',
            data:{
              goodsId:this.goodsId
            }
          })
          .then(res=>{
            console.log(res)
            if(res.data.code==200){
              this.goodsInfo=res.data.message
            }else{
              Toast.success('服务器错误，数据获取失败')
            }
          })
          .catch(err=>{
            console.log(err)
          })
        },
        onClickLeft(){
          this.$router.go(-1)
        },
        addGoodsToCart(){
          if(!localStorage.getItem('userName')){
            Toast.fail('请先登录')
            this.$router.push({name:'Login'})
          }else{
            //取出本地购物车中的商品
            let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
            let isHaveGoods = cartInfo.find(cart=>cart.goodsId== this.goodsId)
            console.log(isHaveGoods)
            console.log(this.goodsInfo)
            if(!isHaveGoods){
              let newGoodsInfo = {
                goodsId:this.goodsInfo.ID,
                name:this.goodsInfo.NAME,
                price:this.goodsInfo.PRESENT_PRICE,
                image:this.goodsInfo.IMAGE1,
                count:1
              }
              cartInfo.push(newGoodsInfo)
              localStorage.cartInfo = JSON.stringify(cartInfo)
              Toast.success('添加成功')
            }else{
              Toast.success('已有此商品')
            }
            this.$router.push({name:'Cart'})
          }



        }

      }
    }
</script>

<style scoped>
  .detail{
    font-size:0px;
  }
  .goods-name{
    background-color: #fff;
    font-size:14px;
    padding:5px 0 5px 10px;
  }
  .goods-price{
    background-color: #fff;
    padding-top:5px;
    padding-left:10px;
    color: red;
  }
  .comment{
    font-size:14px;
    text-align: center;
    color: #888888;
  }
  .goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom > div{
    flex:1;
    padding:5px;
  }

</style>
