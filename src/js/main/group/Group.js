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

export async function searchGroup(groupIdOrName) {
    return await Request({
        url: '/group/info',
        method: 'post',
        data: {
            groupId: groupIdOrName
        }
    }).then(res => {
        if (res.data.code === '200') {
            return JSON.parse(res.data.data);
        } else if (res.data.code === '400') {
            openNotification('错误', res.data.msg);
        }else if(res.data.code === '500'){
            openNotification('', '未找到群组');
        }
        return null;
    })
}

export async function joinGroup(group) {
    return await Request({
        url: '/group/request',
        method: 'post',
        data: {
            groupId: group.groupId,
            info: group.info
        }
    }).then(res => {
        if (res.data.code === '200') {
            return true;
        } else if (res.data.code === '400') {
            openNotification('错误', res.data.msg);
        }
        return false;
    })
}

export async function createGroup(group) {
    return await Request({
        url: '/group/create',
        method: 'post',
        data: {
            groupName: group.groupName,
            groupPhoto: group.groupPhoto,
            creatorId: group.creatorId,
            groupInfo: group.groupInfo
        }
    }).then(res => {
        if (res.data.code === '200') {
            openNotification('成功', res.data.msg);
            return true;
        } else{
            openNotification('错误', res.data.msg);
        }
        return false;
    })
}