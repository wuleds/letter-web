<script setup>
import {searchContact, sendContactRequest} from "@/js/main/contact/Contact.js";
import { ref} from "vue";
import {useMeStore} from "@/js/store/Me.js";
import {searchGroup} from "@/js/main/group/Group.js";
const emit = defineEmits(['close']);
const meStore = useMeStore();

const groupRequest = ref({
  fromUserId: meStore.userInfo.userId, //请求发送者
  groupId: '',   //请求接收者
  info: ''    //请求信息
})

const group = ref({
  userId: '',
  userName: '',
  userPhoto: ''
})

const search = () => {
  const result = searchGroup(groupRequest.value.groupId);
  result.then((value) => {
    const data = JSON.parse(value);
    contact.value.userId = data.contactId;
    contact.value.userName = data.contactName;
    contact.value.userPhoto = data.contactPhoto;
  });
}

const close = () => {emit('close');}
const cardStyle = {
  width: '100%',
  height: '100%',
};
</script>

<template>
  <div class="group-join-container">
    <div class="group-join-title"><p>加入群组</p></div>
    <div class="group-join-main">
      <div class="group-join-content">
        <div class="group-join-search">
          <a-input style="width: 60%;height: 10%" v-model:value="groupRequest.groupId" size="large" placeholder="输入" />
          <span style="margin-left: 2%;font-size: 18px" @click="search()" class="add-btn">搜索</span>
        </div>

        <div v-if="contact.userId !== ''">
          <p>搜索结果</p>

          <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }" style="margin-bottom: 1%">

            <div class="add-card">

              <div class="add-contact-photo">
                <a-avatar size="large">
                  <template #icon><img src="http://localhost/photo/{{contact.userPhoto}}" alt="头像"></template>
                </a-avatar>
              </div>

              <div class="add-contact-name">
                <p>名字：{{contact.userName}}</p>
                <p>账号：{{contact.userId}}</p>
              </div>

            </div>
          </a-card>

          <a-textarea style="width: 80%;height: 50%;resize: none;font-family: 'Sarasa Fixed SC', serif" v-model:value="contactRequest.info" placeholder="输入申请备注" :rows="4" />
          <button class="add-button" @click="sendContactRequest(contactRequest)">申请添加联系人</button>
        </div>

        <div v-if="contact.userId === ''" style="margin-top: 10%">
          <span >No Data</span>
        </div>

        <div class="add-btn-div">
          <span @click="close" class="add-btn" style="">返回</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.group-join-container{
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: "Sarasa Fixed SC", serif;
}

.group-join-main{
  height: 90%;
  width: 100%;
}


.group-join-title{
  font-size: 20px;
  top: 0;
}

.group-join-content{
  height: 100%;
  width: 100%;
}

.add-btn{
  color: rgb(22,138,205);
  cursor: pointer;
}
.add-btn:hover{
  background-color: rgb(227,241,250);
}

.add-contact-name {
  font-family: "Sarasa Fixed SC", serif;
  font-size: 14px;
  padding: 0;
  margin: 0;
}

.add-btn-div{
  position: absolute;
  bottom: 1%;
  margin-left: 60%;
}

.group-join-search{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Sarasa Fixed SC", serif;
  font-size: 16px;
}

.add-contact-photo {
  height: 100%;
  width: 15%;
  padding: 15px;
  margin: 0;
}
.add-card {
  display: flex;
  padding: 2px;
  cursor: pointer;
}

.add-button {
  margin-top: 10%;
  background-color: rgb(64,167,227);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Sarasa Fixed SC", serif;
}
</style>