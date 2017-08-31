<template>
  <div>
    <div class="wrapper" ref="wrapper" style="overflow: hidden;border-top: solid gray;margin-top: -60px">
      <div class="content" style="margin-top: -20px">
        <group style="">
          <datetime v-model="date" title="日期" start-date="2017-01-01" :end-date="date" year-row="{value}年" month-row="{value}月" day-row="{value}日"
                    style=";padding-left: 24px;text-decoration:none;height: 50px;border-bottom: solid 1px"></datetime>
          <x-input title="金额" placeholder="请输入金额" v-model="money" type="number" text-align="right" placeholder-align="right"
                   style=";height: 50px;border-bottom: solid 1px"></x-input>
          <divider>选择消费人</divider>
          <checker
            v-model="checked"
            type="checkbox"
            default-item-class="item"
            selected-item-class="item-selected"
          >
            <checker-item v-for="list in checkList" :key="list.id" :value="list.id" >{{list.name}}</checker-item>
          </checker>
          <x-textarea :max="80" placeholder="备注" v-model="comment" style="margin-top: 5%;padding-left: 0px;border: solid 1px"></x-textarea>
          <x-button type="primary" @click.native="commit()" style="margin-top: 5%">提交</x-button>
        </group>
      </div>
    </div>

  </div>
</template>
<script>
  import $ from 'jquery';
  import BScroll from 'better-scroll'
  import {baseUrl} from '@/config/env.js'
  import {getToken,getUserId} from '@/components/common/common'
  import {Datetime,Group,XButton, XInput,XTextarea,Checker,CheckerItem,Divider } from 'vux';
  export default {
    components:{
      Group,
      XButton,
      XInput,
      Datetime,
      XTextarea,
      Checker,
      CheckerItem,
      Divider
    },
    data(){
      return {
        money:'',
        comment:'',
        date:'',
        checkList:'',
        checked:''
      }
    },
    methods:{
      setDefaultCheck(){
        let userId = getUserId();
        this.checked = [userId];//默认当前用户为消费人
      },
      commit(){
        if(this.money == ''){
          this.$vux.toast.text('金额不能为空', 'middle');
          return;
        }
        if(this.checked == ''){
          this.$vux.toast.text('消费人不能为空', 'middle');
          return;
        }
        let userId = getUserId();
        let log = false;

        for(let i in this.checked){
          if(this.checked[i] == userId){
            log = true;
            break;
          }
        }

        if(!log){
          this.$vux.toast.text('本人必须是消费人之一', 'middle');
          return;
        }

        let self = this;
        let url = baseUrl + '/api/add';
        let data = {
          time:this.date,
          money:this.money,
          check:this.checked,
          comment: this.comment,
          token: getToken()
        };
        $.ajax({
          url:url,
          type:'post',
          data:data,
          success:function (data) {
            if(data.code == 0){
              self.$vux.toast.text(data.data.message, 'middle');
              //初始化数据
              self.date = self.getDate();
              self.money = '';
              self.setDefaultCheck();
              self.comment = '';
            }else if(data.code = 444){
              self.$vux.toast.text(data.data, 'middle');
            }else {
              self.$vux.toast.text('未知错误', 'middle');
            }
          }
        })
      },
      getUserList(){
        let self = this;
        let url = baseUrl + '/api/user_list?token=' + getToken();
        $.ajax({
          url:url,
          type: 'get',
          success:function (data) {
            if(data.code == 0){
              self.checkList = data.data;
            } else if (data.code == 401) {
              self.$vux.toast.text('登录过期，请重新登录', 'middle');
              self.$router.push({path: '/'});
            }
            else {
              self.$vux.toast.text('未知错误', 'middle');
            }
          }
        })
      },
      getDate(){
        let myDate = new Date();
        let seperator1 = "-";
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let strDate = myDate.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }

        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
      }
    },
    created(){
      this.setDefaultCheck();
      this.date = this.getDate();

    },
    mounted() {
      this.getUserList();

      window.onresize = () => {
        $(".wrapper").height($(window).height() - $(".weui-tabbar").height());
      };

      this.$nextTick(function () {
        $(".wrapper").height($(window).height() - $(".weui-tabbar").height());
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click:true
        })
      })
    }
  }
</script>
<style>
  .item {
    width: 70px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }
  .item-selected {
    background: #ffffff url(../../../assets/add/active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
