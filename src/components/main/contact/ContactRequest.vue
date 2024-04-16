<script setup>
import {onMounted, ref} from "vue";
import {getRequestList} from "@/js/main/contact/Contact.js";
import ContactCard from "@/components/main/contact/card/RequestCard.vue";
import RequestCard from "@/components/main/contact/card/RequestCard.vue";

//String id;           //请求id
//String fromUserId;   //请求发送者
//String toUserId;     //请求接收者
//String userName;     //请求发送者的用户名
//String userPhoto;    //请求发送者的头像
//String info;         //请求信息
const requestList = ref();
onMounted(async () => {
  requestList.value = await getRequestList();
  if(requestList.value){
    console.log("联系人请求列表为空")
  }
});

</script>

<template>
  <div class="contact-request-container">

    <div v-if="requestList !== null || undefined" class="contact-request-request" v-for="request in requestList" :key="request.id">
        <RequestCard :request="request"></RequestCard>
    </div>

    <div v-if="requestList === null || undefined" style="margin-top: 10%">
      <span>No Request</span>
    </div>
  </div>

</template>

<style scoped>
.contact-request-container{
  height: 85%;
  width: 100%;
  overflow: auto;
  padding-top: 1%;
}
.contact-request-request{
  width: 99%;
  height: 20%;
}


.contact-request-container::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}
</style>