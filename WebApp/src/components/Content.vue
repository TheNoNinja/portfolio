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
    background-color: #34495e;

    margin: 0 auto;
    flex-grow: 1;
    width: 75vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
}
article {
    background-color: #7f8c8d;

    width: 14.285%; 

    max-height: 10vw;
    flex-grow: 1;
}

@media (min-width: 1800px) and (max-width: 2200px) {
  article {
    min-width: 16.66%; 
  }
}

@media (min-width: 1450px) and (max-width: 1800px) {
  article {
    min-width: 20%; 
  }
}

@media (min-width: 1200px) and (max-width: 1450px) {
  article {
    min-width: 25%; 
  }
}

@media (min-width: 1000px) and (max-width: 1200px) {
  article {
    min-width: 33.33%; 
  }
}


@media (min-width: 600px) and (max-width: 1000px) {
  article {
    min-width: 50%; 
  }
}

@media (min-width: 0px) and (max-width: 600px) {
  main {
      width: 100vw;
  }

  article {
    min-width: 100%; 
  }
}
</style>