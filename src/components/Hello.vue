<template>
  <div class="hello">
    <button @click="change">click me</button>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'hello',
    data() {
      return {
        msg: 333
      }
    },
    methods: {
      change: function () {
        let self=this;
        $.get('http://localhost:1234', function (data, success) {
          self.msg = data;
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
