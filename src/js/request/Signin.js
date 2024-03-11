import {openNotification} from "@/js/Notify/Notify.js"
import Request from "@/utils/Request.js";

export const signin = (data)=>{
    if(data.code === ''){
        openNotification('提示', '请输入验证码。');
    }else if(data.userName === '' || data.userName.length < 2){
        openNotification('提示', '请检查用户名。');
    }else if(data.password === '' || data.secondPassword === ''){
        openNotification('提示', '请输入密码和确认密码。');
    }else if(data.password !== data.secondPassword){
        openNotification('提示', '密码和确认密码不一致。');
    }else {
        Request({
            url: '/user/signin',
            method: 'post',
            data: data
        }).then((res)=>{
            if(res.data.code !== '200'){
                openNotification('提示', res.data.msg);
            }else {
                openNotification('提示','注册成功，账号：' + res.data.data)
            }

        })
    }
}

export const getAuthCode = (data)=>{
    if(data.s === ''){
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