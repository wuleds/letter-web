<template>
  <div>
    <button @click="stopRecording" :disabled="!isRecording">停止录音</button>
    <button @click="clearRecording" :disabled="!audioBlob">清除录音</button>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {sendAudio} from "@/js/main/message/SendFile.js";
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";
import {WebSocketClient} from "@/js/main/ws.js";

const isRecording = ref(false);
const audioBlob = ref(null);
const audioUrl = ref('');
let mediaRecorder = null;
let audioChunks = [];
const isReply = ref(false);
const replyMessageId = ref('');
const ws = WebSocketClient.getInstance();

const props = defineProps(['isReply', 'replyMessageId']);

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob.value = new Blob(audioChunks, { type: 'audio/webm' });
      audioUrl.value = URL.createObjectURL(audioBlob.value);
      stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorder.start();
    isRecording.value = true;
  } catch (error) {
    console.error('Error accessing microphone', error);
  }
};

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    isRecording.value = false;
  }
};

const clearRecording = () => {
  audioChunks = [];
  audioBlob.value = null;
  audioUrl.value = '';
};

const sendRecording = async () => {
  stopRecording()
  if (audioBlob.value) {
    const formData = new FormData();
    formData.append('audio', audioBlob.value,'audio.webm');

    await sendAudio(formData);
    clearRecording();
    const hash = await digest(audioBlob.value);
    ws.sendMessage({
      chatId: useCurrentChatStore().currentChat.chatId,
      sender: sessionStorage.getItem("userId"),
      receiver: useCurrentChatStore().currentChat.toId,
      type: 4,
      audio: hash + '.webm',
      replyStatus: props.isReply,
      replyMessageId: props.replyMessageId,
      authorization: localStorage.getItem("Authorization")
    })
  }
};

const digest = async (file)=>{
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
startRecording();
</script>