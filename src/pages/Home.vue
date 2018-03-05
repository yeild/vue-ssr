<template>
  <div>
    <ul>
      <li v-for="(news, index) in data" @click="log(index)">
        <a :href="'/news/'+news.id">{{news.title}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    methods: {
      log(index) {
        console.log(index)
      }
    }
/*    data () {
      return {
        newsList: [{
          title: '出国狗的福音--使用树莓派搭建跨国语音短信设备'
        },{
          title: '用 kvm 虚拟机的人很少么？'
        },{
          title: '中年猿远程办公半月记'
        }]
      }
    }*/
  }
</script>