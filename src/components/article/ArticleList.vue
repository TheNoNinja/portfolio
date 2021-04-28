<template>
  <div class="article-list">
    <ArticleCard v-for="article of computedArticles" :key="article.title" :article="article" />
  </div>
</template>

<script>
import {db} from '@/firebase'
import ArticleCard from "@/components/article/ArticleCard";

export default {
  components:{
    ArticleCard
  },
  props: {
    category: {
      type: String,
      required: false
    }
  },
  data(){
    return {
      articles: []
    }
  },
  firestore(){
    return {
      articles: db.collection('articles')
    }
  },
  computed:{
    computedArticles: function() {
      if (this.category) {
        return {...this.articles.filter(article => article.category === this.category)}
      }
      return this.articles
    }
  }
}
</script>

<style scoped lang="scss">
.article-list {
  padding: 0.5rem;
  width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  grid-auto-rows: auto;
  grid-auto-flow: row;
  gap: 0.5rem;
  align-items: stretch;
  align-content: stretch;
  justify-content: center;
}

@media only screen and (max-width: 540px) {
  .article-list {
    width: 100vw;
    padding: 0.5rem;

    grid-template-columns: 270px;
  }
}
</style>