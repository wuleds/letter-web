import Request from "@/utils/Request.js";
import {openNotification} from "@/js/Notify/Notify.js";

export const updateInfo = (data) => {
    Request({
        url: '/user/update',
        method: 'post',
        data: data
    }).then(res => {
        if(res.data.code === '200') {
            openNotification('提示','信息已更新')
            window.location.href = '/';
        }else {
            openNotification('提示','信息失败')
        }
    });
};