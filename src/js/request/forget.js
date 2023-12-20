import {openNotification} from "@/js/Notify/Notify.js"
import Request from "@/utils/Request.js";

export const forget = (data)=>{
    if(data.userId === ''){
        openNotification('提示','请输入账号。')
    }else if(data.contact === ''){
        openNotification('提示','请输入联系方式。')
    }else if(data.method === ''){
        openNotification('提示','请选择联系方法。')
    }else {
        Request({
            url: '/user/forget',
            method: 'post',
            data: data
        }).then((res)=>{
            openNotification('提示',res.data.msg)
        })
    }
}

export const reset = (data)=>{
    if(data.password === '' || data.secondPassword === ''){
        openNotification('提示','请输入密码和确认密码。')
    }else if(data.password !== data.secondPassword){
        openNotification('提示','密码和确认密码不一致。')
    }else if(data.longUrl === ''){
        openNotification('提示','链接为空。')
    }else {
        Request({
            url:'/user/reset',
            method:'post',
            data: data
        }).then((res)=>{
            openNotification('提示',res.data.msg);
            if(res.data.code === '200'){
                setTimeout(()=>{
                    window.location.href = '/user/login'
                }, 2000);
            }
        })
    }
}