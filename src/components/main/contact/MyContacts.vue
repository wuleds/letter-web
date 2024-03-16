<script setup>
import {getContactList} from "@/js/contact/Contact.js";
import {ref} from "vue";

const contactList =  ref(getContactList().then((value) => {
  console.log("联系人列表")
  console.log(value)
  return value;
}));
</script>

<template>

</template>

<style scoped>

</style>