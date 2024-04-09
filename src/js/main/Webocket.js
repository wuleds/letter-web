import * as StompJs from '@stomp/stompjs';
import {useMeStore} from "@/js/store/Me.js";

const stompClient = new StompJs.Client({
    brokerURL: '/link',
    connectHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});


stompClient.onConnect = (frame) => {
    //连接成功
    console.log('连接成功: ' + frame);
    stompClient.subscribe('/user/get', (serverMessage) => {
        //接收到消息
        console.log("接收到消息: " + serverMessage.body);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('WebSocket 连接错误');
    console.error(error);
};

stompClient.onStompError = (frame) => {
    console.error('STOMP 错误 : ' + frame.headers['message']);
    console.error('STOMP 错误 : ' + frame.body);
};

function setConnected(connected) {
    //展示在线状态
    console.log(useMeStore().userInfo.userName + connected?"上线":"下线")
}

export function connect() {
    //尝试连接服务器
    stompClient.activate();
}

export function disconnect() {
    //断开连接
    stompClient.deactivate().then(r => {
        console.log("连接断开")
    });
    setConnected(false);
}

export function sendToServer(message) {
    stompClient.publish({
        destination: "/send/server",
        body: JSON.stringify({
            'name': message
        })
    });
}

export function getServerMessage(message) {
    console.log(message);
}