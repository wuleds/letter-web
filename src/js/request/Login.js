import {openNotification} from "@/js/Notify/Notify.js"
import Request from "@/utils/Request.js";

export const login = (data)=>{
    if(data.userId === ''){
        openNotification('提示', '请输入账号。');
    }else if(data.password === ''){
        openNotification('提示', '请输入密码。');
    }else {
        Request({
            url: '/user/login',
            method: 'post',
            data: data
        }).then((res)=>{
            if(res.data.code !== '200'){
                openNotification('提示', res.data.msg);
                return
            }
            openNotification('提示','登录成功')
            const jwt = res.data.data;
            localStorage.setItem('Authorization',jwt);
            window.location.href = '/main';
        })
    }
}

export const autoLogin= ()=>{
    const jwt = localStorage.getItem('Authorization');
    if(jwt !== null){
        Request({
            url: '/user/autoLogin',
            method: 'post',
        }).then((res)=>{
            if(res.data.code === '200'){
                window.location.href = '/main';
            }
        })
    }
}