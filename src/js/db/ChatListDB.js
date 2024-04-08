const DB_NAME = 'LetterDB';
const STORE_NAME = 'ChatList-' + localStorage.getItem('userId')
let DB_VERSION = Date.now().toString();

export const dbOps = {
    openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, {keyPath: 'chatId'});
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async insertItems(items) {
        const db = await this.openDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        return new Promise((resolve, reject) => {
            items.forEach(item => {
                const request = store.add({chatId: item.chatId, type: item.type, myId: item.myId, toId: item.toId});
                request.onerror = () => reject(request.error);
            });
            transaction.oncomplete = () => resolve();
        });
    },

    async insertItem(item) {
        const db = await this.openDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        return new Promise((resolve, reject) => {
            const request = store.add({chatId: item.chatId, type: item.type, myId: item.myId, toId: item.toId});
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    async deleteItem(chatId) {
        const db = await this.openDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        return new Promise((resolve, reject) => {
            const request = store.delete(chatId);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    async getChatListInDB() {
        const db = await this.openDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}