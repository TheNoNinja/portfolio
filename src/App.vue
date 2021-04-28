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
@import "assets/css/reset.scss";
@import "assets/css/highlighting.scss";

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;

  width: 100vw;
  height: 100vh;

  background-color: #0B0C10;
}
</style>
