import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";

export const toStory = (id) => {
    window.location.href = '/story/' + id;
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