import {openNotification} from "@/js/Notify/Notify.js"
import Request from "@/utils/Request.js";

export const signin = (data)=>{
    Request({
        url: '/user/signin',
        method: 'post',
        data: data
    })
}

export const getAuthCode = (data)=>{
    if(data.contact === ''){
        openNotification('提示', '请输入联系方式')
    }else {
        Request({
            url: '/auth/get',
            method: 'post',
            data: data
        }).then((res)=>{
            openNotification('提示',res.data.msg)
        })
    }

}