import Request from "@/utils/Request.js";
import {reactive} from "vue";
import {useMeStore} from "@/js/store/Me.js";
import {useChatListStore} from "@/js/store/ChatListData.js";
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";

/**新建对话*/
export function createConversation(type,toId) {
    return Request({
        url: '/conversation/new',
        method: 'post',
        data: reactive({
            //可能是userId，groupId，channelId
            type:type,
            myId: useMeStore().userInfo.userId,
            toId:toId
        })
    }).then(res=>{
        //获取Conversation
        //chatId,type,myId,toId
        if(res.data.code=== '200'){
            //存入聊天列表
            const conversation = JSON.parse(res.data.data);
            //将对话存入store
            useChatListStore().addConversation(conversation);
            //设置当前对话
            useCurrentChatStore().setCurrentChat(conversation);
        }
    })
}