<script setup>
import {onMounted, ref} from "vue";
import {useMeStore} from "@/js/store/Me.js";
import {getPath} from "@/js/main/message/PathController.js";

const props = defineProps(["message"]);
const message = ref(props.message);
const isMe = ref(message.value.senderId === useMeStore().userInfo.userId);

const exist = (item) => {
  return item !== undefined && item !== null && item !== '' && item.length > 0;
};



</script>

<template>
  <div class="message" :class="{'selfMes':isMe,'otherMes':!isMe}">
    <div>
      <img class="avatar" :src="getPath(message.senderId+ '.jpg')"  alt="photo"/>
    </div>
    {{message}}

    <div>

      <!-- 图片消息 -->
      <div v-if="message.type === '2' && exist(message.image)">
        <a-image-preview-group>
          <a-image v-for="img in JSON.parse(message.image)" :height="200" :src="getPath(img)"/>
        </a-image-preview-group>
      </div>

      <!-- 视频消息 -->
      <div v-if="message.type === '2' && exist(message.video)">
        <video :src="getPath(message.video)" controls></video>
      </div>

      <!-- 文件消息 -->
      <div v-if="message.type === '3' && exist(message.file)">
        <a :href="getPath(message.file)" download>文件</a>
      </div>

      <!-- 语音消息 -->
      <audio v-if="message.type === '4' && exist(message.video)" :src="getPath(message.audio)" controls></audio>

      <!-- 文字  -->
      <p v-if="message.type === '2' && exist(message.text)">{{ message.text }}</p>
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