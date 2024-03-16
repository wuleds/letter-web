<script setup>
import {ref} from "vue";
const props = defineProps(['contact']);
const contact = ref(props.contact);
</script>

<template>
  <a-card :body-style="{ padding: 0, overflow: 'hidden' }" style="margin-bottom: 1%">

    <div class="contact-card-card">

      <div class="contact-card-photo">
        <a-avatar size="large">
          <template #icon><img src="http://localhost/photo/{{contact.userPhoto}}" alt="头像"></template>
        </a-avatar>
      </div>

      <div class="contact-card-name">
        <p>名字：{{contact.userName}}</p>
        <p>账号：{{contact.fromId}}</p>
      </div>
      <div class="contact-card-user-info">{{contact.userInfo}}</div>
    </div>
  </a-card>
</template>

<style scoped>
.contact-card-photo {
  height: 100%;
  width: 15%;
  padding: 15px;
  margin: 0;
}
.contact-card-card {
  display: flex;
  padding: 2px;
  cursor: pointer;
}


.contact-card-name {
  font-family: "Sarasa Fixed SC", serif;
  font-size: 14px;
  padding: 0;
  margin: 0;
}

.contact-card-user-info {
  width: 90%;
  height: 28%;
  overflow: auto;
}
</style>