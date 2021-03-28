<template>
    <main>
        <article v-for="article in articles" :key="article._id">
            <h1>{{article.title}}</h1>
            <p>{{article.blurb}}</p>
        </article>
    </main>
</template>

<script>
export default {
    name: "Content",
    data()  {
      return { 
          articles: []
      }
    },
    created() {
      this.getArticles();
    },
    methods: {
        async getArticles() {
            fetch('http://localhost:3080/api/articles').then(data =>{
                data.json().then(json => {
                    this.articles = json;
                });
            });
            
        }
    }
}
</script>

<style scoped>
main {
    flex-grow: 1;
}
</style>