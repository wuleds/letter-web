<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import {getRequestList} from "@/js/contact/Contact.js";
import ContactCard from "@/components/ContactCard.vue";

// String id;           //请求id
//String fromUserId;   //请求发送者
//String toUserId;     //请求接收者
//String userName;     //请求发送者的用户名
//String userPhoto;    //请求发送者的头像
//String info;         //请求信息
const requestList = ref();

onBeforeMount(async () => {
  requestList.value = await getRequestList().then((value) => {
    return value;
  });
  console.log(requestList.value);
});

</script>

<template>
  <div class="contact-request-container">
    <div v-for="request in requestList.value" :key="request.id" >
        <ContactCard class="contact-request-request" :contact="request"></ContactCard>
    </div>
  </div>


</template>

<style scoped>
.contact-request-request{

}
</style>