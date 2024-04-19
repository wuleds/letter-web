<script setup>

import {useMeStore} from "@/js/store/Me.js";

const emit = defineEmits(['close']);
const close = () => {emit('close');}

import { ref } from 'vue';
import {createGroup} from "@/js/main/group/Group.js";
const componentDisabled = ref(false);
const labelCol = {
  style: {
    width: '25%',
  },
};
const wrapperCol = {
  span: 14,
};
const imageDigest = ref('');
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const imageList = ref([]);

const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const getImageListDigest = async (file) => {
  imageDigest.value = (await digest(file) + '.' + getFileExtension(file.name));

  console.log("上传了图片：" + imageDigest.value)
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
const groupName = ref('');
const groupInfo = ref('');
const send = ()=>{
  componentDisabled.value = true;
  const group = {
    groupName: groupName.value,
    groupInfo: groupInfo.value,
    groupPhoto: imageDigest.value,
    creatorId: useMeStore().userInfo.userId,
  }
  createGroup(group).then((res)=>{
    componentDisabled.value = false;
  })
}
</script>

<template>

  <div class="group-create-container">
    <div class="title">创建群组</div>
    <div>
      <a-form
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          layout="horizontal"
          :disabled="componentDisabled"
          style="max-width: 600px"
      >
        <a-form-item label="名字：">
          <a-input v-model:value="groupName" />
        </a-form-item>

        <a-form-item label="描述：">
          <a-textarea :rows="4" v-model:value="groupInfo" />
        </a-form-item>

        <a-form-item label="头像">
          <a-upload
              v-model:file-list="imageList"
              action="/api/file/image/upload"
              list-type="picture-card"
              @preview="handlePreview"
              :before-upload="getImageListDigest"
              @remove=" (file)=>{imageDigest.value = ''}"
              :accept="'image/png,image/jpeg,image/jpg,image/gif'"
              :max-count="1"
          >
            <div>
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
        </a-form-item>
          <a-button @click="send">创建</a-button>
      </a-form>
    </div>


    <div class="group-btn-div">
      <span @click="close" class="group-btn" style="">关闭</span>
    </div>


  </div>

</template>

<style scoped>
.group-create-container{
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

.group-btn{
  color: rgb(22,138,205);
  cursor: pointer;
  margin-left: 100px;
}
.group-btn:hover{
  background-color: rgb(227,241,250);
}

.group-btn-div{
  position: absolute;
  bottom: 1%;
  margin-left: 30%;
}


.title{
  font-size: 20px;
}
</style>