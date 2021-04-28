<template>
    <slot name="user" :user="user"></slot>
</template>

<script>
import {ref} from "vue"
import {auth} from "@/firebase";

export default {
  setup(){
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => user.value = firebaseUser);

    return {
      user,
      unsubscribe
    }
  },
  unmounted() {
    this.unsubscribe();
  }
}
</script>

<style scoped lang="scss">

</style>