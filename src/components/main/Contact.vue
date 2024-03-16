<script setup>
import MyContacts from "@/components/main/contact/MyContacts.vue";
import ContactRequest from "@/components/main/contact/ContactRequest.vue";
import AddContact from "@/components/main/contact/AddContact.vue";
import {reactive, ref} from "vue";
const emits = defineEmits(['close']);

const data = reactive(["联系人","请求"]);
const value = ref(data[0]);

const close = () => {
  emits('close');
}

const addContact_status = ref(false);
const showAddContact = ()=>{
  addContact_status.value = !addContact_status.value;
}
</script>

<template>
    <div class="contact-container">

      <div class="addContact" v-show="addContact_status">
        <AddContact @close="showAddContact"></AddContact>
      </div>

      <div class="title"><p>联系人</p></div>
      <div class="main">
        <div class="content">
<!--          联系人列表，添加请求列表，添加联系人按钮，关闭按钮-->
          <a-segmented style="width: 50%;margin-left: 25%" v-model:value="value" block :options="data" />

          <MyContacts v-if="value === data[0]"></MyContacts>
          <ContactRequest v-if="value === data[1]"></ContactRequest>

          <div class="contact-btn-div">
            <span @click="showAddContact" class="btn">添加联系人</span>
            <span @click="close" class="btn" style="">关闭</span>
          </div>

        </div>
      </div>
    </div>
</template>

<style scoped>
.addContact{
  height: 100%;
  width: 100%;
  z-index: 2;
  position: absolute;
}

.contact-container{
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

.btn{
  color: rgb(22,138,205);
  cursor: pointer;
}
.btn:hover{
  background-color: rgb(227,241,250);
}

.contact-btn-div{
  position: absolute;
  bottom: 1%;
  margin-left: 30%;
}
</style>