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
export async function getContactList(){
    return await Request({
        url: '/contact/list',
        method: 'post'
    }).then(res => {
        if(res.data.code === '200'){
            return JSON.parse(res.data.data);
        }
        return null;
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
export async function getRequestList() {
    return await Request({
        url: '/contact/request/list',
        method: 'post'
    }).then(res => {
        if (res.data.code === '200') {
            return JSON.parse(res.data.data);
        }
        return null;
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

export const handleContactRequest = async (data)=>{
    //String requestId;  //请求id
    //int status;        //处理结果,0:未处理,1:同意,2:忽略
    return await Request({
        url: '/contact/handle',
        method: 'post',
        data: data
    }).then((res)=>{
        if(res.data.code === '200'){
            return true;
        }else if(res.data.code === '400'){
            openNotification('错误',res.data.msg);
        }

        return false;
    })
}