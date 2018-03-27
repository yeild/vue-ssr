<template>
  <div>
    <ul>
      <li v-for="(news, index) in newsList" class="newsItem">
        <a :href="'/news/'+news.id" class="link">
          <img :src="news.images[0]" class="newsImg">
          <p class="title">{{news.title}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<style>
  .newsItem {
    display: block;
    width: 960px;
    margin: 15px;
    list-style: none;
    cursor: pointer;
    background: #f8f8f8;
  }
  .link {
    display: block;
    padding: 15px;
    text-decoration: none;
    color: black;
    overflow: auto;
  }
  .title {
    margin: 0;
    line-height: 70px;
  }
  .newsImg {
    width: 70px;
    height: 70px;
    margin-right: 30px;
    float: left;
  }
</style>
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