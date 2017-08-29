<template>
  <div>
    <router-view></router-view>
    <tabbar>
      <tabbar-item :selected="'tab' | isSelected" link="/index/tab">
        <img slot="icon" src="../../assets/table/tab.png">
        <img slot="icon-active" src="../../assets/table/tab-s.png">
        <span slot="label">账单</span>
      </tabbar-item>
      <tabbar-item :selected="'add' | isSelected" link="/index/add">
        <img slot="icon" src="../../assets/table/add.png">
        <img slot="icon-active" src="../../assets/table/add-s.png">
        <span slot="label">新增</span>
      </tabbar-item>
      <tabbar-item :selected="'total' | isSelected" link="/index/total">
        <img slot="icon" src="../../assets/table/total.png">
        <img slot="icon-active" src="../../assets/table/total-s.png">
        <span slot="label">统计</span>
      </tabbar-item>
      <tabbar-item :selected="'my' | isSelected" link="/index/my">
        <img slot="icon" src="../../assets/table/my.png">
        <img slot="icon-active" src="../../assets/table/my-s.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import {Tabbar, TabbarItem} from 'vux';

  export default {
    data() {
      return {
        selected:''
      }
    },
    computed: {},
    filters: {
      isSelected:function(key) {
        if(key == window.location.pathname.substring(window.location.pathname.lastIndexOf("\/") + 1, window.location.pathname.length)){
          return true;
        }else {
          return false
        }
      }
    },
    components: {
      Tabbar,
      TabbarItem
    },
    watch: {
      selected: function (val, oldVal) {
        this.$router.push({name: val});
      }
    }
  }
</script>
<style>

</style>
