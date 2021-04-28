<template>
  <router-link class="router-link" :to="{name: 'Article', params: {id:article.id}}">
    <div class="article-card">
      <img :src="article.thumbnail" :alt="article.id + '-thumbnail'"/>
      <h1>{{article.title}}</h1>
      <p>{{article.blurb}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props:{
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.router-link{
  background-color: #1B1C20;
  padding: 0.5rem;
}
</style>