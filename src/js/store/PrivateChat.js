//存储私聊消息
import {ref} from "vue";
import {defineStore} from "pinia";

export const usePrivateChatStore = defineStore('privateChat',()=> {
    const privateChats = ref(new Map());

    const getCurrentPrivateChat = (chatId) => {
        return privateChats.value.get(chatId);
    }

    //添加一个新的私聊存储
    const addPrivateChat = (chatId) => {
        if (!privateChats.value.has(chatId)) {
            privateChats.value.set(chatId, []);
        }
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


    const getNewMessages = (chatId, lastMessageId) => {
        //从privateChats中获取新的消息
        const chat = getCurrentPrivateChat(chatId);
        if (chat === undefined) {
            return [];
        }
        return chat.filter(message => message.messageId > lastMessageId);
    }

    return {
        privateChats,
        getCurrentPrivateChat,
        addPrivateChat,
        insertMessages,
        getNewMessages
    }
})