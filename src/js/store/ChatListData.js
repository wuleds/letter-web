//全局的聊天列表
import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {chatListDbOps} from "@/js/db/ChatListDB.js";

export const useChatListStore = defineStore('chatListData',()=>{
    //对话列表,key为chatId，value为对话对象：{type,chatId,oneId,twoId}
    const chatList = ref(new Map());

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
                console.log('pinia:');
                console.log(chatList.value);
                await chatListDbOps.insertItems(JSON.parse(res.data.data));
            }else{
                openNotification('错误',res.data.msg);
            }
        })
    }

    /**添加对话*/
    async function addConversation(conversation) {
        chatList.set(conversation.chatId,conversation);
        await chatListDbOps.insertItem(conversation);
    }

    /**删除对话*/
    function delConversation(chatId){
        chatList.delete(chatId);
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
        delConversation
    }
})