<script setup>
const props = defineProps(['status']);
const emits = defineEmits(['close']);
const status = props.status;

const close = () => {
  emits('close');
}
</script>

<template>
    <div class="contact-container">
      <div class="title"><p>联系人</p></div>
      <div class="main">
        <div class="content">
          <input type="text" >
          <button @click="close">搜索</button>
          <button @click="close">返回</button>
        </div>
      </div>
    </div>
</template>

<style scoped>
.contact-container{
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 100;
  border: 1px solid #000000;
  background-color: #cccccc;
  font-family: "Sarasa Fixed SC", serif;
}

.main{
  height: 90%;
  width: 100%;
}


.title{
  font-size: 16px;
  position: absolute;
  top: 0;
}

.content{
  height: 100%;
  width: 100%;
}
</style>