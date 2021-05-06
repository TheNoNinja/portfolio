<template>
  <div class="container">
    <div class="form-container">
      <div class="article-form">
        <div>
          <label>Title</label>
          <input type="text" v-model="articleToSave.title" id="title" name="title" @keyup="updateMarkdown()">

          <label>Thumbnail</label>
          <input type="file" accept="image/png, image/jpeg, image/gif" @change=updateThumbnail>

          <label>Category</label>
          <select name="category" id="category" v-model="articleToSave.category">
            <option v-for="category in orderedCategories" :key="category.name" :value="category.id">{{category.name}}</option>
          </select>

          <label>Blurb</label>
          <textarea v-model="articleToSave.blurb" id="blurb" name="blurb" rows="4" @keyup="updateMarkdown()"></textarea>

          <label>Content</label>
          <textarea v-model="articleToSave.content" id="content" name="content" @keyup="updateMarkdown()" rows="20"></textarea>
        </div>
      </div>
      <div>
        <div v-if=" articleToSave.title || articleToSave.blurb || articleToSave.content" id="article-preview">

        </div>
      </div>
    </div>
    <button @click="submitArticle">Submit</button>
  </div>
</template>

<script>
import {db, storage} from '@/firebase'
import markdown from "@/markdown"

export default {
  props: {
    article: {
      type: Object,
      required: false
    }
  },
  data(){
    return {
      articleToSave: {
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
  created() {
    if (this.article){
      this.articleToSave = {...this.article};
      setTimeout(this.updateMarkdown, 1);
    }
  },
  methods: {
    updateMarkdown(){
      const title = this.articleToSave.title ? "# " + this.articleToSave.title + "\n" : '';
      const blurb = this.articleToSave.blurb ? this.articleToSave.blurb + "\n" : '';

      document.getElementById('article-preview').innerHTML = markdown.render(title + blurb + this.articleToSave.content.replace(/\n{2,}/g, '<br/>\n'));
    },
    updateThumbnail(event){
      this.thumbnail = event.target.files[0];
    },
    submitArticle(){
      if (this.article){
        this.updateArticle();
      } else {
        this.createNewArticle();
      }
    },
    async updateArticle(){
      if (!this.articleToSave.title || !this.articleToSave.category || !this.articleToSave.blurb || !this.articleToSave.content){
        console.log("no valid values"); //TODO: Add better error handling
        return
      }
      this.articleToSave.content = this.articleToSave.content.replace(/\n{2,}/g, '<br/>\n');

      await db.collection("articles").doc(this.articleToSave.id).set({
        title: this.articleToSave.title,
        blurb: this.articleToSave.blurb,
        category: this.articleToSave.category,
        thumbnail: this.articleToSave.thumbnail,
        content: this.articleToSave.content
      })
    },
    async createNewArticle(){
      if (!this.articleToSave.title || !this.articleToSave.category || !this.articleToSave.blurb || !this.articleToSave.content){
        console.log("no valid values"); //TODO: Add better error handling
        return
      }
      this.articleToSave.content = this.articleToSave.content.replace(/\n{2,}/g, '<br/>\n');

      const articleId = this.articleToSave.title.replace(/[^a-z0-9]/gi, '-').replace(/-+[^a-z0-9]/gi, '').replace(/^-/gi, '')

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
            this.articleToSave.thumbnail = url;
          });

          await db.collection("articles").doc(articleId).set({
            ...this.articleToSave
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
  padding: 0.5rem;
}
label, input, textarea, select{
  width: 100%;
}

textarea{
  max-width: 100%;
  min-width: 100%;

}
</style>