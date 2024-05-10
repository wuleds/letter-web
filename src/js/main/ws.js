import {useMeStore} from "@/js/store/Me.js";
import {openNotification} from "@/js/Notify/Notify.js";
import {useUnreadCountStore} from "@/js/store/UnreadCount.js";
import {messageDBOps} from "@/js/db/MessageDB.js";
import {useChatListStore} from "@/js/store/ChatListData.js";
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";
import {usePrivateChatStore} from "@/js/store/PrivateChat.js";

export class WebSocketClient {
    static instance = null; // 单例
    ws = null; // WebSocket 实例
    currentUrl = window.location.host;
    protocol = import.meta.env.PROD
            ? import.meta.env.VITE_WSS
            : import.meta.env.VITE_WS
    WS_URL = `${this.protocol}${this.currentUrl}/link`;
    pingInterval = null; // 心跳包定时器
    reconnectTimeout = null; // 重连定时器
    unreadCountInterval = null;
    unreadMessageInterval = null;
    reconnectInterval = null;
    //初始化
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
        // 开始获取未读消息数
        this.startGetUnreadCount();
        console.log('开始获取未读数');
        this.startGetMessage();
        console.log('开始获取未读消息')
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
            console.log('禁止重连'+text);
            //this.linkState = false;
        }else if(type === '2') {
            //系统通知
            openNotification('系统通知',text);
        }else if(type === '3') {
            //操作结果
            console.log('操作结果：'+text);
        }else if(type === '4') {
            //未读消息数,是云端最新消息id - 本地最新消息id
            const unreadList = JSON.parse(text);
            unreadList.forEach((item) => {
                useUnreadCountStore().setCount(item.chatId,item.lastMessageId);
            })
        }else if(type === '5') {
            //获取消息
            let unreadMessagesList = JSON.parse(text);
            const chatId = message.chatId;
            const chatType = message.chatType;
            //将消息存入数据库
            if(unreadMessagesList === null || unreadMessagesList === undefined || unreadMessagesList.length === 0) {
                console.log('没有收到新消息');
            }else if(chatType === 'group' || chatType === 'channel') {
                //群组和频道消息存入数据库,并设置本地最新消息
                messageDBOps.insertItems(chatId,unreadMessagesList).then(() => {});
                useUnreadCountStore().updateLastMessageId(chatId);
            }else if(chatType === 'private'){
                //私聊消息,存入专门的状态库
                //设更新本地最新消息id
                useUnreadCountStore().setLastMessageId(chatId,unreadMessagesList[unreadMessagesList.length-1].messageId);
                //将私聊消息存入状态库
                usePrivateChatStore().insertMessages(chatId,unreadMessagesList);
            }
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
        //if(this.linkState) {
            this.reconnect();
       // }
    }
    onError(error) {
        console.error('WebSocket 连接错误:', error);
        this.ws.close();
    }
    reconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectTimeout = setTimeout(() => {
            console.log('重新连接...');
            this.init();
        }, 5000); // 5秒后尝试重连
    }
    //启动心跳包机制，每10发送一次心跳包，表示前端在线
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
        if (this.reconnectInterval) {
            clearInterval(this.pingInterval);
        }
        this.reconnectInterval = setInterval(() => {
            if (this.ws.readyState !== WebSocket.OPEN) {
                this.reconnect();
                console.log('开始重新连接');
            }
        }, 5000); // 每5秒尝试重连
    }
    stopHeartbeat() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }
    //开始获取未读消息数
    startGetUnreadCount(){
        const chatArray = [];
        useChatListStore().chatList.forEach((value,key) => {
            chatArray.push(value);
        });
        //初始化本地最新消息
        useUnreadCountStore().initLastMessage(chatArray);
        //初始化未读消息数
        useUnreadCountStore().initUnread(chatArray);

        if (this.unreadCountInterval) {
            clearInterval(this.pingInterval);
        }
        this.unreadCountInterval = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                const lastMessageArray = [];
                useUnreadCountStore().lastMessage.forEach((value, key) => {
                    lastMessageArray.push({
                        chatId: key,
                        lastMessageId: value
                    });
                })
                const last = {
                    chatId: 'server',
                    type: '20',
                    text:  JSON.stringify(lastMessageArray),
                    sender: useMeStore().userInfo.userId,
                    receiver: 'server',
                    authorization: localStorage.getItem('Authorization')
                };
                this.sendMessage(last);
            }
        }, 1000); // 每10秒发送一次ping
    }
    //获取当前未读消息
    startGetMessage(){
        if(this.unreadMessageInterval){
            clearInterval(this.unreadMessageInterval);
        }
        this.unreadCountInterval = setInterval(() => {
            let chatId = useCurrentChatStore().currentChat.chatId;
            let text = useUnreadCountStore().lastMessage.get(chatId) || 0
            let request = {
                chatId: chatId,
                type: '21',
                text: text !== null ? text  : '0',
                sender: useMeStore().userInfo.userId,
                receiver: 'server',
                authorization: localStorage.getItem('Authorization')
            };
            this.sendMessage(request);
        },1000) //每1秒获取一次未读消息

    }
    //发送消息
    sendMessage(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            openNotification('发送错误', 'WebSocket 未连接')
            console.log('WebSocket 未连接');
        }
    }

    static getInstance() {
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient();
        }
        return WebSocketClient.instance;
    }

    disconnect() {
        this.stopHeartbeat();
      //  this.linkState = false;
        this.ws.close();
    }


}