<template>
  <h1>Article {{id}}</h1>
</template>

<script>
export default {
  name: "PageArticle",
  props: {
    id: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>

</style>