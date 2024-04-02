const WebSocketClient = (() => {
    let ws = null;
    let heartBeatTimer = null;
    let reconnectTimer = null;
    const WS_URL = 'ws://your-server-websocket-url'; // 你的WebSocket服务端地址

    const connect = () => {
        if (ws !== null) {
            console.log('WebSocket is already connected or in connecting state.');
            return;
        }

        ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log('WebSocket connected');
            startHeartBeat();
            if (typeof onOpen === 'function') onOpen();
        };

        ws.onmessage = (event) => {
            console.log('Received message:', event.data);
            if (typeof onMessage === 'function') onMessage(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            stopHeartBeat();
            ws = null; // Clear WebSocket object
            if (typeof onClose === 'function') onClose();
            reconnect();
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close(); // Will trigger onclose event
        };
    };

    const startHeartBeat = () => {
        heartBeatTimer = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send('ping');
            }
        }, 10000); // 每10秒发送一次心跳
    };

    const stopHeartBeat = () => {
        clearInterval(heartBeatTimer);
        heartBeatTimer = null;
    };

    const reconnect = () => {
        if (reconnectTimer !== null) return; // 避免重复重连
        reconnectTimer = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connect(); // 尝试重新连接
            reconnectTimer = null;
        }, 5000); // 5秒后尝试重连
    };

    const sendMessage = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        } else {
            console.error('WebSocket is not connected.');
        }
    };

    const disconnect = () => {
        if (ws) {
            ws.close();
        }
    };

// 事件钩子，根据需要重写这些方法
    let onOpen = null;
    let onMessage = null;
    let onClose = null;

    return {
        connect,
        sendMessage,
        disconnect,
        setOnOpen: (callback) => onOpen = callback,
        setOnMessage: (callback) => onMessage = callback,
        setOnClose: (callback) => onClose = callback
    };
})();