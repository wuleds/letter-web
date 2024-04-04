<script setup>
import {onMounted, ref} from "vue";
import {getContactList} from "@/js/contact/Contact.js";
import ContactCard from "@/components/main/contact/card/ContactCard.vue";
//String contactId;   //账号
//String contactName; //用户名
//String contactPhoto;   //用户头像
const contactList = ref();
onMounted(async () => {
  contactList.value = await getContactList();
  if(contactList.value){
    console.log("联系人为空")
  }
});

const emits = defineEmits(['close']);
const close = () => {
  emits('close');
}

</script>

<template>

  <div class="contact-list-container">

    <div v-if="contactList !== null || undefined" class="contact-list-contact" v-for="contact in contactList" :key="contact.contactId">
      <ContactCard :contact="contact" @close="close"></ContactCard>
    </div>

    <div v-if="contactList === null || undefined" style="margin-top: 10%">
      <span>No Contact</span>
    </div>
  </div>

</template>

<style scoped>
.contact-list-container{
  height: 85%;
  width: 100%;
  overflow: auto;
  padding-top: 1%;
}
.contact-list-contact{
  width: 99%;
  height: 20%;
}


.contact-list-container::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}

</style>