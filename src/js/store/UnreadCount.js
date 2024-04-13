//存储未读消息数
import {defineStore} from "pinia";
import {ref} from "vue";

export const useUnreadCountStore = defineStore('unreadCount',()=>{
        const counts = ref(new Map());

        const init = (chatIds) => {
            chatIds.forEach(chatId => {
                counts.value.set(chatId, 0);
            });
        }

        const setCount = (chatId, count) => {
            counts.value.set(chatId, count);
        }

        return {
            counts,
            setCount,
            init
        }
})