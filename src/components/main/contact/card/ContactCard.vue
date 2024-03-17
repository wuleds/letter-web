<script setup>
import {reactive, ref} from "vue";
const props = defineProps(['contact']);
const contact = ref(props.contact);
const show =ref(true);

const del = () => {
  //展示对话框，确定删除联系人?
  show.value = false;
  console.log("删除联系人");
}
</script>

<template>
  <a-card :body-style="{ padding: 0, overflow: 'hidden' }" style="margin-bottom: 1%;border-radius: 5px">

    <div class="contact-list-card">

      <div class="contact-list-card-photo">
        <a-avatar size="large">
          <template #icon><img src="http://localhost/photo/{{contact.contactPhoto}}" alt="头像"></template>
        </a-avatar>
      </div>

      <div class="contact-list-card-user-data">
        <div class="contact-list-card-user-name">名字：{{ contact.contactName }}</div>
        <div class="contact-list-card-user-name">账号：{{contact.contactId}}</div>
      </div>

      <div class="contact-list-card-user-btn" v-if="show">
<!--        删除联系人-->
        <div class="contact-list-card-user-btn-1" @click="del">

          <div class="contact-list-menu-icon">
            <svg class="contact-list-icon" aria-hidden="true">
              <use xlink:href="#icon-lajitong-copy"></use>
            </svg>
          </div>

        </div>
<!--        启动对话-->
        <div class="contact-list-card-user-btn-2" @click="">

          <div class="contact-list-menu-icon">
            <svg class="contact-list-icon" aria-hidden="true">
              <use xlink:href="#icon-fayan"></use>
            </svg>
          </div>

        </div>
      </div>

      <div class="contact-list-card-user-btn" v-if="!show">
        联系人已删除
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.contact-list-card {
  display: flex;
  cursor: pointer;
  height: 7em;
  width: 100%;
}

.contact-list-card-photo {
  height: 100%;
  width: 10%;
  padding: 15px;
  margin: 0;
}

.contact-list-card-user-data {
  padding-right: 30%;
  flex-grow: 1;
  height: 100%;
  width: 15%;
  padding-top: 15px;
  font-family: "Sarasa Fixed SC", serif;
  font-size: 16px;
}

.contact-list-card-user-name {
  font-weight: bold;
}


.contact-list-menu-icon{
  width: 50px;
  height: 50px;
  font-size: 25px;
  padding-top: 2px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.contact-list-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}


.contact-list-card-user-btn{
  height: 100%;
  width: 30%;
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

.contact-list-card-user-btn-2{
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.contact-list-card-user-btn-2:hover{
  background-color: #f0f0f0;
}

.contact-list-card-user-btn-1{
  border-radius: 5px;
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-list-card-user-btn-1:hover{
  background-color: #f0f0f0;
}
</style>