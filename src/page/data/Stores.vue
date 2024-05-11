<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getStory, toMain} from "@/js/Data/Story.js";
import Story from "@/page/data/Story.vue";
import CreateStory from "@/page/data/CreateStory.vue";
const {params} = useRoute();
const stores = ref([])

const id = ref(params.id);
const create_story_state = ref(false);

onMounted(async () => {
  stores.value = await getStory(id.value);
});

const showCreateStory = () => {
  create_story_state.value = !create_story_state.value;
}
</script>

<template>
  <div class="story-container">
    <div class="createStory" v-if="create_story_state">
      <CreateStory @close="showCreateStory"></CreateStory>
    </div>
    <div>
      <a-button type="primary" @click="toMain()">返回</a-button>
      <a-button type="primary" @click="showCreateStory()">发布</a-button>
    </div>

    <div v-for="story in stores">
        <Story :story="story" />
    </div>
  </div>

</template>

<style scoped>
.story-container {
  width: 95%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding-left: 2px;
  border-radius: 5px;
  overflow-y: auto;
  font-family: "Sarasa Fixed SC", serif;
}
.story-container::-webkit-scrollbar {
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
</style>