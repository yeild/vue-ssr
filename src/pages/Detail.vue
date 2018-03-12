<template>
  <div>
    <link rel="stylesheet" :href="news.css">
    <h1>{{news.title}}</h1>
    <img :src="news.image">
    <div v-html="news.body"></div>
  </div>
</template>
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