<template>
  <article>
    <img v-if="article" :src="article.thumbnail" :alt="article.id + '-thumbnail'"/>
    <div id="article" class="markdown">

    </div>
  </article>
</template>

<script>
import {db} from "@/firebase"
import markdown from "@/markdown";

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data(){
    return {
      article: {}
    }
  },
  mounted() {
    db.collection("articles").doc(this.id).get().then(result => {
      this.article = result.data();
      this.updateMarkdown();
    });
  },
  methods: {
    updateMarkdown() {
      const title = this.article.title ? "# " + this.article.title + "\n" : '';
      const blurb = this.article.blurb ? this.article.blurb + "\n" : '';

      document.getElementById('article').innerHTML = markdown.render(title + blurb + this.article.content);
    },
  }
}
</script>

<style scoped lang="scss">


article {
  padding: 0.5rem;
  margin: 0.5rem auto;
  width: 80vw;
  background-color: $black-light;

  @media only screen and (max-width: 540px) {
    width: calc(100% - 1rem);
    margin: 0.5rem;
  }

  img {
    width: 100%;
  }
}
</style>