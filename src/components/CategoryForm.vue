<template>
  <div class="container">
    <div v-if="categories" class="category-list">
      <div v-for="category of categories" :key="category.name" class="category-item">
        <p>{{category.name}}</p><button @click="removeCategory(category)">X</button>
      </div>
    </div>
    <div class="category-form">
      <input v-model="newCategory" type="text" id="category-name" name="category-name"/><button @click="addNewCategory()">Add new category</button>
    </div>
  </div>
</template>

<script>
import {db} from "@/firebase"

export default {
  data(){
    return {
      categories: [],
      newCategory: '',
    }
  },
  firestore(){
    return {
      categories: db.collection("categories")
    }
  },
  methods:{
    async addNewCategory(){
      await db.collection("categories").add({
        name: this.newCategory,
      });
      this.newCategory = '';
    },
    async removeCategory(category){
      await db.collection("categories").where("name", "==", category.name).get().then(result => {
        result.docs.forEach(doc => doc.ref.delete());
      });
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 20rem;
}

.category-item{
  display: flex;
  padding-top: 0.5rem;
  justify-content: space-between;
}

.category-form {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
</style>