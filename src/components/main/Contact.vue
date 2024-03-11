<script setup>
const props = defineProps(['status']);
const emits = defineEmits(['close']);
const status = props.status;

const close = () => {
  emits('close');
}

const searchContact = ()=>{

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
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 100;
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
  font-size: 16px;
  position: absolute;
  top: 0;
}

.content{
  height: 100%;
  width: 100%;
}
</style>