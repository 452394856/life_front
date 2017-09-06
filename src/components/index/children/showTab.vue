<template>
  <div>
    <div id="headtop">
      <group style="margin-top:-60px;height: 10%">
        <x-button type="primary" @click.native="showPlugin">{{ date }}</x-button>
      </group>
    </div>

    <div class="wrapper" ref="wrapper" style="overflow: hidden;border-top: solid gray;">
      <div class="content" style="margin-top: 0px">
        <div style="padding-top: 3px;padding-bottom: 3px;;height: 70px ;border-radius:8px;margin-bottom: 5px;" v-for="(tab, i) in table"
             @click="showComment(tab.comment)" :class="tabClass(i)">
          <div style="margin-left:5px;float: left;height: 100%;width: 15%;background: #7EC0EE;text-align: center" :class="tabClass(i)"><p
            style="line-height: 35px;font-size: large">{{tab.time}}</p></div>
          <div style=" margin-left:5px;float: left;height: 30px;width: 40%;background: #D4D4D4" :class="tabClass(i)"><p
            style="line-height: 0px;font-size: large;float: left">付款人：{{tab.name}}</p></div>
          <div style=" margin-left:5px;float: left;height: 30px;width: 40%;background: #D4D4D4" :class="tabClass(i)"><p
            style="line-height: 0px;font-size: large;float: left">金额：{{tab.money}}</p></div>
          <div style="margin-top:5px; margin-left:5px;float: left;height: 35px;width: 81%;background: #D4D4D4" :class="tabClass(i)">
            <p style="line-height: 0px;font-size: large;float: left">消费：</p>
            <p style="line-height: 0px;font-size: large;float: left" v-for="user in tab.users">
              {{user.pay_user_name}};</p>
            <img style="float: right;height: 100%;z-index: 100" src="../../../assets/del.png"
                    @click="confirm(tab.id, $event)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Datetime, Group, XButton, Divider} from 'vux'
  import {baseUrl} from '@/config/env.js'
  import $ from 'jquery'
  import BScroll from 'better-scroll'
  import {getToken} from '@/components/common/common'

  export default {
    data() {
      return {
        date: '',
        table: '',
        height: ''
      }
    },

    mounted() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = (month < 10 ? "0" + month : month);
      this.date = (year.toString() + '-' + month.toString());
      this.getTable();

      window.onresize = () => {
        $(".wrapper").height($(window).height() - $(".weui-tabbar").height() - $("#headtop").height());
      };

      this.$nextTick(function () {
        this.setScroll();
      })
    },
    components: {
      Datetime,
      Group,
      XButton,
      Divider
    },
    methods: {
      tabClass(index){
        if(index%2 == 0){
          return 'double_tab';
        }else {
          return 'single_tab';
        }
      },
      setScroll() {
        $(".wrapper").height($(window).height() - $(".weui-tabbar").height() - $("#headtop").height());
        delete this.scroll;
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          scrollX: true,
          click: true
        })
      },
      showPlugin() {
        let self = this;
        let startDate = (new Date()).getFullYear() - 1;
        startDate = startDate.toString() + '-01-01';
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        let endDate = year.toString() + '-' + month.toString() + '-01';
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          yearRow: '{value}年',
          startDate: startDate,
          endDate: endDate,
          monthRow: '{value}月',
          value: this.date,
          onConfirm(val) {
            self.date = val;
            self.getTable();
            self.$nextTick(function () {
              self.setScroll();
            });
          },
          onShow() {
          },
          onHide() {
          }
        })
      },
      getTable() {
        let self = this;
        $.ajax({
          url: baseUrl + '/api/get_tab',
          data: {time: self.date, token: getToken()},
          async: false,
          type: 'post',
          success: function (data, status) {
            if (data.code == 0) {
              self.table = data.data;
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
      confirm(id, event) {
        event.stopPropagation();
        let self = this;
        this.$vux.confirm.show({
          title: '您是否要删除？',
          confirmText: '确认',
          cancelText: '取消',
          onConfirm() {
            self.delTab(id);
          }
        });

      }
      ,
      delTab(id) {

        let self = this;
        let url = baseUrl + '/api/del';
        let data = {id: id, token: getToken()};
        $.ajax({
          url: url,
          type: 'post',
          data: data,
          success: function (data) {
            if (data.code == 0) {
              self.$vux.toast.text(data.data.message, 'middle');
            } else if (data.code == 444) {
              self.$vux.toast.text(data.data, 'middle');
            } else {
              self.$vux.toast.text('未知错误', 'middle');
            }
            self.getTable();
            self.$nextTick(function () {
              self.setScroll();
            });

          }
        })
      },
      showComment(comment) {
        this.$vux.alert.show({
          title: '备注',
          content: comment,
          buttonText: '关闭',
//          hideOnBlur: true,
          onShow() {
          },
          onHide() {
          }
        })
      }
    }
  }
</script>
<style>
  .double_tab{
    background-color: lightblue !important;
  }
  .single_tab{
    background-color: powderblue !important;
  }
</style>
