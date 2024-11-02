// https://chatgpt.com/c/670beb2e-4aa0-8007-b1d7-c4d975d46c74

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import Home from './pages/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },

    ]
})

const app = createApp(App)

// https://vuejs.org/api/application.html#app-config-errorhandler
app.config.errorHandler = (err, instance, info) => {
    // Create some kind of error handling service
    console.log(err, instance, info);
}

app.use(router);

app.mount('#app')
