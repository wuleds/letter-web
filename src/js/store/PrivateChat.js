//存储私聊消息
import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {chatListDbOps} from "@/js/db/ChatListDB.js";

export const usePrivateChatStore = defineStore('privateChat',()=> {
    const privateChats = ref(new Map());

    const getCurrentPrivateChat = (chatId) => {
        return privateChats.value.get(chatId);
    }

    //添加一个新的私聊存储
    const addPrivateChat = (chatId) => {
        privateChats.value.set(chatId, []);
    }

    //往现有的私聊存储里添加新的信息
    const insertMessages = (chatId, messages) => {
        let array = messages;
        let privateChat =  privateChats.value.get(chatId);
        if(privateChat === undefined){
            privateChat = [];
        }
        array.forEach(message => {
            privateChat.push(message);
        });
        privateChats.value.set(chatId, privateChat);
    }

    return {
        privateChats,
        getCurrentPrivateChat,
        addPrivateChat,
        insertMessages
    }
})