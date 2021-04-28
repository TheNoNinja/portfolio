<template>
  <div class="modal-backdrop"
       v-show="isOpen"
       :class="{open: isOpen}"
       @mousedown="$emit('onClose')">

    <div class="modal-content"
         :class="{open: isOpen}"
         @mousedown.stop>

      <div class="modal-title"
           v-if="title">
        <h1>{{title}}</h1>
        <hr />
      </div>

      <div class="modal-body">
        <slot/>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props:{
    title: String,
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(0.5rem);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.modal-content{
  background-color: #1B1C20;
  padding: 1rem;
  margin: auto;
}
</style>