<template>
  <Header />
  <router-view />
  <ModalRoot />
</template>

<script>
import Header from "@/components/Header"
import ModalRoot from "@/components/modal/ModalRoot";
export default {
  components: {
    Header,
    ModalRoot
  }
}
</script>

<style lang="scss">
@import "assets/css/variables.scss";
@import "assets/css/reset.scss";
@import "assets/css/markdown.scss";

h1, h2, h3, h4, h5, h6 {
  font-family: $pixel-font;
}

body {
  font-family: $normal-font;
  background-color: $black-dark;
  color: $white-dark;
}

a {
  color: $white-dark;
  text-decoration: none;
}
</style>
