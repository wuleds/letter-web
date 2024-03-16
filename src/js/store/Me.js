//存储本地用户信息

import {defineStore} from "pinia";
import {ref} from "vue";

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
    const userInfo = ref({
        userId: localStorage.getItem('userId') || '',
        userName: localStorage.getItem('userName') || '',
        userPhoto: localStorage.getItem('userPhoto') || '',
        userTalk: localStorage.getItem('userTalk') || '',
        userSex: localStorage.getItem('userSex') || '',
    });

    function setUserInfo(data){
        console.log(data)
        userInfo.userId = data.userId;
        userInfo.userName = data.userName;
        userInfo.userPhoto = data.userPhoto;
        userInfo.userTalk = data.userTalk;
        userInfo.userSex = data.user;
        localStorage.setItem('userId',data.userId);
        localStorage.setItem('userName',data.userName);
        localStorage.setItem('userPhoto',data.userPhoto);
        localStorage.setItem('userTalk',data.userTalk);
        localStorage.setItem('userSex',data.userSex);
    }

    return {
        userInfo,
        setUserInfo
    }
})