<template>
  <div class="chatList-container">
    <a-input-search class="search" v-model:value="searchValue" placeholder="朋友、群组或频道" enter-button="搜索" size="large" @search="onSearch"/>

    <ul>
      <li v-for="user in chatList" :key="user.id" @click="selectUser(user)">

        <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">

          <a-flex justify="space-between">

            <a-space direction="vertical" :size="36">
              <a-space wrap :size="20" style="padding-top: 30%;padding-left: 30%">
                <a-badge :count="5" :overflow-count="999">
                  <a-avatar size="large">
                    <template #icon><img src="https://avatars.githubusercontent.com/u/76564306?s=40&v=4" alt="头像"></template>
                  </a-avatar>
                </a-badge>
              </a-space>
            </a-space>

            <a-flex vertical justify="space-between" :style="{ paddingLeft: '30px'}" style="background-color: #2c3e50">
              <h3><a href="#">名字</a></h3>
              最新消息
            </a-flex>

          </a-flex>

        </a-card>

      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['chatList']);
const emit = defineEmits(['selectUser']);
const chatList = props.chatList;
import { ref } from 'vue';
const searchValue = ref('');

const onSearch = (searchValue) => {
  //参数为用户输入的值，使用此值进行搜索
  console.log('use value', searchValue);
};
const selectUser = (user) => {
  emit('selectUser', user);
};

const cardStyle = {
  width: '100%',
  height: '100%',
};
</script>

<style>
.chatList-container {
  width: 25%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding-left: 2px;
  border-radius: 5px;
  overflow: auto;
}

.search{
  width: 90%;
  height: 5%;
  margin-left: 5%;
  margin-top: 1%;
  font-family: "JetBrains Mono", monospace;
  color: #000000;
}

/* 滚动条整体 */
.chatList-container::-webkit-scrollbar {
  height: 5px;
  width: 2px;
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
</style>