<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="false"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="名字"
        name="userName"
        :rules="[{ required: false,trigger:'blur', message: '请检查账号(6<=长度<=10)' ,min:2,max:10}]"
    >
      <a-input v-model:value="formState.userName" />
    </a-form-item>

    <a-form-item
        label="联系方式"
        name="contact"
        :rules="[{ required: false,trigger:'blur', message: '请检查联系方式'}]"
    >
      <div>
        <a-input v-model:value="formState.contact" style="width: 180px;float: left"/>
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="email">email</a-menu-item>
            </a-menu>
          </template>
          <a-button>
            {{formState.method}}
          </a-button>
        </a-dropdown>
      </div>
    </a-form-item>

    <a-form-item
        label="验证码"
        name="code"
        :rules="[{ required: false,trigger:'blur', message: '请检查验证码(6<=长度<=10)' ,min:4,max:4}]"
    >
      <div>
        <a-input v-model:value="formState.code" style="float: left;width: 150px" />
        <a-space>
          <a-button type="primary" @click="getCode">获取验证码</a-button>
        </a-space>
      </div>

    </a-form-item>

    <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: false,trigger:'blur',  message: '请检查密码(6<=长度<=128)',min:6, max:128}]"
    >
      <a-input-password  v-model:value="formState.password" />
    </a-form-item>

    <a-form-item
        label="确认密码"
        name="secondPassword"
        :rules="[{ required: false,trigger:'blur',  message: '请检查确认密码(6<=长度<=128)',min:6, max:128}]"
    >
      <a-input-password  v-model:value="formState.password" />
    </a-form-item>

    <a-button type="primary" html-type="reset" @click="reset" style="width: 200px">重置</a-button>
    <a-button type="primary" html-type="submit" @click="submit" style="width: 200px;margin-top: 15px" >注册</a-button>

  </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import {signin} from "@/js/request/Signin.js";
import {getAuthCode} from "@/js/request/Signin.js";

const formState = reactive({
  userName: '',
  password: '',
  secondPassword: '',
  method: 'email',
  contact: '',
  code: ''
});
function getCode(){
  getAuthCode(formState);
}

function submit(){
  signin({
    method: formState.method,
    contact: formState.contact
  });
}
const handleMenuClick = e => {
  formState.method = e.key
};

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