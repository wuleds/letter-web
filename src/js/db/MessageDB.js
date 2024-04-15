const DB_NAME = 'LetterDB';
let DB_VERSION = Date.now();

export const messageDBOps = {
    openDB(storeName) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, {keyPath: 'messageId'});
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async insertItems(storeName, items) {
        const db = await this.openDB(storeName);
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            items.forEach(item => {
                const request = store.add({
                    messageId: item.messageId,
                    senderId: item.senderId,
                    receiverId: item.receiverId,
                    type: item.type,
                    text: item.text,
                    image: item.image,
                    video: item.video,
                    audio: item.audio,
                    file: item.file,
                    replyStatus: item.replyStatus,
                    replyId: item.replyId,
                    createDate: item.createDate,
                    updateDate: item.updateDate
                });
                request.onerror = () => reject(request.error);
            });
            transaction.oncomplete = () => resolve();
        });
    },

    async insertItem(storeName, item) {
        const db = await this.openDB(storeName);
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.add({
                messageId: item.messageId,
                senderId: item.senderId,
                receiverId: item.receiverId,
                type: item.type,
                text: item.text,
                image: item.image,
                video: item.video,
                audio: item.audio,
                file: item.file,
                replyStatus: item.replyStatus,
                replyId: item.replyId,
                createDate: item.createDate,
                updateDate: item.updateDate,
            });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    async deleteItem(storeName, messageId) {
        const db = await this.openDB(storeName);
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.delete(messageId);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    async getMessagesInDB(chatId) {
        const db = await this.openDB(chatId);
        const transaction = db.transaction([chatId], 'readonly');
        const store = transaction.objectStore(chatId);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    //获取最后一条消息的id
    async getLastMessageIdInDB(storeName) {
        const db = await this.openDB(storeName);
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                const messages = request.result;
                if (messages.length === 0) {
                    resolve(null);
                } else {
                    resolve(messages[messages.length - 1].messageId);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}