import {openNotification} from "/src/js/Notify/Notify.js";
// 创建WebSocket连接
const websocketUrl = "ws://localhost:8080/ws";
let socket = new WebSocket(websocketUrl);

// 设置心跳检测
let heartCheck = {
    timeout: 60000, // 1分钟发一次心跳
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function() {
        this.timeoutObj = setTimeout(() => {
            // 发送心跳请求，后端返回'Pong'消息，表示连接正常
            socket.send("Ping");
            this.serverTimeoutObj = setTimeout(() => { // 如果超过一定时间还没重置，说明后端主动断开了
                socket.close(); // 关闭连接
            }, this.timeout)
        }, this.timeout)
    }
};

// 连接打开时触发
socket.onopen = (e) => {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John");
    heartCheck.reset().start(); // 连接成功后启动心跳检测
    openNotification("建立连接", "与服务器建立了通信")
};

// 接收到服务器消息时触发
socket.onmessage = (event) => {
    console.log(`[message] Data received from server: ${event.data}`);
    if(event.data === 'Pong'){ // 如果服务器返回的是'Pong'，表示连接正常，重置心跳检测
        heartCheck.reset().start();
    }else {
        getMessage(event.data);
    }
};

// 连接关闭时触发
socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
    openNotification("连接关闭", "与服务器的通信已经断开")
};

// 出现错误时触发
socket.onerror = (error)  => {
    openNotification("发生错误", "与服务器通信出现错误")
    console.log(`[error] ${error.message}`);
};

const sendMessage = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        console.log("Sending to server");
        socket.send(message);
    } else {
        openNotification("发生错误", "与服务器通信出现错误")
        console.log("The connection is not open");
    }
}

const getMessage = (message) => {
    //来自服务器的消息的类型：
    // 1. 私聊消息
    // 2. 群组消息
    // 3. 频道消息
    // 4. 系统通知

}

export default sendMessage;