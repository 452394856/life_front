<template>
  <div>
    <group>
      <x-button type="primary" @click.native="showPopup()">修改密码</x-button>
      <x-button type="primary" @click.native="logout">退出登录</x-button>
    </group>
    <div v-transfer-dom>
      <popup v-model="show" position="top" :height="height" :hide-on-blur="false" :show-mask="false">
        <div>
          <group style="margin-top:-20px">
            <x-header>密码修改
              <x-icon slot="overwrite-left" type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click.native="closePopup()"></x-icon>
            </x-header>
            <x-input title="旧密码" placeholder="请输入旧密码" v-model="oldPassword" type="password" text-align="right"
                     placeholder-align="right" style="margin-top: 40px"></x-input>
            <x-input title="新密码" placeholder="请输入新密码" v-model="newPassword" type="password" text-align="right"
                     placeholder-align="right"></x-input>
            <x-input title="确认新密码" placeholder="请确认新密码" v-model="ensurePassword" type="password" text-align="right"
                     placeholder-align="right"></x-input>

            <x-button type="primary" @click.native="commit()" style="margin-top: 60px">提交</x-button>
          </group>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import {Group, XButton, Popup, TransferDom, XInput, XHeader} from 'vux'
  import {baseUrl} from '@/config/env.js'
  import {getToken} from '@/components/common/common'

  export default {
    data() {
      return {
        show: false,
        height: '',
        oldPassword: '',
        newPassword: '',
        ensurePassword: '',
        style: {
          position: 'absolute'
        },
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.height = ($(window).height() - $(".weui-tabbar").height()) + 'px';
      })
    },
    directives: {
      TransferDom
    },
    components: {
      Group,
      XButton,
      Popup,
      XInput,
      XHeader
    },
    methods: {
      logout() {
        sessionStorage.clear();
        this.$router.push({path: '/'});
      },
      showPopup() {
        this.show = true;
      },
      closePopup() {
        this.show = false;
      },
      commit() {
        if (this.oldPassword.length != null && this.oldPassword.length == 0) {
          this.$vux.toast.text('请输入旧密码', 'middle');
          return;
        }
        if (this.newPassword.length != null && this.newPassword.length == 0) {
          this.$vux.toast.text('请输入新密码', 'middle');
          return;
        }
        if (this.ensurePassword.length != null && this.ensurePassword.length == 0) {
          this.$vux.toast.text('请确认新密码', 'middle');
          return;
        }
        if (this.ensurePassword != this.newPassword) {
          this.$vux.toast.text('新密码不一致，请重新输入', 'middle');
          this.newPassword = '';
          this.ensurePassword = '';
          return;
        }

        let self = this;
        let url = baseUrl + '/api/edit_password';
        let data = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          ensurePassword: this.ensurePassword,
          token: getToken()
        };

        $.ajax({
          url: url,
          type: 'post',
          data: data,
          success: function (data) {
            if (data.code == 0) {
              self.$vux.toast.text('修改成功，请重新登录', 'middle');
              sessionStorage.clear();
              self.$router.push({path: '/'});
            }else if(data.code == 401){
              self.$vux.toast.text('登录过期，请重新登录', 'middle');
              self.$router.push({path: '/'});
            }else if(data.code == -1){
              self.$vux.toast.text(data.data.msg, 'middle');
            }else {
              self.$vux.toast.text('未知错误', 'middle');
            }
          }
        })
      }
    },
  }
</script>
<style>
  body {
    position: static !important;
    /*width: 100%;*/
  }
</style>
