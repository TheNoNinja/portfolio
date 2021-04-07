<template>
  <ArticleCard v-for="article in articles"
               :key="article._id"
               :article="article" />
</template>

<script>
import { mapState } from 'vuex'
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "ArticleCardList",
  components: {
    ArticleCard
  },
  computed:{
    ...mapState({
      articles: state => state.articles.items
    })
  }
}
</script>

<style scoped>

</style>