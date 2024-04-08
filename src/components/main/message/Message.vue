<script setup>
import {ref} from "vue";

const props = defineProps(["message"]);
const message = ref(props.message);
const isMe = ref(message.value.sender === localStorage.getItem("userId"));

</script>

<template>
  <div class="message" :class="{'selfMes':isMe,'otherMes':!isMe}">

    <div>
      <img class="avatar" :src="message.photo"  alt="photo"/>
    </div>

    <div>
      <!-- 图片消息 -->
      <div v-if="message.type === 2 || message.type === 6 || message.type === 8">
        <a-image-preview-group>
          <a-image v-for="img in message.images" :width="200" :src="img.path" />
        </a-image-preview-group>
      </div>

      <!-- 视频消息 -->
      <div v-if="message.type === 3 || message.type === 7 || message.type === 8">
        <video :src="message.video" controls></video>
      </div>

      <!-- 文件消息 -->
      <div v-if="message.type === 4 || message.type === 9">
        <a :href="message.file.url" download>{{ message.file.name }}</a>
      </div>

      <!-- 语音消息 -->
      <audio v-if="message.type === 5" :src="message.voice" controls></audio>

      <!-- 文字 (类型 6, 7, 8, 9) -->
      <p v-if="[1,6, 7, 8, 9].includes(message.type)">{{ message.text }}</p>
    </div>

  </div>
</template>

<style>
.message img {
  width: 100px; /* 示例宽度，根据需要调整 */
  height: auto;
  margin-right: 5px;
}

.message video {
  width: 200px; /* 示例宽度，根据需要调整 */
  height: auto;
  margin-right: 5px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 10px;
  max-width: 60%;
}
.selfMes{
  background-color: #b2fab4; /* 自己的消息背景色 */
  margin-left: auto;
  border-top-right-radius: 0;
}

.otherMes{
  background-color: #add8e6; /* 对方的消息背景色 */
  margin-right: auto;
  border-top-left-radius: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.content img,
.content video {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 5px;
}

.content audio {
  width: 100%;
  margin-top: 5px;
}
</style>