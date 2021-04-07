<template>
  <article v-if="article">
    <h1>Article {{article.title}}</h1>
    <p>{{article.content}}</p>
  </article>
  <div v-else>
    <h1>No article found</h1>
  </div>

  <router-link :to="{ name:'Home' }">Back</router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "PageArticle",
  data(){
    return {
      article: {}
    }
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      getArticleById: 'getArticleById'
    })
  },
  created() {
    this.article = this.getArticleById(this.id)
  }
}
</script>

<style scoped>

</style>