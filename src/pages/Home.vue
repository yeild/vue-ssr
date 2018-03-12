<template>
  <div>
    <ul>
      <li v-for="(news, index) in newsList">
        <a :href="'/news/'+news.id">{{news.title}}</a>
      </li>
    </ul>
    home
  </div>
</template>
<script>
  export default {
    asyncData ({ store }) {
      return store.dispatch('getNewsList')
    },
    computed: {
      newsList () {
        return this.$store.state.newsList
      }
    }
  }
</script>