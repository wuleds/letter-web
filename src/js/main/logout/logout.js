import {openNotification} from "@/js/Notify/Notify.js"
import Request from "/src/utils/Request.js";
const logout = () => {
    Request({
        url: '/user/logout',
        method: 'post',
    }).then((res)=>{
        if(res.data.code === '200'){
            openNotification('提示', res.data.msg);
            console.log("退出登录");
        }
        localStorage.removeItem('Authorization');
    })

}
export default logout;