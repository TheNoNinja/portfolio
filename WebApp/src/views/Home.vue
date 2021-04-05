<template>
  <h1>Home</h1>
  <button @click="openModal">open Modal</button>

</template>

<script>
import { ModalBus } from '@/events'
import Test from '@/components/Test'

export default {
  name: "Home",
  methods: {
    openModal(){
      ModalBus.$emit('open', {
        component: Test,
        title: 'Test Modal'
      })
    }
  }
}
</script>

<style scoped>

</style>