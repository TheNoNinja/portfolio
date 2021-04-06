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
export default {
  name: "PageArticle",
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data(){
    return {
      article: {}
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle(){
      try {
        const result = await fetch(`http://localhost:3080/api/articles/${this.id}`)
        this.article = await result.json()
      }
      catch (error){
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>