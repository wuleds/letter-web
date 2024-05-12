import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {reactive} from "vue";

export const toStory = (id) => {
    window.location.href = '/stores/' + id;
}

export const toMain = () => {
    window.location.href = '/main';
}

export  const getStory = async (id) => {
    return await Request({
        url: '/story/get/' + id,
        method: 'post'
    }).then(res => {
        if(res.data.code === '200') {
            console.log(res.data.data)
            return JSON.parse(res.data.data);
        }else {
            openNotification('错误', res.data.msg);
        }
    })
}

export const createStory =  (story) => {
    return Request({
        url: '/story/create',
        method: 'post',
        data: story
    }).then(res => {
        if(res.data.code === '200') {
            openNotification('成功', '发布成功');
        }else {
            openNotification('错误', res.data.msg);
        }
    })

}

export const getComment = async (id) => {
    return await Request({
        url: '/story/comment/get/' + id,
        method: 'post'
    }).then(res => {
        if(res.data.code === '200') {
            return JSON.parse(res.data.data);
        }else {
            openNotification('错误', res.data.msg);
        }
    })

}

export const createComment = (comment) =>{
    Request({
        url: '/story/comment/add',
        method: 'post',
        data: comment
    }).then(res => {
        if(res.data.code === '200') {
            openNotification('成功', '评论成功');
        }else {
            openNotification('错误', res.data.msg);
        }
    })

}

export const likeStory = (id) => {
    Request({
        url: '/story/like/' + id,
        method: 'post'
    })
}

export const deleteStory = (id) => {
    Request({
        url: '/story/delete',
        method: 'post',
        data:reactive({
            id: id
        })
    }).then(res => {
        if(res.data.code === '200') {
            openNotification('成功', '删除成功');
        }else {
            openNotification('错误', res.data.msg);
        }
    })
}

export const getUserInfo = (id) =>{
    return Request({
        url: '/contact/search',
        method: 'post',
        data: reactive({
            userId: id
        })
    }).then(res => {
        if(res.data.code === '200') {
            return JSON.parse(res.data.data);
        }else {
            openNotification('错误', res.data.msg);
        }
    })
}