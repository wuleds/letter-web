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
        label="账号"
        name="userId"
        :rules="[{ required: true,trigger:'blur', message: '请检查账号(6<=长度<=10)' ,min:5,max:10}]"
    >
      <a-input v-model:value="formState.userId" />
    </a-form-item>

    <a-form-item
        label="联系方式"
        name="contact"
        :rules="[{ required: true,trigger:'blur', message: '请检查联系方式'}]"
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

    <a-button type="primary" html-type="submit" @click="submit" style="width: 200px;margin-top: 15px" >获取链接</a-button>

  </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import {forget} from "@/js/request/forget.js";

const formState = reactive({
  userId: '',
  contact: '',
  method: 'email'
});

function submit(){
  forget(formState);
}
const handleMenuClick = e => {
  formState.method = e.key
};

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>