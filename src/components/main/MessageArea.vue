<template>
  <div class="messageArea-container">

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
.messageArea-container {
  width: 70%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding-left: 2px;
  border-radius: 5px;
  overflow: auto;
}

.chat-input input {
  width: 50%;
  height: 50%;
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