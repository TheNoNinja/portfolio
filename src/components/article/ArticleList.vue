<template>
  <div class="article-list">
    <ArticleCard v-for="article of computedArticles" :key="article.title" :article="article" />
    <UserConditional>
      <template v-slot:user="{user}">
        <a v-if="user" href="#" class="category categories" @click="openArticleModal()"><span class="material-icons">add</span></a>
      </template>
    </UserConditional>
  </div>
</template>

<script>
import {db} from '@/firebase'
import {ModalBus} from "@/events";
import ArticleCard from "@/components/article/ArticleCard";
import ArticleForm from "@/components/article/ArticleForm";
import UserConditional from "@/components/UserConditional";

export default {
  components:{
    ArticleCard,
    UserConditional
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
  },
  methods: {
    openArticleModal(){
      ModalBus.$emit("open", {
        component: ArticleForm,
        title: "Add article"
      });
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
  grid-template-columns: repeat(auto-fit, 370px);
  grid-auto-rows: auto;
  grid-auto-flow: row;
  gap: 0.5rem;
  align-items: stretch;
  align-content: stretch;
  justify-content: center;

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0.5rem;

    grid-template-columns: 100%;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 15rem;
    background-color: $black-light;
    padding: 0.5rem;
    text-decoration: none;
    span {
      color: $blue-light;
      font-size: 10rem;
    }
  }
}


</style>