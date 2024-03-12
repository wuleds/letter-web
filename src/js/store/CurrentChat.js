import { defineStore } from 'pinia';
import { reactive } from "vue";

//用于确定当前聊天框的对象,可以全局使用此js来切换聊天框内容
export const useCurrentChatStore = defineStore('currentChat',()=>{
    const chat = reactive({
        //私聊private，群组group，频道channel
        type: localStorage.getItem('CurrentChatType'),
        id: localStorage.getItem('CurrentChatId'),
    });

    function setCurrentChat(data){
        chat.type = data.type;
        chat.id = data.id;
        localStorage.setItem('CurrentChatType',chat.type);
        localStorage.setItem('CurrentChatId',chat.id);
    }

    return {
        chat,
        setCurrentChat
    }
});