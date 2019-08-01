<template>
    <div>
      <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
      <div class="register-panel">
        <van-field
          v-model="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          left-icon="contact"
          @click-icon="username = ''"
          :error-message="userNameErrmsg"
        />

        <van-field
          v-model="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          required
          left-icon="eye-o"
          :error-message="passwordErrmsg"
        />

        <div class="register-button">
          <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">立即注册</van-button>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import url from '../../serviceAPI.js'
   import { Toast } from 'vant'

    export default {

        data(){
          return{
            username:'',
            password:'',
            userNameErrmsg:'',
            passwordErrmsg:'',
            openLoading:false // 是否开启用户注册的Loading状态
          }
        },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        registerAction() {
          this.checkForm() && this.register()
        },
        checkForm() {
          let isOk = true;
          if (this.username.length < 5) {
            this.userNameErrmsg = "用户名不能少于5位";
            isOk = false
          } else {
            this.userNameErrmsg = ''
          }
          if (this.password.length < 6) {
            this.passwordErrmsg = '密码不能少于6位';
            isOk = false
          } else {
            this.passwordErrmsg = ''
          }
          return isOk
        },
        register(){
          this.openLoading=true;
            axios({
              url:url.registerUser,
              method:'post',
              data:{
                userName:this.username,
                password: this.password
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.code==200){
                  Toast.success(res.data.message);
                  this.$router.push('/')
                  let isRegister=true
                  localStorage.setItem('isRegister',isRegister)
                }else{
                  this.openLoading=false;
                  Toast.fail('注册失败');
                }

              })
              .catch((err)=>{
                this.openLoading=false;
                Toast.fail('注册失败');
              })
        }
      }
    }
</script>

<style scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>
