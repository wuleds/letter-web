<script setup>
import { ref } from 'vue';
import {WebSocketClient} from "/src/js/main/ws.js";
const text = ref('')
const WSClient = WebSocketClient.getInstance();

</script>

<template>
  <input type="text" :value="text"> {{text}}
  <button @click="WSClient.sendMessage(text)">发送</button>
  <button @click="WSClient.disconnect()">关闭</button>
</template>

<style scoped>

</style>