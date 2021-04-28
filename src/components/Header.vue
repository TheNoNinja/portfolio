<template>
  <header>
    <div class="titles">
      <router-link :to="{ name: 'Home'}">
        <h1 class="title">//CHRISTIAAN BRANT</h1>
      </router-link>
      <h3 class="sub-title">//PORTFOLIO</h3>
    </div>
    <nav class="categories">
      <router-link v-for="category of categories" :key="category.name" class="category" :to="{name:'Category', params: {categoryId:category.id}}">{{category.name}}</router-link>

      <UserConditional>
        <template v-slot:user="{user}">
          <a v-if="user" href="#" class="category categories" @click="openCategoriesModal()">Edit categories</a>
          <a v-if="user" href="#" class="category categories" @click="openArticleModal()">Add article</a>
          <a v-if="user" href="#" class="category log-out" @click="auth.signOut()">Log out {{user.uid}}</a>
          <a v-else href="#" class="category log-in" @click="openLoginModal()">Log in</a>
        </template>
      </UserConditional>
    </nav>
  </header>
</template>

<script>
import {auth, db} from "@/firebase";
import {ModalBus} from "@/events";
import UserConditional from "@/components/UserConditional";
import LoginForm from "@/components/LoginForm";
import CategoryForm from "@/components/CategoryForm";
import ArticleForm from "@/components/article/ArticleForm";

export default {
  components:{
    UserConditional
  },
  data(){
    return {
      auth,
      categories: []
    }
  },
  firestore(){
    return {
      categories: db.collection("categories")
    }
  },
  methods:{
    openLoginModal(){
      ModalBus.$emit("open", {
        component: LoginForm,
        title: "Login"
      });
    },
    openCategoriesModal(){
      ModalBus.$emit("open", {
        component: CategoryForm,
        title: "Categories"
      });
    },
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
header{
  background-color: #1B1C20;
}

.titles {
  width: 20rem;
  margin: 0 auto;
}

.categories {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.category {
  padding: 1rem 0.5rem;
}
</style>