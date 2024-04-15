//存储未读消息数
import {defineStore} from "pinia";
import {ref} from "vue";
import {messageDBOps} from "@/js/db/MessageDB.js";
import {usePrivateChatStore} from "@/js/store/PrivateChat.js";

export const useUnreadCountStore = defineStore('unreadCount',()=>{
        //聊天列表的未读消息数
        const unreadCounts = ref(new Map());
        //聊天列表的最新消息
        const lastMessage = ref(new Map());

        const initUnread = (chats) => {
            chats.forEach(chat => {
                unreadCounts.value.set(chat.chatId, 0);
            });
        }

        const initLastMessage = (chats) => {
            chats.forEach(chat => {
                if(chat.type === 'private'){
                    lastMessage.value.set(chat.chatId, 0);
                    //初始化私聊消息存储
                    usePrivateChatStore().addPrivateChat(chat.chatId);
                }else {
                    //根据对话列表，从数据库获取最新消息的id
                    messageDBOps.getLastMessageIdInDB(chat.chatId).then(messageId => {
                        lastMessage.value.set(chat.chatId, messageId);
                    })
                }
            });
        }

        const setCount = (chatId, count) => {
            unreadCounts.value.set(chatId, count);
        }

        const updateLastMessageId = (chatId) => {
            messageDBOps.getLastMessageIdInDB(chatId).then(messageId => {
                lastMessage.value.set(chatId, messageId);
                console.log('更新最新消息id:' + chatId + ':' + messageId)
            })
        }

        const setLastMessageId = (chatId, messageId) => {
            lastMessage.value.set(chatId, messageId);
        }

        return {
            unreadCounts,
            setCount,
            initUnread,
            initLastMessage,
            lastMessage,
            updateLastMessageId,
            setLastMessageId
        }
})