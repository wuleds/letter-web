<script setup>
import { ref } from 'vue';
import {connect, disconnect,sendToServer, getServerMessage} from "@/js/main/Webocket.js";

connect();
const text = ref('')
</script>

<template>
<input type="text" :value="text"> {{text}}
<button @click="sendToServer(text)">发送</button>
</template>

<style scoped>

</style>