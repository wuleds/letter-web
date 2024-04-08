<script setup>

import ChatList from "@/components/main/ChatList.vue";
import MessageArea from "@/components/main/MessageArea.vue";
import {ref} from "vue";
import {useChatListStore} from "@/js/store/ChatListData.js";
import {storeToRefs} from "pinia";

//获取对话列表
const chatList = useChatListStore().chatList;
</script>

<template>
  <div class="window-container">
    <ChatList :chatList="chatList"/>
    <MessageArea/>
  </div>
</template>

<style scoped>
.window-container {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>