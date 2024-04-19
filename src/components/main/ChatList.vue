<script setup>
import {useChatListStore} from "@/js/store/ChatListData.js";
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";
import {useUnreadCountStore} from "@/js/store/UnreadCount.js";
import {computed, ref} from 'vue';
import {getPath} from "@/js/main/message/PathController.js";
const searchValue = ref('');

const unreadCount = computed(()=>useUnreadCountStore().unreadCounts);
const chatList = computed(()=>useChatListStore().chatList);
const cardStyle = {
  width: '100%',
  height: '100%',
};

const isCurrent = computed(() => {
  return (chatId) => {
    return chatId === useCurrentChatStore().currentChat.chatId;
  };
});

const changeObject = (chat) => {
  useCurrentChatStore().setCurrentChat({
    chatId: chat.chatId,
    toId: chat.toId,
    type: chat.type
  });
};

const deleteChat = (chat) => {
  console.log('delete chat', chat.chatId);
};

</script>

<template>
  <div class="chatList-container">
    <ul v-if="chatList!== undefined && chatList !== null">
      <li v-for="value in chatList"  >
            <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }" :class="{'isCurrent':isCurrent(value.at(1).chatId)}" >
              <div class="card" @click="changeObject(value.at(1))">
                  <div class="contact-photo">
                        <a-badge :count="unreadCount.get(value.at(1).chatId)" :overflow-count="999">
                          <a-avatar size="large">
                            <template #icon><img :src="getPath(value.at(1).toId + '.jpg')" alt="头像"></template>
                          </a-avatar>
                        </a-badge>
                  </div>

                  <div class="contact-data">

                    <div class="contact-name">
                      <a>{{value.at(1).toId}}</a>
                      <div class="delete-btn" @click="deleteChat(value.at(1))">
                        <svg class="chat-icon" aria-hidden="true">
                          <use xlink:href="#icon-chacha"></use>
                        </svg>
                      </div>
                    </div>
                  </div>

              </div>
            </a-card>

      </li>
    </ul>
  </div>
</template>

<style>
.chatList-container {
  width: 25%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding-left: 2px;
  border-radius: 5px;
  overflow-y: auto;
  font-family: "Sarasa Fixed SC", serif;
}

.search{
  width: 90%;
  height: 5%;
  margin-left: 5%;
  margin-top: 1%;
  font-family: "JetBrains Mono", monospace;
}

.chatList-container::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}

.isCurrent{
  background-color: #3390ec;
}

.chatList-container ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.chatList-container ul li {
  width: 100%;
  height: 10%;
  padding-top: 1%;
  margin: 0;
  cursor: pointer;
}

.chatList-container ul li img {
  width: 40px;
  height: 40px;
}

li{
  list-style-type: none;
}

.card {
  display: flex;
  padding: 2px;
}

.contact-photo {
  height: 100%;
  width: 15%;
  padding: 15px;
  margin: 0;
}

.contact-data {
  margin:0;
  padding: 0;
  overflow: auto;
}

.contact-name {
  display: flex;
}

.latest-msg {
  width: 90%;
  height: 28%;
  overflow: hidden;
}

.delete-btn{
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
}

.delete-btn:hover{
  background-color: #eeeeee;
}

.chat-icon {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>