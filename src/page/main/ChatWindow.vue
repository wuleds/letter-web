<script setup>
import ChatList from "@/components/main/ChatList.vue";
import MessageArea from "@/components/main/MessageArea.vue";
</script>

<template>
  <div class="window-container">
    <ChatList/>
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