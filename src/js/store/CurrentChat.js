import { defineStore } from 'pinia';
import { reactive } from "vue";

//用于确定当前聊天框的对象,可以全局使用此js来切换聊天框内容
export const useCurrentChatStore = defineStore('currentChat',()=>{
    const currentChat = reactive({
        //私聊private，群组group，频道channel
        type: localStorage.getItem('CurrentChatType') || '',
        chatId: localStorage.getItem('CurrentChatId') || '',
        toId: localStorage.getItem('CurrentToId') || ''
    });

    function setCurrentChat(data){
        currentChat.type = data.type;
        currentChat.chatId = data.chatId;
        currentChat.toId = data.toId;
        localStorage.setItem('CurrentChatType',currentChat.type);
        localStorage.setItem('CurrentChatId',currentChat.chatId);
        localStorage.setItem('CurrentToId',currentChat.toId);
    }

    return {
        currentChat,
        setCurrentChat
    }
});