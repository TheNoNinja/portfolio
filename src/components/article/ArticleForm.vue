<template>
  <div class="container">
    <div class="form-container">
      <div class="article-form">
        <div>
          <label>Title</label>
          <input type="text" v-model="article.title" id="title" name="title" @keyup="updateMarkdown()">

          <label>Thumbnail</label>
          <input type="file" accept="image/png, image/jpeg, image/gif" @change=updateThumbnail>

          <label>Category</label>
          <select name="category" id="category" v-model="article.category">
            <option v-for="category in orderedCategories" :key="category.name" :value="category.id">{{category.name}}</option>
          </select>

          <label>Blurb</label>
          <textarea v-model="article.blurb" id="blurb" name="blurb" rows="4" @keyup="updateMarkdown()"></textarea>

          <label>Content</label>
          <textarea v-model="article.content" id="content" name="content" @keyup="updateMarkdown()" rows="20"></textarea>
        </div>
      </div>
      <div>
        <div v-if=" article.title || article.blurb || article.content" id="article-preview">

        </div>
      </div>
    </div>
    <button @click="createNewArticle()">Submit</button>
  </div>
</template>

<script>
import {db, storage} from '@/firebase'
import markdown from "@/markdown"

export default {
  data(){
    return {
      article: {
        title: '',
        category: '',
        blurb: '',
        thumbnail: '',
        content: '',
      },
      thumbnail: '',
      categories: [],
    }
  },
  firestore(){
    return {
      categories: db.collection("categories")
    }
  },
  computed: {
    orderedCategories: function()  {
      return [...this.categories].sort((a, b) => a.rank - b.rank);
    }
  },
  methods: {
    updateMarkdown(){
      const title = this.article.title ? "# " + this.article.title + "\n" : '';
      const blurb = this.article.blurb ? this.article.blurb + "\n" : '';

      document.getElementById('article-preview').innerHTML = markdown.render(title + blurb + this.article.content);
    },
    updateThumbnail(event){
      this.thumbnail = event.target.files[0];
    },
    async createNewArticle(){
      if (!this.article.title || !this.article.category || !this.article.blurb || !this.article.content){
        console.log("no valid values"); //TODO: Add better error handling
        return
      }

      const articleId = this.article.title.replace(/[^a-z0-9]/gi, '-').replace(/-+[^a-z0-9]/gi, '').replace(/^-/gi, '');

      if (new Blob([articleId]).size > 1499){
        console.log("article title to long"); //TODO: Add better error handling
        return
      }

      db.collection("articles").doc(articleId).get().then(async result => {
        if (!result.exists) {

          const storageRef = storage.ref("Articles").child(articleId).child(this.thumbnail.name);
          await storageRef.put(this.thumbnail);
          await storageRef.getDownloadURL().then(url => {
            console.log(url);
            this.article.thumbnail = url;
          });

          await db.collection("articles").doc(articleId).set({
            ...this.article
          });
        } else {
          console.log("Article id already exists"); //TODO: Add better error handling
        }
      });
    }
  }

}
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-flow: row nowrap;
}

.article-form div{
  width: 30rem;
  position: sticky;
  top: 1rem;
}

#article-preview{
  margin-left: 1rem;
  max-width: 60rem;
  line-break: auto;
  background-color: #0B0C10;
}
label, input, textarea, select{
  width: 100%;
}

textarea{
  max-width: 100%;
  min-width: 100%;

}
</style>