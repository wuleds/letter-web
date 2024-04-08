<template>
  <div class="area-container">

      <div class="messages-area">

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


        <textarea v-model="input_text" class="message-input" placeholder="请在此输入..."/>

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



          <div class="message-area-btn" @click="record" >
            <a-popover v-model:open="visible" placement="leftBottom" title="录音" trigger="click">
              <template #content>
                <a-button class="not-btn" @click="deleteRecording">
                  <svg class="mes-icon" aria-hidden="true">
                    <use xlink:href="#icon-lajitong-copy-red"></use>
                  </svg>
                </a-button>
              </template>
              <a-button class="not-btn" v-if="!isRecording && input_text.length === 0" @click="startRecording">
                <svg class="mes-icon" aria-hidden="true">
                  <use xlink:href="#icon-maikefeng1-copy"></use>
                </svg>
              </a-button>
            </a-popover>
            <a-button class="not-btn" @click="sendRecording" v-if="isRecording || input_text.length > 0">
              <svg class="mes-icon" aria-hidden="true">
                <use xlink:href="#icon-fasong-mianxing"></use>
              </svg>
            </a-button>
          </div>

        </div>

      </div>

  </div>
</template>

<script setup>

import {ref} from "vue";
import {openNotification} from "@/js/Notify/Notify.js";
import {sendAudio} from "@/js/main/message/SendFile.js";

let input_text = ref('');

//摘要
const fileDigest = ref('');
const videoDigest = ref('');
const visible = ref(false);

const sendMessage = () => {
  console.log(input_text.value);
};

const record = ()=>{
  isRecording.value = !isRecording.value;
};

let audioBlob = null;
let mediaRecorder = null;
const isRecording =  ref(false);
let stream = null; // 用于存储用户录音流
let chunks = [];

const startRecording = async () => {
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    alert('录音功能不支持在当前浏览器。');
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      audioBlob = new Blob(chunks, { type: 'audio/webm' });
    };
    isRecording.value = true;
    mediaRecorder.start();
    // 监听录音结束事件，自动停止录音
    mediaRecorder.addEventListener('stop', () => {
      mediaRecorder.stop();
      isRecording.value = false;
    });
  } catch (err) {
    console.error(err);
  }
}

const deleteRecording = () => {
  if (isRecording.value && mediaRecorder) {
    //停止录音
    mediaRecorder.stop();
  }
  if (stream) {
    //关闭与麦克风的媒体流连接
    stream.getTracks().forEach(track => track.stop());
  }
  //关闭浮窗
  visible.value = false;
  isRecording.value = false;
  mediaRecorder = null;
  stream = null;
  audioBlob = null;
  chunks = [];
}

const sendRecording = async () => {
  mediaRecorder.stop();
  stream.getTracks().forEach(track => track.stop());

  if (!audioBlob) {
    alert('没有录音文件可以发送。');
    return;
  }
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  sendAudio(formData)
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  deleteRecording();
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

const beforeVideoUpload = async (file) =>{
  videoDigest.value = await digest(file);
  console.log("上传视频：" + videoDigest.value);
  //将文件列表清空，因为文件和视频图片不能同时上传。
  fileList.value = [];
}

const beforeFileUpload = async (file)=>{
  fileDigest.value = await digest(file);
  console.log("上传文件：" + fileDigest.value);
  //将图片和视频列表清空，因为文件和视频图片不能同时上传。
  imageList.value = [];
  videoList.value = [];
}

const digest = async (file)=>{
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
</script>

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