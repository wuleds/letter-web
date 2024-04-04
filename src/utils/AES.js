import Request from "@/utils/Request.js";

/**获取AES密钥*/
export async function getAESKey() {
    await Request({
        url: "/user/aes",
        method: "post"
    }).then(async res => {
        if(res.data.code === 200) {
            const keyBase64 = res.data.data;
            sessionStorage.setItem("aesKey", keyBase64);
        }
    })
}

export async function importKey(base64Key) {
    const binaryString = window.atob(base64Key);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const rawKey = bytes.buffer;
    return await window.crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function encryptWithAes(text, key) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    //每次加密都需要一个新的IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
    );
    return { encrypted: new Uint8Array(encrypted), iv };
}

export async function decryptWithAes(ciphertext, iv, key) {
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        ciphertext
    );
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}