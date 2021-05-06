<template>
  <div class="container">
    <router-link class="router-link" :to="{name: 'Article', params: {id:article.id}}">
      <div class="article-card">
        <div class="article-image">
          <img :src="article.thumbnail" :alt="article.id + '-thumbnail'"/>
        </div>
        <div class="article-content">
          <h2>{{article.title}}</h2>
          <p>{{article.blurb}}</p>
          </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props:{
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  background-color: $black-light;
  //padding: 0.5rem;
}

.article-image{
  overflow:hidden;
  height: 250px;
  padding: 0.5rem 0.5rem 0 0.5rem;
}

img {
  height: 100%;
  filter: grayscale(90%);
  object-fit: cover;
  transition: all 0.1s ease-in-out;
}

img:hover {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.article-content{
  padding: 0.5rem;
}

.article-content h2{
  color: $blue-light;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  text-decoration: underline;
  text-decoration-thickness: 0.2rem;
  line-height: 2rem;

  transition: text-shadow 0.5s ease;
  text-shadow: 0 0 $pink, 0 0 $blue-dark;
}

.article-content h2:hover{
  text-shadow: -0.1rem -0.1rem $pink, 0.1rem 0.1rem $blue-dark;
}
</style>