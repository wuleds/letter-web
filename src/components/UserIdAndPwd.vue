<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="true"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="账号"
        name="userId"
        :rules="[{ required: true,trigger:'blur', message: '请检查账号(6<=长度<=10)' ,min:2,max:10}]"
    >
      <a-input v-model:value="formState.userId" />
    </a-form-item>

    <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true,trigger:'blur',  message: '请检查密码(6<=长度<=64)',min:6, max:64}]"
    >
      <a-input-password  v-model:value="formState.password" />
    </a-form-item>

    <a-button type="primary" html-type="reset" @click="reset" style="width: 200px">重置</a-button>

    <a-button type="primary" html-type="submit" @click="submit" style="width: 200px;margin-top: 15px" >登录</a-button>

  </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import Request from "../utils/Request.js";
const formState = reactive({
  userId: '',
  password: '',
  remember: true,
});

function submit(){
  Request({
    url:'/user/login',
    method:'post',
    data:{
      userId: formState.userId,
      password: formState.password
    }
  }).then((data)=>{
    alert(data);
    const jwt = data.data;
    localStorage.setItem('Authorization',jwt);
  })
}

function reset(){
  formState.userId = '';
  formState.password = '';
}
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>