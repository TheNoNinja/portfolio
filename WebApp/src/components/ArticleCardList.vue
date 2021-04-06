<template>
  <ArticleCard v-for="article in articles"
               :key="article._id"
               :article="article" />
</template>

<script>
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "ArticleCardList",
  components: {
    ArticleCard
  },
  data() {
    return {
      articles: []
    }
  },
  methods: {
    async getArticles(){
      try {
        const result = await fetch("http://localhost:3080/api/articles")
        this.articles = await result.json()
      }
      catch (error){
        console.log(error)
      }
    }
  },
  created() {
    this.getArticles()
  }
}
</script>

<style scoped>

</style>