<template>
  <div class="container">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: {
    Header,
    Content,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

body {
  font-family: 'Roboto Mono', monospace;

  background-color:#2c3e50;
  color: #95a5a6;
}

.container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-flow:  column nowrap;
  justify-content: space-between;
}
</style>
