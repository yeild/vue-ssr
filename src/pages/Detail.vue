<template>
  <div>
    <link rel="stylesheet" :href="news.css">
    <div v-html="news.body"></div>
  </div>
</template>
<style>
  .headline {
    display: none;
  }
</style>
<script>
  export default {
    asyncData ({ store, route }) {
      return store.dispatch('getNewsContent', route.params.id)
    },
    computed: {
      news () {
        return this.$store.state.newsContent
      }
    }
  }
</script>