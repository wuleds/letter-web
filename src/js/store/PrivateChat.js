//存储私聊消息
import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {chatListDbOps} from "@/js/db/ChatListDB.js";

const usePrivateChatStore = defineStore('privateChat',()=> {
    const privateChats = ref(new Map());

    const currentPrivateChat = (chatId) => {
        return privateChats.value.get(chatId);
    }

    //添加一个新的私聊存储
    const addPrivateChat = (chatId, messages) => {
        privateChats.value.set(chatId, messages);
    }

    //往现有的私聊存储里添加新的信息
    const insertMessage = (chatId, messages) => {
        const privateChat = privateChats.value.get(chatId);
        messages.foreach(message => {
            privateChat.push(message);
        });
        privateChats.value.set(chatId, messages);
    }

    return {
        privateChats,
        currentPrivateChat,
        addPrivateChat,
        insertMessage
    }
})