<template>
  <div class="container">
    <router-link class="router-link" :to="{name: 'Article', params: {id:article.id}}">
      <div class="article-card">
        <div class="article-image">
          <img class="image" :src="article.thumbnail" :alt="article.id + '-thumbnail'"/>
        </div>
        <div class="article-content">
          <h2>{{article.title}}</h2>
          <p>{{article.blurb}}</p>
        </div>
      </div>
    </router-link>
    <div class="article-editor">
      <UserConditional>
        <template v-slot:user="{user}">
          <a v-if="user" href="#" class="category categories" @click="openArticleFormModal"><span class="material-icons">edit</span></a>
          <a v-if="user" href="#" class="category Sign-in" @click="deleteArticle"><span class="material-icons">delete</span></a>
        </template>
      </UserConditional>
    </div>
  </div>
</template>

<script>
import {db} from "@/firebase";
import {ModalBus} from "@/events";
import UserConditional from "@/components/UserConditional";
import ArticleForm from "@/components/article/ArticleForm";

export default {
  components:{
    UserConditional
  },
  props:{
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    openArticleFormModal(){
      ModalBus.$emit('open', {
        title: "Edit article",
        component: ArticleForm,
        props: {
          article: {
            id: this.article.id,
            ...this.article
          }
        }
      });
    },
    async deleteArticle(){
      await db.collection("articles").doc(this.article.id).delete();
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  display: grid;
  background-color: $black-light;

  .article-card {

    .article-image {
      overflow: hidden;
      height: 250px;
      padding: 0.5rem 0.5rem 0 0.5rem;

      .image {
        height: 100%;
        filter: grayscale(90%);
        object-fit: cover;
        transition: all 0.1s ease-in-out;

        &:hover {
          filter: grayscale(0%);
          transform: scale(1.1);
        }
      }
    }

    .article-content {
      padding: 0.5rem;

      h2 {
        color: $blue-light;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        text-decoration: underline;
        text-decoration-thickness: 0.2rem;
        line-height: 2rem;

        transition: text-shadow 0.5s ease;
        text-shadow: 0 0 $pink, 0 0 $blue-dark;

        &:hover {
          text-shadow: -0.1rem -0.1rem $pink, 0.1rem 0.1rem $blue-dark;
        }
      }
    }
  }

  .article-editor {
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
    padding: 0.5rem;
    gap: 1rem;

    a span {
      font-size: 2rem;
    }
  }
}
</style>