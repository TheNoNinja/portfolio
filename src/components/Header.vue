<template>
  <header>
    <router-link :to="{ name: 'Home'}">
      <div class="titles">
        <h1 class="title">//CHRISTIAAN BRANT</h1>
        <h3 class="sub-title">//PORTFOLIO</h3>
      </div>
    </router-link>
    <nav class="categories">
      <router-link v-for="category of orderedCategories" :key="category.name" class="category" :to="{name: category.name === 'Home' ? 'Home' : 'Category', params: {categoryId:category.id}}">{{category.name}}</router-link>

      <UserConditional>
        <template v-slot:user="{user}">
          <a v-if="user" href="#" class="category categories" @click="openCategoriesModal()">Edit categories</a>
          <a v-if="user" href="#" class="category categories" @click="openArticleModal()">Add article</a>
          <a v-if="user" href="#" class="category Sign-in" @click="auth.signOut()">Sign out</a>
        </template>
      </UserConditional>
    </nav>
  </header>
</template>

<script>
import {auth, db} from "@/firebase";
import {ModalBus} from "@/events";
import UserConditional from "@/components/UserConditional";
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
  computed:{
    orderedCategories: function()  {
      return [...this.categories].sort((a, b) => a.rank - b.rank);
    }
  },
  methods:{
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
  background-color: $black-light;
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