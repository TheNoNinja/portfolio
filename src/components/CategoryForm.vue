<template>
  <div class="container">
    <div v-if="categories" class="category-list draggable-container" @dragover="dragOver">
      <div v-for="category of orderedCategories" :key="category.id" :class="'category-item draggable ' + category.id + '-category'" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
        <span class="material-icons">drag_indicator</span><p>{{category.name}}</p><button @click="removeCategory(category)">X</button>
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
      newCategory: ''
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
    dragStart(e) {
      console.log(e)
      e.path[0].classList.add("dragging");
    },
    dragEnd(e) {
      e.path[0].classList.remove("dragging");
      const children = [...e.path[1].children];
      children.forEach((value, index) => {
        db.collection("categories").doc(value.children[1].innerText.replace(/[^a-z0-9]/gi, '-').replace(/-+[^a-z0-9]/gi, '').replace(/^-/gi, '')).set({
          name: value.children[1].innerText,
          rank: index
        });
      });
    },
    dragOver(e) {
      e.preventDefault();
      const draggableContainer = document.querySelector('.draggable-container');
      const afterDraggable = this.getElementUnderDraggable(draggableContainer, e.clientY);
      const srcElement = document.querySelector('.dragging');
      if (afterDraggable == null){
        draggableContainer.appendChild(srcElement)
      } else {
        draggableContainer.insertBefore(srcElement, afterDraggable)
      }
    },
    getElementUnderDraggable(container, yPosition){
      const draggables = [...container.querySelectorAll('.draggable:not(.dragging)')];
      return draggables.reduce((closest, child) =>{
        const box = child.getBoundingClientRect();
        const offset = yPosition - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset){
          return {offset: offset, element: child};
        } else {
          return closest;
        }
      }, {offset: Number.NEGATIVE_INFINITY}).element;
    },
    async addNewCategory(){
      const categoryId = this.newCategory.replace(/[^a-z0-9]/gi, '-').replace(/-+[^a-z0-9]/gi, '').replace(/^-/gi, '');
      await db.collection("categories").doc(categoryId).set({
        name: this.newCategory,
        rank: this.orderedCategories.length > 0 ? this.orderedCategories[this.orderedCategories.length -1].rank + 1 : 0
      });
      this.newCategory = '';
    },
    async removeCategory(category){
      db.collection("articles").where("category" , "==", category.id).get().then(result => {
        if (result.empty){
          db.collection("categories").doc(category.id).get().then(result => {
            if (result.exists) {
              db.collection("categories").doc(category.id).delete().then(() => {
                this.categories.forEach(c => {
                  if (c.rank > category.rank)
                  {
                    db.collection("categories").doc(c.id).update({rank: c.rank - 1});
                  }
                });
              });
            }
          })
        } else {
          console.log("articles rely on this category. can't delete"); //TODO: Better error handling
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 20rem;
}

.category-list p {
  flex-grow: 1;
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

.dragging {
  opacity: 50%;
}
</style>