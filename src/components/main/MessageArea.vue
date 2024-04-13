<script setup>
import {ref} from "vue";
import {WebSocketClient} from "@/js/main/ws.js";
import {useCurrentChatStore} from "@/js/store/CurrentChat.js";
import Voice from "@/components/main/voice/Record.vue";
import {useMeStore} from "@/js/store/Me.js";
import Message from "@/components/main/message/Message.vue";
const ws = WebSocketClient.getInstance();

//文本
const text = ref('');

//摘要
const fileDigest = ref('');
const videoDigest = ref('');
const imageDigest = ref([]);

const visible = ref(false);

const isReply = ref(false);
const replyMessageId = ref('');
const isRecording = ref(false);

const send = async () => {
  //发送文件
  if(fileDigest.value !== ''){
    ws.sendMessage({
      chatId: useCurrentChatStore().currentChat.chatId,
      sender: useMeStore().userInfo.userId,
      receiver: useCurrentChatStore().currentChat.toId,
      type: 3,
      file: fileDigest.value,
      replyStatus: isReply.value?1:0,
      replyMessageId: isReply.value ? replyMessageId.value : null,
      authorization: localStorage.getItem("Authorization")
    });
  }else {
    //发送文字，图片，视频
    ws.sendMessage({
      chatId: useCurrentChatStore().currentChat.chatId,
      sender: useMeStore().userInfo.userId,
      receiver: useCurrentChatStore().currentChat.toId,
      type: 2,
      text: text.value.length > 0?text.value:null,
      images: imageDigest.value.length > 0?imageDigest.value:null,
      video: videoDigest.value.length > 0?videoDigest.value:null,
      replyStatus: isReply.value?1:0,
      replyMessageId: isReply.value ? replyMessageId.value : null,
      authorization: localStorage.getItem("Authorization")
    })
  }
};

const record = () =>{
  isRecording.value = !isRecording.value;
}

const getBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const imageList = ref([]);
const videoList = ref([]);
const fileList = ref([]);

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const beforeImageUpload = async (file) =>{
  console.log("上传照片：" + await digest(file));
  //将文件列表清空，因为文件和视频图片不能同时上传。
  fileList.value = [];
}

const getImageListDigest = () => {
  imageList.value.map(async (image) => {
    imageDigest.value.push(await digest(image) + '.' + getFileExtension(image.name));
  });
}

const beforeVideoUpload = async (file) =>{
  videoDigest.value = await digest(file) + '.' + getFileExtension(file.name);
  console.log("上传视频：" + videoDigest.value);
  //将文件列表清空，因为文件和视频图片不能同时上传。
  fileList.value = [];
  fileDigest.value = '';
}

const beforeFileUpload = async (file)=>{
  fileDigest.value = await digest(file) + '.' + getFileExtension(file.name);
  console.log("上传文件：" + fileDigest.value);
  //将图片和视频列表清空，因为文件和视频图片不能同时上传。
  imageList.value = [];
  videoList.value = [];
  videoDigest.value = '';
}

