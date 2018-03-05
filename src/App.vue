<template>
  <div id="app">
    <router-view :data="data"></router-view>
  </div>
</template>
<script>
  export default {
    props: ['data'],
  }
</script>