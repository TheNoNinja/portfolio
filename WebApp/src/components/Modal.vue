<template>
  <div class="modal-backdrop"
       v-show="isOpen"
       :class="{open: isOpen}"
       @click="$emit('onClose')">

    <div class="modal-content"
         :class="{open: isOpen}"
         @click.stop>

      <div class="modal-title"
           v-if="title">{{title}}</div>
      <div class="modal-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Model",
  props: {
    title: String,
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal-backdrop{
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 30rem;
  background-color: rgb(255, 255, 255);
  padding: 2rem;
}
</style>