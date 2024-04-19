<script setup>
import { ref} from "vue";
import {joinGroup, searchGroup} from "@/js/main/group/Group.js";
import {getPath} from "@/js/main/message/PathController.js";
const emit = defineEmits(['close']);

const searchText = ref('');
const groupRequest = ref({
  groupId: '',
  info: ''      //请求信息
})

/**groupId: '',
 groupName: '',
 groupInfo: '',
 groupPhoto: '',
 creatorId: '',
 createDate: '',
 userCount: 0*/
const groups = ref([])

const search =async () => {
  const result = await searchGroup(searchText.value);
  groups.value = result;
  console.log(result);
}

const close = () => {emit('close');}
const cardStyle = {
  width: '100%',
  height: '100%',
};

const chooseGroup = (groupId) => {
  groupRequest.value.groupId = groupId;
}
</script>

<template>
    <div class="group-join-main">
      <div class="group-join-content">
        <div class="group-join-search">
          <a-input style="width: 60%;height: 10%" v-model="searchText" size="large" placeholder="输入群名或id" />
          <span style="margin-left: 2%;font-size: 18px"  @click="search()" class="group-join-btn">搜索</span>
        </div>

        <div v-if="groups.length > 0">
          <p>搜索结果</p>

          <a-card v-for="group in groups" :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }" style="margin-bottom: 1%">

            <div class="group-join-card" :class="{'group-join-back':group.groupId === groupRequest.groupId}" @click="chooseGroup(group.groupId)">

              <div class="group-join-photo">
                <a-avatar size="large">
                  <template #icon><img :src="getPath(group.groupPhoto)" alt="头像"></template>
                </a-avatar>
              </div>

              <div class="add-contact-name">
                <p>{{group.userName}}</p>
                <p>{{group.info}}</p>
              </div>

            </div>
          </a-card>

          <a-textarea style="width: 80%;height: 50%;resize: none;font-family: 'Sarasa Fixed SC', serif" v-model:value="groupRequest.info" placeholder="输入申请备注" :rows="4" />
          <button class="group-join-button" @click="joinGroup(groupRequest)">申请加入群组</button>
        </div>

        <div v-if="groups.length === 0" style="margin-top: 10%">
          <span >No Data</span>
        </div>
      </div>
    </div>
</template>

<style scoped>

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

.group-join-btn{
  margin-top: 10px;
  color: rgb(22,138,205);
  cursor: pointer;
}
.group-join-btn:hover{
  background-color: rgb(227,241,250);
}

.add-contact-name {
  font-family: "Sarasa Fixed SC", serif;
  font-size: 14px;
  padding: 0;
  margin: 0;
}

.group-join-btn-div{
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

.group-join-photo {
  height: 100%;
  width: 15%;
  padding: 15px;
  margin: 0;
}
.group-join-card {
  display: flex;
  padding: 2px;
  cursor: pointer;
}

.group-join-button {
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

.group-join-back{
  color: rgb(64,167,227);
  cursor: pointer;
}
</style>