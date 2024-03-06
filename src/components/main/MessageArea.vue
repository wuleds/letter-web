<template>
  <div class="chat-area">
    <div class="chat-header">
      {{ user.name }}
    </div>

    <div class="chat-input">
      <input type="text" v-model="message" />
      <button @click="">发送</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const user = defineProps(['user']);
const message = ref('');

</script>

<style>
.chat-area {
  width: 66.66%;
  background-color: #fff;
}

.chat-header {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.chat-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-messages {
  padding: 10px;
  overflow-y: auto;
}

.chat-message {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f7f7f7;
}

.chat-message.from-me {
  background-color: #ddd;
  float: right;
}

.chat-input {
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-input button {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}
</style>