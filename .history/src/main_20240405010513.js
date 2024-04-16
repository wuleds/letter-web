import { createApp } from 'vue'
import Antd from 'ant-design-vue';

import App from './App.vue'
import router from './routers/routes.js'
import {createPinia} from "pinia";
import {useChatListStore} from "@/js/store/ChatListData.js";
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";

const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(createPinia());

app.mount('#app');