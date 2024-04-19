<script setup>
import {onMounted, ref} from "vue";
import {getGroupList} from "@/js/main/group/Group.js";
import GroupCard from "@/components/main/group/card/GroupCard.vue";

/**
 *  groupId;
 *  groupName
 *  groupInfo
 *  creatorId
 *  managerIdList
 *  groupPhoto
 *  createDate
 *  userCount
 *  */
const groupList = ref();
onMounted(async () => {
  groupList.value = await getGroupList();
});
</script>

<template>

  <div class="group-list-container">

    <div v-if="groupList !== null || undefined" class="group-list-contact" v-for="group in groupList" :key="group.groupId">
      <GroupCard :group="group"></GroupCard>
    </div>

    <div v-if="groupList === null || undefined" style="margin-top: 10%">
      <span>No Group</span>
    </div>
  </div>

</template>

<style scoped>
.group-list-container{
  height: 85%;
  width: 100%;
  overflow: auto;
  padding-top: 1%;
}
.group-list-contact{
  width: 99%;
  height: 20%;
}


.group-list-container::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}

</style>