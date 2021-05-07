<template>
  <div class="container">
    <h1>Sign in:</h1>
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email" name="email" />
    <label for="password">Password:</label>
    <input v-model="password" type="password" id="password" name="password" >
    <button @click="signIn">Sign In</button>
    <div class="on-error" v-if="errorMessage">{{errorMessage}}</div>
  </div>
</template>

<script>
import {auth} from '@/firebase'

export default {
  data(){
    return {
      auth,
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods:{
    async signIn(){
      this.errorMessage = ''

      try{
        await auth.signInWithEmailAndPassword(this.email, this.password);
        await this.$router.push({name:"Home"});
      }
      catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 1rem auto;
  background-color: #1B1C20;
  width: 20rem;
  padding: 1rem;

  label{
    width: 100%;
    margin-bottom: 1rem;
  }

  input{
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>