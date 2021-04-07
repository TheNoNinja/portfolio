import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

const webApp = createApp(App)
webApp.use(router)
webApp.use(store)
webApp.mount('#app')