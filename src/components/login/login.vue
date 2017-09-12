<template>
  <div>
    <h1>life</h1>

    <group>
      <x-input title="用户名" placeholder="请输入用户名" v-model="username" text-align="right"
               placeholder-align="right"></x-input>
      <x-input title="密码" placeholder="请输入密码" v-model="password" type="password" text-align="right"
               placeholder-align="right"></x-input>
      <x-switch title="记住我" v-model="remember"></x-switch>
      <x-button type="primary" @click.native="submit()">登录</x-button>
    </group>
    <!--<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>-->
    <!--<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>-->
    <!--<mt-button type="primary" size="large" @click="submit">登录</mt-button>-->
  </div>
</template>
<script>
  import {Group, XButton, XInput, XSwitch } from 'vux'
  import {baseUrl} from '@/config/env.js';
  import {mapActions} from 'vuex';
  import $ from 'jquery';

  export default {
    data() {
      return {
        username: '',
        password: '',
        remember: false
      }
    },
    components: {
      Group,
      XButton,
      XInput,
      XSwitch
    },
    mounted() {
      if(localStorage.getItem('username')){
        this.username = localStorage.getItem('username');
      }
      if(localStorage.getItem('password')){
        this.password = localStorage.getItem('password');
      }
      if(localStorage.getItem('remember')){
        this.remember = Boolean(localStorage.getItem('remember'));
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      submit() {
        if (this.username.length != null && this.username.length == 0) {
          this.$vux.toast.text('请输入用户名', 'middle');
          return;
        }
        else if (this.password.length != null && this.password.length == 0) {
          this.$vux.toast.text('请输入密码', 'middle');
          return;
        }
        let self = this;
        $.ajax({
          url: baseUrl + '/api/login',
          data: {username: this.username, password: this.password},
          async: false,
          type: 'post',
          success: function (data, status) {
            if (data.code != 0) {
              self.$vux.toast.text('用户名或密码错误', 'middle');
            } else {
              if(self.remember){
                localStorage.setItem('username', self.username);
                localStorage.setItem('password', self.password);
                localStorage.setItem('remember', 'true');
              }else{
                if(localStorage.getItem('username')){
                  localStorage.removeItem('username');
                }
                if(localStorage.getItem('password')){
                  localStorage.removeItem('password');
                }
                if(localStorage.getItem('remember')){
                  localStorage.removeItem('remember');
                }
              }
              sessionStorage.setItem('userInfo', JSON.stringify(data.data));
              self.$router.push({path: '/index/tab'});
            }
          }
        });

      }
    }
  }
</script>
<style>

</style>
