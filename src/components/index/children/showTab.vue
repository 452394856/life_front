<template>
  <div>
    <group style="padding-top:-20px;">
      <x-button type="primary" plain @click.native="showPlugin">{{ date }}</x-button>
    </group>
    <divider>账单</divider>
    <div class="wrapper" ref="wrapper">
      <ul class="content">
      </ul>
    </div>
    <!--<scroller lock-x scrollbar-y height="-123px">-->
      <!--<div>-->
        <!--<div v-for="tab in table">-->
          <!--<scroller lock-y scrollbar-x>-->
            <!--<div class="box">-->
              <!--<span>{{tab.time}}</span>-->
              <!--<span>金额：{{tab.money}}</span>-->
              <!--<span>记录人：{{tab.name}}</span>-->
            <!--</div>-->
          <!--</scroller>-->
          <!--&lt;!&ndash;<divider>…</divider>&ndash;&gt;-->
        <!--</div>-->
      <!--</div>-->
    <!--</scroller>-->
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
        table: ''
      }
    },

    mounted() {
      console.log(getToken());
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = (month < 10 ? "0" + month : month);
      this.date = (year.toString() + '-' + month.toString());
      this.getTable();
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {})
      })
    },
    components: {
      Datetime,
      Group,
      XButton,
      BScroll,
      Divider
    },
    methods: {
      showPlugin() {
        let self = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          value: this.date,
          onConfirm(val) {
            self.date = val;
            self.getTable();
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
            console.log(data);
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
      }
    }

  }
</script>
<style>
  .box {
    height: 50px;
    text-align: left;
    padding-top: 20px;
  }

  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }

  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }

  .box1-item:first-child {
    margin-left: 0;
  }

  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
</style>
