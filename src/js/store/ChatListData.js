//全局的聊天列表
import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {dbOps} from "@/js/db/ChatListDB.js";

export const useChatListStore = defineStore('chatListData',()=>{
    const chatList = ref([]);
    /*type,chatId,oneId,twoId*/

    /**初始化聊天列表,从服务器获取数据*/
    async function initialize(){
        await Request({
            url: '/conversation/list',
            method: 'post',
            data:reactive({
                userId: localStorage.getItem('userId')
            })
        }).then(async res=>{
            if(res.data.code==='200'){
                JSON.parse(res.data.data).forEach(item=>{
                    chatList.value.push(item);
                })
                console.log('初始对话列表');
                console.log(chatList.value);
                await dbOps.insertItems(JSON.parse(res.data.data));
            }else{
                openNotification('错误',res.data.msg);
            }
        })
    }

    /**添加对话*/
    async function addConversation(conversation) {
        chatList.value.push(conversation);
        await dbOps.insertItem(conversation);
    }

    /**删除对话*/
    function delConversation(chatId){
        chatList.value = chatList.value.filter(chat => chat.chatId !== chatId);
        dbOps.deleteItem(chatId);
    }

    return {
        chatList,
        initialize,
        addConversation,
        delConversation
    }
})