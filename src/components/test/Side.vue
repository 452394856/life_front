<template>
  <ul class="side list-unstyled">
    <li @click="addItem({content:Math.random()})">增加</li>
    <li @click="delItem()">删除</li>
  </ul>
</template>
<script>
  //  import {addItem, delItem} from '@/store/actions';
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions(['addItem','delItem'])
    },
  }
</script>
