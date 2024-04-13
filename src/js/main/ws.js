import {useMeStore} from "@/js/store/Me.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {useUnreadCountStore} from "@/js/store/UnreadCount.js";
import {messageDBOps} from "@/js/db/MessageDB.js";

export class WebSocketClient {
    static instance = null; // 单例
    ws = null; // WebSocket 实例
    currentUrl = window.location.host;
    WS_URL = `ws://${this.currentUrl}/link`;
    pingInterval = null; // 心跳包定时器
    reconnectTimeout = null; // 重连定时器
    linkState = true;

    constructor() {
        if (WebSocketClient.instance) {
            return WebSocketClient.instance;
        }
        this.init();
        WebSocketClient.instance = this;
    }

    init() {
        this.ws = new WebSocket(this.WS_URL);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    onOpen() {
        console.log('WebSocket 连接成功');
        const auth = {
            chatId: 'server',
            type: '1',
            sender: useMeStore().userInfo.userId,
            receiver: 'server',
            authorization: localStorage.getItem('Authorization')
        };
        //发送验证信息
        this.sendMessage(auth);
        console.log('发送验证信息');
        // 连接成功后，开始心跳
        this.startHeartbeat();
        console.log('开始心跳');
        // 开始重连机制
        this.startReconnect();
        console.log('重连机制启动');
    }

    onMessage(serverMessage) {
        const message = JSON.parse(serverMessage.data);
        const type = message.type;
        const text = message.text;
        if(type === '0') {
            //心跳包
            console.log(text);
        }else if(type === '1') {
            //禁止重连
            console.log(text);
            this.linkState = false;
        }else if(type === '2') {
            //系统通知
            openNotification('系统通知',text);
        }else if(type === '3') {
            //操作结果
            console.log(text);
        }else if(type === '4') {
            //未读消息数
            const unreadList = JSON.parse(text);
            unreadList.forEach((item) => {
                useUnreadCountStore().setCount(item.chatId,item.lastMessageId);
            })
        }else if(type === '5') {
            //获取消息
            const unreadMessagesList = JSON.parse(text);
            const chatId = message.chatId;
            const chatType = message.chatType;
            //将消息存入数据库
            messageDBOps.insertItems(chatId,unreadMessagesList).then(() => {});
        }else if(type === '6'){
            //删除消息
            const messageId = text;
            const chatId = message.chatId;
            messageDBOps.deleteItem(chatId,messageId).then(() => {});
        }
    }

    onClose() {
        console.log('WebSocket 断开连接');
        this.stopHeartbeat();
        if(this.linkState) {
            this.reconnect();
        }
    }

    onError(error) {
        console.error('WebSocket 连接错误:', error);
        this.ws.close();
    }

    reconnect() {
        if(this.pingInterval){
            clearInterval(this.pingInterval);
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectTimeout = setTimeout(() => {
            console.log('重新连接...');
            this.init();
        }, 5000); // 5秒后尝试重连
    }

    /**启动心跳包机制，每10发送一次心跳包，表示前端在线*/
    startHeartbeat() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
        }
        this.pingInterval = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                const ping = {
                    chatId: 'server',
                    type: '0',
                    text: 'ping',
                    sender: useMeStore().userInfo.userId,
                    receiver: 'server',
                    authorization: localStorage.getItem('Authorization')
                };
                this.sendMessage(ping);
                console.log('ping');
            }
        }, 10000); // 每10秒发送一次ping
    }

    //开始重连机制，每2秒检查一次连接状态
    startReconnect(){
        setTimeout(() => {
            if (this.ws.readyState !== WebSocket.OPEN && this.linkState) {
                console.log('重连接');
                this.reconnect();
            }
        }, 2000);
    }

    stopHeartbeat() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    sendMessage(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            openNotification('发送错误', 'WebSocket 未连接')
            console.log('WebSocket 未连接');
        }
    }

    disconnect() {
        this.stopHeartbeat();
        this.linkState = false;
        this.ws.close();
    }

    static getInstance() {
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient();
        }
        return WebSocketClient.instance;
    }
}