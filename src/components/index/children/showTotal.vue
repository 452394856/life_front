<template>
  <div>
    <div>
      <group style="margin-top:-60px;height: 10%">
        <x-button type="primary" @click.native="showPlugin">{{ date }}</x-button>
      </group>
      <group>
        <x-input title="本月支出" v-model="pay" disabled text-align="right"></x-input>
        <x-input title="本月消费" v-model="consume" disabled text-align="right"></x-input>
        <x-input title="本月结算" v-model="reduce" disabled text-align="right"></x-input>
        <divider>本月您应</divider>
        <divider :style="color_style">{{intention}}</divider>
        <divider>{{Math.abs(reduce)}}元</divider>
      </group>
    </div>


  </div>
</template>
<script>
  import $ from 'jquery'
  import {Datetime, Group, XButton, Divider, XInput} from 'vux'
  import {baseUrl} from '@/config/env.js'
  import {getToken} from '@/components/common/common'

  export default {
    data() {
      return {
        date: '',
        pay: 0,
        consume: 0,
        reduce: 0,
        color_style:'',
        intention:'',
      }
    },
    components: {
      Datetime,
      Group,
      XButton,
      Divider,
      XInput
    },
    mounted() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = (month < 10 ? "0" + month : month);
      this.date = (year.toString() + '-' + month.toString());

      this.getTotal();
    },
    methods: {
      getTotal() {
        let self = this;
        let url = baseUrl + '/api/total';
        let data = {time: this.date, token: getToken()}
        $.ajax({
          url: url,
          type: 'post',
          data: data,
          success: function (data) {
            if (data.code == 0) {
              self.pay = data.data.pay;
              self.consume = data.data.consume;
              self.reduce = data.data.reduce;
              if(data.data.reduce < 0){
                self.intention = '支出';
                self.color_style = 'color:red'
              }else {
                self.intention = '收入';
                self.color_style = 'color:green'
              }
            }else if(data.code == 401){
              self.$vux.toast.text('登录过期，请重新登录', 'middle');
              self.$router.push({path: '/'});
            }else {
              self.$vux.toast.text('未知错误', 'middle');
            }
          }
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
          startDate: startDate.toString(),
          endDate: endDate,
          monthRow: '{value}月',
          value: this.date,
          onConfirm(val) {
            self.date = val;
            self.getTotal();
          },
          onShow() {
          },
          onHide() {
          }
        })
      },
    }
  }
</script>
<style>

</style>
