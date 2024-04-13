<script setup>
import {ref} from "vue";
import {useMeStore} from "@/js/store/Me.js";
import {getPath} from "@/js/main/message/PathController.js";

const props = defineProps(["message"]);
const message = ref(props.message);
const isMe = ref(message.value.sender === useMeStore().userInfo.userId);

</script>

<template>
  <div class="message" :class="{'selfMes':isMe,'otherMes':!isMe}">

    <div>
      <img class="avatar" :src="getPath(message.sender+ '.jpg')"  alt="photo"/>
    </div>

    <div>
      <!-- 图片消息 -->
      <div v-if="message.type === 2 && message.images.length > 0">
        <a-image-preview-group>
          <a-image v-for="img in message.images" :width="200" :src="getPath(img)"/>
        </a-image-preview-group>
      </div>

      <!-- 视频消息 -->
      <div v-if="message.type === 2 && message.video.length > 0">
        <video :src="message.video" controls></video>
      </div>

      <!-- 文件消息 -->
      <div v-if="message.type === 3 && message.file.length > 0">
        <a :href="getPath(message.file)" download>文件</a>
      </div>

      <!-- 语音消息 -->
      <audio v-if="message.type === 4" :src="getPath(message.audio)" controls></audio>

      <!-- 文字  -->
      <p v-if="message.type === 2 && message.text.length > 0">{{ message.text }}</p>
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
  //max-width: 10%;
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
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

</style>