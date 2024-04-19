<script setup>
import MyGroup from "@/components/main/group/MyGroup.vue";
import GroupRequest from "@/components/main/group/GroupRequest.vue";
import {reactive, ref} from "vue";
import AddContact from "@/components/main/contact/AddContact.vue";
import CreateGroup from "@/components/main/group/CreateGroup.vue";

const data = reactive(["群组","搜索"]);
const value = ref(data[0]);

const emits = defineEmits(['close']);
const close = () => {
  emits('close');
}

const createGroup_status = ref(false);
const showCreateGroup = ()=>{
  createGroup_status.value = !createGroup_status.value;
}
</script>

<template>
  <div class="group-container">

    <div class="create-group" v-show="createGroup_status">
      <CreateGroup @close="showCreateGroup"></CreateGroup>
    </div>

    <div class="title"><p>群组</p></div>
    <div class="main">
      <div class="content">
        <a-segmented style="width: 50%;margin-left: 25%" v-model:value="value" block :options="data" />

        <MyGroup v-if="value === data[0]" @close="close"></MyGroup>
        <GroupRequest v-if="value === data[1]"></GroupRequest>
        <div class="group-btn-div">
          <span @click="showCreateGroup" class="group-btn" style="">创建群组</span>
          <span @click="close" class="group-btn" style="">关闭</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.group-container{
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

.main{
  height: 90%;
  width: 100%;
}


.title{
  font-size: 20px;
}

.content{
  height: 100%;
  width: 100%;
}

.group-btn{
  color: rgb(22,138,205);
  cursor: pointer;
  margin-left: 100px;
}
.group-btn:hover{
  background-color: rgb(227,241,250);
}

.group-btn-div{
  position: absolute;
  bottom: 1%;
}

.create-group{
  height: 100%;
  width: 100%;
  z-index: 2;
  position: absolute;
}

</style>