import './style.css'
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import router from './routes/router'
import App from './App.vue'
import * as userStore from './stores/userStore' // Perbaikan impor

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Initialize Pinia
const pinia = createPinia()
myApp.use(pinia) // Activate Pinia

// Use Vue Router
myApp.use(router)

// Mount the app
myApp.mount('#app')

// Provide the store to the app
myApp.provide('userStore', userStore)
