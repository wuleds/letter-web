<script setup>
import {reactive, ref} from "vue";
import {handleContactRequest} from "@/js/main/contact/Contact.js";
const props = defineProps(['request']);
const request = ref(props.request);

const handleRequest = reactive({
  'requestId': request.value.id,
  'status': 0
})

const show = ref(true);
const handle = (status) => {
  handleRequest.status = status;
  handleContactRequest(handleRequest).then((value) => {
    show.value = !value;
    console.log(show.value)
  });
}
</script>

<template>
  <a-card :body-style="{ padding: 0, overflow: 'hidden' }" style="margin-bottom: 1%;border-radius: 5px">

    <div class="contact-request-card">

      <div class="contact-request-card-photo">
        <a-avatar size="large">
          <template #icon><img src="http://localhost/photo/{{request.userPhoto}}" alt="头像"></template>
        </a-avatar>
      </div>

      <div class="contact-request-card-user-data">
        <div class="contact-request-card-user-name">{{ request.userName }}</div>
        <div >{{request.fromUserId}}</div>
      </div>
      <div class="contact-request-card-user-info">
        <p>{{ request.info }}</p>
      </div>

      <div class="contact-request-card-user-btn" v-if="show">
        <div class="contact-request-card-user-btn-1" @click="handle(1)">同意</div>
        <div class="contact-request-card-user-btn-2" @click="handle(2)">忽略</div>
      </div>

      <div class="contact-request-card-user-btn" v-if="!show">
          已经处理
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.contact-request-card {
  display: flex;
  cursor: pointer;
  height: 7em;
  width: 100%;
}

.contact-request-card-photo {
  height: 100%;
  width: 10%;
  padding: 15px;
  margin: 0;
}

.contact-request-card-user-data {
  flex-grow: 1;
  height: 100%;
  width: 15%;
  padding-top: 15px;
  font-family: "Sarasa Fixed SC", serif;
  font-size: 14px;
}
.contact-request-card-user-name {
  font-weight: bold;
}

.contact-request-card-user-info {
  height: 100%;
  width: 40%;
  margin: 0;
  padding: 0;
  overflow: auto;
}


.contact-request-card-user-info::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}

.contact-request-card-user-btn{
  height: 100%;
  width: 20%;
  display: flex;
  font-size: 16px;
  font-family: "Sarasa Fixed SC", serif;
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 5px;
}

.contact-request-card-user-btn-2{
  color: white;
  background-color: rgb(52,152,219);
  height: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.contact-request-card-user-btn-1{
  color: white;
  border-radius: 5px;
  background-color: rgb(46,204,113);
  height: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>