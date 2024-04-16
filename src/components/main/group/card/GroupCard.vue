<script setup>
import { ref} from "vue";
import {createConversation} from "@/js/main/chatList/ChatList.js";
import {getPath} from "@/js/main/message/PathController.js";
import {quitGroup} from "@/js/main/group/Group.js";
const props = defineProps(['group']);
const group = ref(props.group);
const show =ref(true);
const modalText = ref('确定退出群组吗?');
const open = ref(false);
const confirmLoading = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = async () => {
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 1000);
  show.value = !await quitGroup(group.value.groupId);
};

const emits = defineEmits(['close']);
const close = () => {
  emits('close');
}
</script>

<template>
  <a-card :body-style="{ padding: 0, overflow: 'hidden' }" style="margin-bottom: 1%;border-radius: 5px">

    <div class="group-list-card">

      <div class="group-list-card-photo">
        <a-avatar size="large">
          <template #icon><img :src="getPath(group.groupPhoto)" alt="头像"></template>
        </a-avatar>
      </div>

      <div class="group-list-card-user-data">
        <div class="group-list-card-user-name">{{ group.groupName }}</div>
        <div class="group-list-card-user-name">{{group.groupId}}</div>
      </div>

      <div class="group-list-card-user-btn" v-if="show">
        <!--        退出群组-->
        <div class="group-list-card-user-btn-1" @click="showModal">

          <div class="group-list-menu-icon">
            <svg class="group-list-icon" aria-hidden="true">
              <use xlink:href="#icon-lajitong-copy"></use>
            </svg>
          </div>

          <a-modal v-model:open="open" title="确认" :confirm-loading="confirmLoading" @ok="handleOk" ok-text="确定" cancel-text="取消">
            <p>{{ modalText }}</p>
          </a-modal>

        </div>
        <!--        启动对话-->
        <div class="group-list-card-user-btn-2" @click="close();createConversation('group',group.groupId)">

          <div class="group-list-menu-icon">
            <svg class="group-list-icon" aria-hidden="true">
              <use xlink:href="#icon-fayan"></use>
            </svg>
          </div>

        </div>
      </div>

      <div class="group-list-card-user-btn" v-if="!show">
        已退出群组
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.group-list-card {
  display: flex;
  cursor: pointer;
  height: 7em;
  width: 100%;
}

.group-list-card-photo {
  height: 100%;
  width: 10%;
  padding: 15px;
  margin: 0;
}

.group-list-card-user-data {
  padding-right: 30%;
  flex-grow: 1;
  height: 100%;
  width: 15%;
  padding-top: 15px;
  font-family: "Sarasa Fixed SC", serif;
  font-size: 16px;
}

.group-list-card-user-name {
  font-weight: bold;
}


.group-list-menu-icon{
  width: 50px;
  height: 50px;
  font-size: 25px;
  padding-top: 2px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.group-list-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}


.group-list-card-user-btn{
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

.group-list-card-user-btn-2{
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.group-list-card-user-btn-2:hover{
  background-color: #f0f0f0;
}

.group-list-card-user-btn-1{
  border-radius: 5px;
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-list-card-user-btn-1:hover{
  background-color: #f0f0f0;
}
</style>