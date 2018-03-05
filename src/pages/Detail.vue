<template>
  <div>
    <h1>{{data.title}}</h1>
<!--    <img :src="data.image">-->
    <div v-html="data.body"></div>
    <div :link="data.css" id="css"></div>
  </div>
</template>
<style>
/*  img {
    width: 200px !important;
  }*/
</style>
<script>
  export default {
    props: ['data'],
    mounted () {
      var css = document.querySelector('#css').getAttribute('link')
      var style = document.createElement('link')
      style.href  = css
      style.rel = 'stylesheet'
      document.body.appendChild(style)
    }
  }
</script>