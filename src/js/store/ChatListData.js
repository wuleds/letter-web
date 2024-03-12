//全局的聊天列表

import {ref} from "vue";
import {defineStore} from "pinia";
import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";

const useChatListStore = defineStore('chatListData',()=>{
    const chatListData = ref([])

    /**
     * 通过此函数新建对话，获取chatId，可能需要获取历史对话记录。*/
    async function newConversation(data){
        /**
         * type 可能为private,group,channel。
         * 1.私聊：若已经新建过，则获取chatId，并获取历史记录，若新建，则获取chatId。
         * 2.群组：groupId即为chatId，获取chatId，并获取历史记录。
         * 3.频道：channelId即为chatId，获取chatId，并获取历史发布记录。
         * id 可能为userId,groupId,channelId,myId为当前用户的id。
         * data:{
         *     type:'',
         *     myId:'',
         *     id:''
         * }
         * */
        let chatId;
        Request({
            url: '/conversation/new',
            method: 'post',
            data: data
        }).then((res)=>{
            if(res.data.code !== '200'){
                console.log("新建对话成功");
                chatId = res.data.data;
            }
        })
    }

    async function setTopListData(data){
        Request({
            url: '/chat/top',
            method: 'post',
            data: data
        }).then((res)=>{
            if(res.data.code === '200'){
                console.log("置顶成功");
            }
        })
    }

    async function deleteChatListData(data){
        Request({
            url: '/chat/delete',
            method: 'post',
            data: data
        }).then((res)=>{
            if(res.data.code === '200'){
                console.log("删除对话成功");
            }
        }) }

    /*function addChatListData(data){
        chatListData.value.unshift(data);
        getListData()
    }
    function setTopListData(data){
        deleteChatListData(data);
        topListData.value.unshift(data);
        getListData();
    }

    function deleteChatListData(data){
        //删除数组中与data相同的对象
        let indexToRemove = -1;
        for (let i = 0; i < chatListData.value.length; i++) {
            if (chatListData.value[i].type === data.type && chatListData.value[i].id === data.id) {
                indexToRemove = i;
                break;
            }
        }
        if (indexToRemove !== -1) {
            chatListData.value.splice(indexToRemove, 1); // 删除相同的对象
        }

        indexToRemove = -1;
        for (let i = 0; i < topListData.value.length; i++) {
            if (topListData.value[i].type === data.type && topListData.value[i].id === data.id) {
                indexToRemove = i;
                break;
            }
            if (indexToRemove !== -1) {
                topListData.value.splice(indexToRemove, 1);
            }
        }
        getListData();
    }

    function getListData(){
        let a = [];
        for(let i = 0; i < topListData.value.length; i++){
            a.push(topListData.value[i]);
        }
        for(let i = 0; i < chatListData.value.length; i++){
            a.push(chatListData.value[i]);
        }
        listData.value = a;
    }*/

    return {setChatListData,setTopListData,deleteChatListData,listData}
})