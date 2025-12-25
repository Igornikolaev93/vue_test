
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Импортируем store

const app = createApp(App);

app.use(router);
app.use(store); // Подключаем store

app.mount('#app');
