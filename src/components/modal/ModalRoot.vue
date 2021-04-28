<template>
  <Modal :isOpen="!!component" :title="title" @onClose="handleClose">
    <component :is="component" @onClose="handleClose" v-bind="props"/>
  </Modal>
</template>

<script>
import {ModalBus} from "@/events";

import Modal from "@/components/modal/Modal";
export default {
  components:{
    Modal
  },
  data () {
    return {
      component: null,
      title: '',
      props: null
    }
  },
  created() {
    ModalBus.$on('open', ({ component, title = '', props = null}) =>{
      this.component = component
      this.title = title
      this.props = props
    })
    ModalBus.$on('close', () =>{ this.handleClose()})
    document.addEventListener('keyup', this.handleKeyUp)
  },
  beforeUnmount(){
    document.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    handleClose(){
      this.component = null
    },
    handleKeyUp(e){
      if (e.keyCode === 27) this.handleClose()
    }
  }
}
</script>

<style scoped lang="scss">

</style>