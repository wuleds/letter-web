import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";

export async function getGroupList() {
    return await Request({
        url: '/group/list',
        method: 'post'
    }).then(res => {
        console.log(res.data)
        if (res.data.code === '200') {
            return JSON.parse(res.data.data);
        }
        return null;
    })
}

export async function quitGroup(groupId) {
    return await Request({
        url: '/group/quit',
        method: 'post',
        data: {
            groupId: groupId
        }
    }).then(res => {
        if(res.data.code === '200'){
            return true;
        }else if(res.data.code === '400'){
            openNotification('错误',res.data.msg);
        }
        return false;
    })
}