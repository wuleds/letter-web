//全局的聊天列表
import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {chatListDbOps} from "@/js/db/ChatListDB.js";

export const useChatListStore = defineStore('chatListData',()=>{
    const chatList = ref(new Map());
    /*type,chatId,oneId,twoId*/

    /**刷新聊天列表,从服务器获取数据*/
    async function initialize(){
        await Request({
            url: '/conversation/list',
            method: 'post',
            data:reactive({
                userId: sessionStorage.getItem('userId')
            })
        }).then(async res=>{
            if(res.data.code==='200'){
                JSON.parse(res.data.data).forEach(item=>{
                    chatList.value.set(item.chatId,item);
                })
                console.log('获取对话列表');
                await chatListDbOps.insertItems(JSON.parse(res.data.data));
            }else{
                openNotification('错误',res.data.msg);
            }
        })
    }

    /**添加对话*/
    async function addConversation(conversation) {
        chatList.value.set(conversation.chatId,conversation);
        await chatListDbOps.insertItem(conversation);
    }

    /**删除对话*/
    function delConversation(chatId){
        chatList.value.delete(chatId);
        chatListDbOps.deleteItem(chatId).then(r => {});
    }
/*
    /!**获取对话列表*!/
    function getChatList(){
        const chats = [];
        chatList.value.forEach((value, key) => {
            chats.push(value);
            console.log(value)
        })
        return chats;
    }*/

    return {
        chatList,
        initialize,
        addConversation,
        delConversation,}
})