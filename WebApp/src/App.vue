<template>
  <div class="container">
    <router-view />
  </div>

  <ModalRoot/>
</template>

<script>
import ModalRoot from "@/components/ModalRoot"

export default {
  name: 'App',
  components:{
    ModalRoot
  }
}
</script>

<style>
@import "assets/CSS/reset.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

body {
  font-family: 'Roboto Mono', monospace;
}

.container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-flow:  column nowrap;
}
</style>
