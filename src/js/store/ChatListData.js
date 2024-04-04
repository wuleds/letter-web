//全局的聊天列表
import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";

export const useChatListStore = defineStore('chatListData',()=>{
    const chatListSet = ref(JSON.parse(localStorage.getItem('chatListData')) || new Set());

    function initialize(){
        Request({
            url: '/chat/getChatList',
            method: 'get'
        }).then(res=>{
            if(res.code===200){
                chatListSet.value = new Set(res.data.data);
                localStorage.setItem('chatListData',JSON.stringify(Array.from(chatListSet)));
            }else{
                openNotification('error',res.message);
            }
        })
    }

    /**添加对话*/
    function addConversation(conversation){
        chatListSet.add(conversation);
        localStorage.setItem('chatListData',JSON.stringify(Array.from(chatListSet)));
    }

    /**删除对话*/
    function delConversation(conversation){
        chatListSet.delete(conversation);
        localStorage.setItem('chatListData',JSON.stringify(Array.from(chatListSet)));
    }

    function getChatList(){
        return Array.from(chatListSet);
    }

    return {
        getChatList,
        addConversation,
        delConversation
    }
})