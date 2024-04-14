//存储未读消息数
import {defineStore} from "pinia";
import {ref} from "vue";
import {messageDBOps} from "@/js/db/MessageDB.js";

export const useUnreadCountStore = defineStore('unreadCount',()=>{
        //聊天列表的未读消息数
        const unreadCounts = ref(new Map());
        //聊天列表的最新消息
        const lastMessage = ref(new Map());

        const initUnread = (chatIds) => {
            chatIds.forEach(chatId => {
                unreadCounts.value.set(chatId, 0);
            });
        }

        const initLastMessage = (chatIds) => {
            chatIds.forEach(chatId => {
                messageDBOps.getLastMessageIdInDB(chatId).then(messageId => {
                    lastMessage.value.set(chatId, messageId);
                })
            });
        }

        const setCount = (chatId, count) => {
            unreadCounts.value.set(chatId, count);
        }

        //以数组的形式返回最新消息的id
        const getAllLastMessageId = () => {
            const lastMessageId = [];
            lastMessage.value.forEach((value, key) => {
                lastMessageId.push(value);
            });
            return lastMessageId;
        }

        return {
            unreadCounts,
            setCount,
            initUnread,
            initLastMessage,
            lastMessage,
            getAllLastMessageId
        }
})