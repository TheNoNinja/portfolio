<template>
  <router-link :to="{ name:'Article', params: { id: article._id } }">
    <h1>{{article.title}}</h1>
  </router-link>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    article: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>