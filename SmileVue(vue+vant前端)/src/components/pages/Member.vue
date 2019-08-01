<template>
  <div>
    <div>
      <van-nav-bar  title="我的" />
    </div>
    <div class="top">
      <img :src="img" class="top-img" />
      <div class="name">{{name}}</div>
    </div>
    <div class="login">
      <div class="login-div" v-if="isLogin"><a class="login-a" @click="goLogin" >我要登录</a></div>
      <div class="register-div" v-if="isRegister"><a class="register-a" @click="goRegister">我要注册</a></div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link @click="go"/>
        <van-cell title="地址管理" is-link  @click="go"/>
        <van-cell title="我的订单" is-link @click="go" />
        <van-cell title="会员权益" is-link @click="go" />
        <van-cell title="联系我们" is-link  @click="go"/>
        <van-cell title="退出" v-if="!isLogin" is-link  @click="logout"/>
      </van-cell-group>

    </div>

  </div>
</template>

<script>
  import {Toast,Dialog} from 'vant'
  export default {
     data(){
       return{
          img:require('../../assets/images/man.png'),
          name:'',
          isLogin:true,
          isRegister:true
       }
     },
    created(){
      if(localStorage.getItem('userName')){
         this.isLogin=false
         this.name=localStorage.getItem('userName')
      }
      if(localStorage.getItem('isRegister')||localStorage.getItem('userName')){
        this.isRegister=false
      }
    },
    methods:{
       goLogin(){
         this.$router.push({name:'Login'})
       },
      goRegister(){
         this.$router.push({name:"Register"})
      },
      go(){
         Toast.fail('暂未开通')
      },
      logout(){

        Dialog.confirm({
          title: '退出',
          message: '是否退出'
        }).then(() => {
          this.isLogin=true
          this.name=''
          localStorage.removeItem('userName')
        }).catch((e) => {
          console.log(e)
        });
      }
    }

  }
</script>

<style scoped>
  .top-img{
    width:70px;
    height: 70px;
    border-radius: 50px;
  }
  .top{
    height:7rem;
    text-align: center;
    padding-top:2rem;
    background-color: #EEA2AD;
  }
  .login{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding:10px;
  }
  .login div{
    flex:1;
    text-align: center;
  }
  .name{
    color: #FFFFFF;
    font-size:1.2rem;
  }
  .login-a{
    font-size:1rem;
    color:#e5017d;
  }
 .register-a{
   font-size:1rem;
   color: #32ef5d;
 }
</style>