const digest = async (file)=>{
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

const getFileExtension = (name)=> {
  return /\.([^\.]+)$/.exec(name)[1];
}

const messages = ref([
  {sender:'10015',
    type:2,
    text:'你好',
    images:[],
    video: '',
    file: '',
    audio: '',
    replyStatus: 0
  },
  {
    sender:'10016',
    type:2,
    text:'哈哈哈哈哈',
    images:[],
    video: '',
    file: '',
    replyStatus: 0
  },
  {
    sender:'10015',
    type:2,
    text:'你好',
    images:[],
    video: '',
    file: '',
    audio: '',
    replyStatus: 0
  },
  {
    sender:'10016',
    type:2,
    text:'我的天哪',
    video: '',
    images: [],
    file: '',
    audio: '',
    replyStatus: 0
  },
  {
    sender:'10016',
    type:2,
    text:'你还好吗',
    images:[],
    video: '',
    file: '',
    audio: '',
    replyStatus: 0
  },
  {
    sender:'10015',
    type:2,
    text:'我去',
    images:[],
    video: '',
    audio: '',
    replyStatus: 0
  },
  {
    sender:'10015',
    type:2,
    text:'牛逼',
    images:[],
    video: '',
    file: '',
    replyStatus: 0
  }
]);
</script>

<template>
  <div class="area-container">

      <div class="messages-area">
        <div v-for="msg in messages">
          <Message :message="msg"></Message>
        </div>

      </div>

      <div class="input-area">

        <div>
          <div class="message-area-btn file-btn">
            <a-popover trigger="hover">
              <template #content>

                <a-popover title="图片" trigger="click">
                  <template #content>
                    <div>
                      <a-upload
                          v-model:file-list="imageList"
                          action="/api/file/image/upload"
                          :before-upload="beforeImageUpload"
                          list-type="picture-card"
                          @preview="handlePreview"
                          :accept="'image/png,image/jpeg,image/jpg,image/gif'"
                          :max-count="3"
                          onchange=""
                      >
                        <div v-if="imageList.length < 3">
                          <div style="margin-top: 8px">上传</div>
                        </div>
                      </a-upload>
                      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                      </a-modal>
                    </div>
                  </template>
                  <a-button>图片</a-button>
                </a-popover>

                <a-popover title="视频" trigger="click">
                  <template #content>
                    <div>
                      <a-upload
                          v-model:file-list="videoList"
                          list-type="picture-card"
                          action="/api/file/video/upload"
                          :before-upload="beforeVideoUpload"
                          :accept="'video/mp4,video/avi'"
                          :max-count="1"
                      >
                          上传
                      </a-upload>
                    </div>
                  </template>
                  <a-button>视频</a-button>
                </a-popover>

                <a-popover title="文件" trigger="click">
                  <template #content>
                    <div>
                      <a-upload
                          v-model:file-list="fileList"
                          list-type="picture-card"
                          action="/api/file/file/upload"
                          :max-count="1"
                          :before-upload="beforeFileUpload"
                      >
                        上传
                      </a-upload>
                    </div>
                  </template>
                  <a-button>文件</a-button>

                </a-popover>
              </template>
              <a-button class="not-btn">
                <svg class="mes-icon" aria-hidden="true">
                  <use xlink:href="#icon-huixingzhen-copy"></use>
                </svg>
              </a-button>
            </a-popover>

          </div>
        </div>


        <textarea v-model="text" class="message-input" placeholder="请在此输入..."/>

        <div>
          <div class="message-area-btn emoji-btn">
            <a-popover title="表情" trigger="click">
              <template #content>
                <div>

                </div>
              </template>
              <a-button class="not-btn">
                <svg class="mes-icon" aria-hidden="true">
                  <use xlink:href="#icon-biaoqing-copy"></use>
                </svg>
              </a-button>
            </a-popover>

          </div>

          <div class="message-area-btn">

            <a-popover v-model:open="visible" placement="leftBottom" title="录音" trigger="click">
              <template #content>
                <Voice :isRply="isReply" :replyMessageId="replyMessageId"/>
              </template>
              <a-button class="not-btn" v-if="text.length === 0" @click="record">
                <svg class="mes-icon" aria-hidden="true">
                  <use xlink:href="#icon-maikefeng1-copy"></use>
                </svg>
              </a-button>
            </a-popover>

            <a-button class="not-btn" @click="send" v-if="text.length > 0">
              <svg class="mes-icon" aria-hidden="true">
                <use xlink:href="#icon-fasong-mianxing"></use>
              </svg>
            </a-button>

          </div>

        </div>

      </div>

  </div>
</template>


<style>
.area-container {
  width: 70%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding-left: 2px;
  border-radius: 5px;
}

.messages-area {
  width: 100%;
  height: 80%;
  max-width:100%;
  min-width: 100%;
  max-height: 90%;
  margin: 1% auto;
  overflow-y: auto;
  font-family: "Sarasa Fixed SC", serif;
  font-size: 16px;
}

.messages-area::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.not-btn{
  width: 50px;
  height: 40px;
  border: none;
}
.record-btn{
  width: 40px;
  height: 40px;
}
.record-btn:hover{
  background-color: #eeeeee;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  word-wrap: break-word;
}

.other-person {
  background-color: #3498db;
  align-self: flex-start;
  color: #fff;
}

.self {
  background-color: #2ecc71;
  align-self: flex-end;
  color: #fff;
}

.input-area {
  display: flex;
  width: 100%;
  height: 15%;
  border-top: 1px solid #cccccc;
  background-color: #ffffff;
}

.message-input {
  width: 50%;
  height: 90%;
  flex-grow: 1;
  border-radius: 5px;
  resize: none;
  border: none;
  margin: 2px;
  padding: 5px;
  font-size: 16px;
  font-family: "Sarasa Fixed SC", serif;
  outline: none;
}

.message-input::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}

.message-area-btn{
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
}

.message-area-btn:hover{
  background-color: #eeeeee;
}


.send-btn {

}

.emoji-btn{

}

.file-btn{

}

.mes-icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>