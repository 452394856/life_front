<template>
  <div class="content">
    <div v-for="item in items">
      {{item.content}}
    </div>
  </div>
</template>
<script>
  export default {
    computed:{
      items: function () {
        return this.$store.state.items
      }
    }
  }
</script>
