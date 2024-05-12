<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getStory, getUserInfo, toMain} from "@/js/Data/Story.js";
import CreateStory from "@/page/data/CreateStory.vue";
import Story from "@/components/main/story/Story.vue";
const {params} = useRoute();
const stores = ref([])

const id = ref(params.id);
const create_story_state = ref(false);
const userInfo = ref('');

onMounted(async () => {
  stores.value = await getStory(id.value);
  if(id.value !== 'me') {
    userInfo.value = await getUserInfo(id.value);
  }
});

const showCreateStory = () => {
  create_story_state.value = !create_story_state.value;
}
</script>

<template>
  <div class="stores-container">
    <div class="createStory" v-if="create_story_state">
      <CreateStory @close="showCreateStory"></CreateStory>
    </div>
    <div class="story-btn">
      <a-button style="height: 40px;width: 150px" type="primary" @click="toMain()">返回</a-button><br>
      <a-button v-if="id==='me'" style="height: 40px;width: 150px;margin-top: 30px" type="primary" @click="showCreateStory()">发布</a-button>
    </div>
    <div  class="story-container">
      <div>
        <p v-if="id === 'me'"  class="title">我的动态</p>
        <div v-if="id !== 'me'" class="title">
          <p>{{userInfo.contactName}}的动态</p>
        </div>

        <div v-for="story in stores"  class="story">
          <Story :story="story" />
        </div>
        <div v-if="stores.length < 1">
            <h1>没有动态</h1>
        </div>
      </div>
    </div>


  </div>

</template>

<style scoped>
.stores-container {
  width: 95%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding-left: 2px;
  border-radius: 5px;
  overflow-y: auto;
  font-family: "Sarasa Fixed SC", serif;
  display: flex;
}

.stores-container::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}


.createStory {
  height: 90%;
  width: 30%;
  left: 35%;
  z-index: 1;
  position: absolute;
}

.story-container{
  margin-top: 20px;
  font-family: "Sarasa Fixed SC", serif;
  display: flex;
  justify-content: center;
}
.story{
  margin-top: 10px;
}

.story-btn{
  margin-top: 10px;
  margin-right: 50px;
  font-family: "Sarasa Fixed SC", serif;
}

.title{
  font-family: "Sarasa Fixed SC", serif;
  font-size: 35px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>