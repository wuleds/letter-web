<script setup>
const props = defineProps(['chatList']);
const chatList = props.chatList;
import { ref } from 'vue';
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";
const searchValue = ref('');

const onSearch = (searchValue) => {
  //参数为用户输入的值，使用此值进行搜索
  console.log('use value', searchValue);

};
const cardStyle = {
  width: '100%',
  height: '100%',
};
const isCurrent = (chatId) => {
  return chatId === localStorage.getItem('CurrentChatId');
};

const changeObject = (chat) => {
  useCurrentChatStore().setCurrentChat({
    chatId: chat.chatId,
    toId: chat.toId,
    type: chat.type
  });
  console.log(chat.toId, chat.chatId);
};

const deleteChat = (chat) => {
  console.log('delete chat', chat.chatId);
};
</script>

<template>
  <div class="chatList-container">
    <div style="display: flex">
      <a-input v-model:value="searchValue" size="large" placeholder="搜索联系人，群组或频道" />
      <button>搜索</button>
    </div>
    <ul v-if="chatList!== undefined && chatList !== null">
      <li v-for="chat in chatList" :key="chat.chatId" >
            <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }" :class="{'isCurrent':isCurrent}" >
              <div class="card" @click="changeObject(chat)">
                  <div class="contact-photo">
                        <a-badge :count="5" :overflow-count="999">
                          <a-avatar size="large">
                            <template #icon><img src="https://avatars.githubusercontent.com/u/76564306?s=40&v=4" alt="头像"></template>
                          </a-avatar>
                        </a-badge>
                  </div>

                  <div class="contact-data">

                    <div class="contact-name">
                      <a>{{chat.toId}}</a>
                      <div class="delete-btn" @click="deleteChat(chat)">
                        <svg class="chat-icon" aria-hidden="true">
                          <use xlink:href="#icon-chacha"></use>
                        </svg>
                      </div>
                    </div>

                    <div class="latest-msg">This is a Message! This is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a MessageThis is a Message</div>
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