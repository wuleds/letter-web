<template>
  <div class="area-container">

      <div class="messages-area">
        <div class="message other-person">
          <div class="message">1111111111111111</div>
        </div>
        <div class="message self">
          <div class="message">00000000000000000000000000</div>
        </div>
        <div class="message other-person">
          <div class=""></div>
        </div>
        <div class="message self">
          <div class="message">Hi! How are you?</div>
        </div>
        <div class="message other-person">
          <div class="message">Hello there!</div>
        </div>
        <div class="message self">
          <div class="message">Hi! How are you?</div>
        </div>
        <div class="message other-person">
          <div class="message">Hello there!</div>
        </div>
        <div class="message self">
          <div class="message">Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?Hi! How are you?</div>
        </div>
        <div class="message other-person">
          <div class="">你好，兄弟</div>
        </div>
        <div class="message self">
          <div class="">你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？你好，明天一起吃饭吗？</div>
        </div>
        <div class="message other-person">
          <div class="message">Hello there!</div>
        </div>
        <div class="message self">
          <div class="message">Hi! How are you?</div>
        </div>
        <!-- Add more messages as needed -->
      </div>

      <div class="input-area">

        <div>
          <div class="btn file-btn">
            <svg class="mes-icon" aria-hidden="true">
              <use xlink:href="#icon-huixingzhen-copy"></use>
            </svg>
          </div>
        </div>


        <textarea v-model="input_text" class="message-input" placeholder="请在此输入..."/>

        <div>
          <div class="btn emoji-btn">
            <svg class="mes-icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqing-copy"></use>
            </svg>
          </div>

          <div class="btn send-btn" @click="sendMessage" v-show="input_text.valueOf().length !== 0">
            <svg class="mes-icon" aria-hidden="true">
              <use xlink:href="#icon-fasong-mianxing"></use>
            </svg>
          </div>

          <div class="btn voice-btn" @click="record" v-show="input_text.valueOf().length === 0">
            <svg class="mes-icon" aria-hidden="true">
              <use xlink:href="#icon-maikefeng1-copy"></use>
            </svg>
          </div>

        </div>

      </div>

  </div>
</template>

<script setup>

import {ref} from "vue";
const user = defineProps(['user']);
let input_text = ref('');
const sendMessage = () => {
  console.log(input_text.value);
};

const record = ()=>{

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

.btn{
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
}

.btn:hover{
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