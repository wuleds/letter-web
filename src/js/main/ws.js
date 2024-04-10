import {useMeStore} from "@/js/store/Me.js";

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
        //发送验证信息
        this.sendMessage(JSON.stringify({
            type: '1',
            authorization: localStorage.getItem('Authorization'),
        }));
        // 连接成功后，开始心跳
        this.startHeartbeat();
    }

    onMessage(event) {
        if (event.data === 'pong') {
            // 收到pong消息，说明连接正常
            console.log('pong');
            this.startHeartbeat(); // 重新开始心跳
        }
    }

    onClose() {
        console.log('WebSocket 断开连接');
        this.stopHeartbeat();
        if(this.linkState) {
            this.reconnect();
        }else {
            this.linkState = true;
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

    startHeartbeat() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
        }
        this.pingInterval = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                const ping = {
                    type: '0',
                    text: 'ping',
                    authorization: localStorage.getItem('Authorization')
                };
                this.sendMessage(ping);
                console.log('ping');
            }
        }, 10000); // 每10秒发送一次ping

        // 如果2秒内没有收到pong，视为连接异常，尝试重连
        setTimeout(() => {
            if (this.ws.readyState !== WebSocket.OPEN) {
                console.log('未收到pong ，重连接');
                this.reconnect();
            }
        }, 12000);
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
            console.log('WebSocket 未连接.');
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