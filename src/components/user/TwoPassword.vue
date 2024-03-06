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
      <a-input-password  v-model:value="formState.secondPassword" />
    </a-form-item>

    <a-button type="primary" html-type="reset" style="width: 200px">清空</a-button>

    <a-button type="primary" html-type="submit" @click="submit" style="width: 200px;margin-top: 15px" >修改密码</a-button>

  </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import { reset } from "@/js/request/forget.js"
const props = defineProps(['url'])
const url = props.url;
const formState = reactive({
  password: '',
  secondPassword:'',
  longUrl:url
});

function submit(){
  reset(formState);
}

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>