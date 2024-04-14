//存储本地用户信息

import {defineStore} from "pinia";
import {reactive, ref} from "vue";

/**
 *     String userId;   //用户id
 *     String userName; //用户名
 *     String userPhoto; //用户头像
 *     String userTalk;  //用户签名
 *     String userSex;  //用户性别,私密
 *     String userEmail; //用户邮箱，私密
 *     String userPhone; //用户电话，私密
 *     String userAddress; //用户地址，私密
 *     Date userBirthday; //用户生日，私密
 *     */
export const useMeStore = defineStore('me',()=>{
    const userInfo = reactive({
        userId: sessionStorage.getItem('userId') || '',
        userName: sessionStorage.getItem('userName') || '',
        userPhoto: sessionStorage.getItem('userPhoto') || '',
        userTalk: sessionStorage.getItem('userTalk') || '',
        userSex: sessionStorage.getItem('userSex') || '',
    });

    function setUserInfo(data){
        console.log('登录信息：')
        console.log(data);
        userInfo.userId = data.userId;
        userInfo.userName = data.userName;
        userInfo.userPhoto = data.userPhoto;
        userInfo.userTalk = data.userTalk;
        userInfo.userSex = data.user;
        sessionStorage.setItem('userId',data.userId);
        sessionStorage.setItem('userName',data.userName);
        sessionStorage.setItem('userPhoto',data.userPhoto);
        sessionStorage.setItem('userTalk',data.userTalk);
        sessionStorage.setItem('userSex',data.userSex);
    }

    return {
        userInfo,
        setUserInfo
    }
})