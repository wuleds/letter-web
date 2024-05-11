<script setup>
import GroupRequest from "@/components/main/group/GroupRequest.vue";
import MyGroup from "@/components/main/group/MyGroup.vue";
import {createStory, toMain} from "@/js/Data/Story.js";
import {reactive} from "vue";
import {useMeStore} from "@/js/store/Me.js";

const emits = defineEmits(['close']);
const close = () => {
  emits('close');
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
const getImageListDigest = async (file) => {
  storyForm.image = await digest(file) + '.' + getFileExtension(file.name);
}
const getVideoDigest = async (file) => {
  storyForm.video = await digest(file) + '.' + getFileExtension(file.name);
}

const storyForm = reactive({
  senderId: useMeStore().userInfo.userId,
  text: '',
  image: '',
  video: ''
})

const send = () => {
  createStory(storyForm);
  close();
}

const labelCol = {
  style: {
    width: '150px',
  },
};
const wrapperCol = {
  span: 14,
};
</script>

<template>
  <div class="create-story-container">

    <div class="title"><p>发布动态</p></div>
    <div class="main">
      <div class="content">
        <div class="create-story-form">
          <a-form
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              layout="horizontal"
              style="max-width: 600px"
          >
              <a-form-item label="内容">
                <a-textarea :rows="4" v-model:value="storyForm.text"/>
              </a-form-item>

              <a-form-item label="图片">
                <a-upload action="/api/file/image/upload" max-count="1" list-type="picture-card" :before-upload="getImageListDigest">
                  <div>
                    <div style="margin-top: 8px">上传</div>
                  </div>
                </a-upload>
              </a-form-item>

              <a-form-item label="视频">
                <a-upload action="/api/file/video/upload" max-count="1" list-type="picture-card" :before-upload="getVideoDigest">
                  <div>
                    <div style="margin-top: 8px">上传</div>
                  </div>
                </a-upload>
              </a-form-item>

              <a-button type="primary" @click="send()" style="height: 40px;width: 200px">发布</a-button>
            </a-form>
        </div>

        <div class="create-story-btn-div">
          <span @click="close" class="create-story-btn" style="">关闭</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.create-story-container{
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: "Sarasa Fixed SC", serif;
}

.main{
  height: 90%;
  width: 100%;
}


.title{
  font-size: 20px;
}

.content{
  height: 100%;
  width: 100%;
}

.create-story-btn{
  color: rgb(22,138,205);
  cursor: pointer;
  margin-left: 100px;
}
.create-story-btn:hover{
  background-color: rgb(227,241,250);
}

.create-story-btn-div{
  position: absolute;
  bottom: 1%;
  margin-left: 45%;
}
.create-story-form{

  align-items: center; /* 垂直居中 */
}
</style>