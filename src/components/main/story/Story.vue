<script setup>
import {onMounted, reactive, ref} from "vue";
import {getPath} from "@/js/main/message/PathController.js";
import {useMeStore} from "@/js/store/Me.js";
import {createComment, deleteStory, getComment, likeStory} from "@/js/Data/Story.js";

const props = defineProps(["story"]);
const story = ref(props.story);
const comment = reactive({
  storyId:story.value.id,
  senderId: useMeStore().userInfo.userId,
  text: ''
});

const comments = ref([]);
onMounted(async () => {
  comments.value = await getComment(story.value.id);
});

const send = ()=>{
  if(comment.text !== ''){
    createComment(comment);
    window.location.reload();
  }
}

const like = () =>{
  story.value.likeCount += 1;
  likeStory(story.value.id);
}

const open = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = () => {
  open.value = false;
  deleteStory(story.value.id);
  window.location.reload();
};
</script>

<template>
  <a-card hoverable class="story-card">
    <p v-text="story.text"></p>
    <div class="story-media">
      <div v-if="story.image !== null && story.image.length >=10"  class="story-img">
          <a-image :src="getPath(story.image)"></a-image>
      </div>
      <div v-if="story.video !== null && story.video.length >=10">
        <video :src="getPath(story.video)" controls class="story-img"></video>
      </div>
    </div>
    <div class="story-comment-btn">
      <a-input v-model:value="comment.text"></a-input>
      <a-button type="primary" style="margin-left: 3px" @click="send()">评论</a-button>
    </div>
    <div class="story-comment" v-if="comments !== null && comments.length >=1">
        <div v-for="com in comments">
            <p>{{com.senderId}} : {{com.text}}       发表时间：{{com.createDate}}</p>
        </div>
    </div>
    <div style="margin-top: 3px">
      <a-button type="primary" @click="showModal" v-if="story.senderId === useMeStore().userInfo.userId">删除</a-button>
      <a-modal v-model:open="open" @ok="handleOk" cancel-text="取消" ok-text="确定">
        确定删除该动态吗？
      </a-modal>
      <a-button @click="like" style="margin-left: 2px">👍{{story.likeCount}}</a-button>
    </div>
    <p style="margin-top: 10px">{{story.createDate}}
    </p>
  </a-card>
</template>

<style scoped>
.story-card{
  max-width: 80%;
  max-height: 100%;
  min-width: 900px;

  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: "Sarasa Fixed SC", serif;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  color: #333333;
  border: 1px solid #cccccc;
  margin-left: 5px;
  padding: 10px 10px 10px 2px;
}

.story-img{
  max-width: 50%;
  max-height: 50%;
  border-radius: 5px;
  border: 1px solid #cccccc;
}
.story-media{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.story-comment-btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.story-comment{
  max-height: 200px;
  width: 100%;
  font-family: "Sarasa Fixed SC", serif;
  overflow-y: auto;
}
.story-comment::-webkit-scrollbar {
  height: 5px;
  width: 2px;
}

</style>