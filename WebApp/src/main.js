import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

const webApp = createApp(App)
webApp.use(router)
webApp.mount('#app')
