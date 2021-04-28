<template>
  <div class="container">
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
import {ModalBus} from "@/events";

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
        ModalBus.$emit('close')
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
  width: 20rem;
  padding-top: 1rem;
}

label{
  width: 100%;
  margin-bottom: 1rem;
}

input{
  width: 100%;
  margin-bottom: 1rem;
}

</style>