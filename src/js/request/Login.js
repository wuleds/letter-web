import {openNotification} from "/src/js/Notify/Notify.js"
import Request from "/src/utils/Request.js";
import {useMeStore} from "@/js/store/Me.js";

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
        }).then(async (res)=>{
            if(res.data.code !== '200'){
                openNotification('提示', res.data.msg);
                return
            }
            openNotification('提示','登录成功')
            const jwt = res.data.data;
            localStorage.setItem('Authorization',jwt);
            await getUserInfo();
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
        }).then( async (res)=>{
            if(res.data.code === '200'){
                await getUserInfo()
                window.location.href = '/main';
            }
        })
    }
}

const getUserInfo =  async ()=>{
     await Request({
        url: '/user/info',
        method: 'post',
    }).then((res)=>{
        if(res.data.code === '200'){
            console.log(res.data.data)
            useMeStore().setUserInfo(JSON.parse(res.data.data));
        }
    })
    //存储个人信息
    // UserInfo:{
    //     String userId;   //用户id
    //     String userName; //用户名
    //     String userPhoto; //用户头像
    //     String userTalk;  //用户签名
    //     String userSex;  //用户性别,私密
    //     String userEmail; //用户邮箱，私密
    //     String userPhone; //用户电话，私密
    //     String userAddress; //用户地址，私密
    //     Date userBirthday; //用户生日，私密
    // }
}