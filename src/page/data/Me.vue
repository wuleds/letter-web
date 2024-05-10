<template>
  <div class="me-container">
    <img class="avatar" :src="getPath(photo)"  alt="头像"/>
    {{id}}

  </div>
  <div class="me-container">
  <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      :disabled="componentDisabled"
      style="max-width: 600px"
  >

    <a-form-item label="名字">
      <a-input v-model:value="form.userName"/>
    </a-form-item>

    <a-form-item label="性别">
      <a-select v-model:value = form.userSex>
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="签名">
      <a-textarea :rows="4" v-model:value="form.userTalk"/>
    </a-form-item>

    <a-form-item label="头像">
      <a-upload action="/api/file/image/upload" list-type="picture-card" :before-upload="getImageListDigest">
        <div>
          <div style="margin-top: 8px">上传</div>
        </div>
      </a-upload>
    </a-form-item>
  </a-form>


  </div>
  <div class="me-container">
    <a-button @click="e => (componentDisabled = e.target.checked)">修改</a-button>
    <a-button style="margin-left: 30px" @click="send">提交</a-button>
    <a-button style="margin-left: 30px" @click="returnMain">返回</a-button>
  </div>

</template>
<script setup>
import { ref, reactive } from 'vue';
import {updateInfo} from "@/js/Data/Me.js";
import {getPath} from "@/js/main/message/PathController.js";
import {useMeStore} from "@/js/store/Me.js";
const componentDisabled = ref(true);
const photo = ref(useMeStore().userInfo.userPhoto)
const id = ref(useMeStore().userInfo.userId)
const labelCol = {
  style: {
    width: '150px',
  },
};
const wrapperCol = {
  span: 14,
};

const form = reactive({
  userName: sessionStorage.getItem('userName'),
  userSex:sessionStorage.getItem('userSex') || '',
  userPhoto:sessionStorage.getItem('userPhoto'),
  userTalk: sessionStorage.getItem('userTalk') || ''
})

const send = () => {
  componentDisabled.value = true;
  updateInfo(form);
}

const getImageListDigest = async (file) => {
  form.userPhoto = await digest(file) + '.' + getFileExtension(file.name);
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

const returnMain = ()=>{
  window.location.href = '/main';
}
</script>

<style >
.me-container{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
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