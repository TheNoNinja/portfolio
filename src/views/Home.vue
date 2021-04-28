<template>
  <ArticleList :category="categoryId"/>
</template>

<script>
import ArticleList from "@/components/article/ArticleList";

export default {
  components:{
    ArticleList
  },
  props: {
    categoryId: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">

</style>