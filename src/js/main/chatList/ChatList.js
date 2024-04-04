import Request from "@/utils/Request.js";
import {reactive} from "vue";

/**新建对话*/
export function createConversation(type,id) {
    return Request({
        url: '/chat/createConversation',
        method: 'post',
        data: reactive({
            //可能是userId，groupId，channelId
            type:type,
            id: id
        })
    }).then(res=>{
        //获取chatId
        if(res.code===200){
            const chatId = res.data.data;
        }
    })
}