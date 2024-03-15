import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {reactive} from "vue";

/**
 * 获取联系人列表
 * data是List，遍历List，获取对象
 * 对象属性为
 * String contactId;   //账号
 * String contactName; //用户名
 * String contactPhoto;//用户头像
 * */
export const getContactList = () => {
    return Request({
        url: '/contact/list',
        method: 'post'
    }).then(res => {
        if(res.data.code === '200'){
            console.log(res.data.data);
            return res.data.data;
        }else if(res.data.code === '400'){
            openNotification('提示', res.data.msg)
            return null;
        }
    })
}

/**
 * 获取联系人请求列表
 * data是List，遍历List，获取对象
 * 对象属性为
 * String id;           //请求id
 * String fromUserId;   //请求发送者
 * String toUserId;     //请求接收者
 * String info;         //请求信息
 */
export const getRequestList = () => {
    return Request({
        url: '/contact/request/list',
        method: 'post'
    }).then(res => {
        if (res.data.code === '200') {
            console.log(res.data.data);
            return res.data.data;
        } else if (res.data.code === '400') {
            openNotification('提示', res.data.msg)
            return null;
        }
    });
}

export const sendContactRequest = (contactRequest) => {
    Request({
        url: '/contact/add',
        method: 'post',
        data: contactRequest
    }).then(res => {
        openNotification('提示', res.data.msg)
    });
}

/**
 * return
 * String contactId;   //账号
 * String contactName; //用户名
 * String contactPhoto;//用户头像
 * */
export const searchContact = async (contactId) => {
     return await Request({
        url: '/contact/search',
        method: 'post',
        data: reactive({
            userId: contactId
        })
    }).then( res => {
        if (res.data.code === '200') {
            return res.data.data;
        } else if (res.data.code === '400') {
            openNotification('提示', res.data.msg)
        }
    })


}