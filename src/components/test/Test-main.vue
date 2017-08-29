<template>
  <div>
    <side></side>
    <my-content></my-content>
  </div>
</template>
<script>
  import Side from './Side.vue';
  import MyContent from './My-content.vue';

  export default {
    components: {
      Side,
      MyContent
    }
  }
</script>
