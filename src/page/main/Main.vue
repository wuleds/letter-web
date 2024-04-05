<template>
  <div class="main-container">

    <div class="contact" v-if="contact_status">
      <Contact @close="showContact"></Contact>
    </div>


    <div class="left">
    <div class="warp">
      <div class="nav">

        <div class="photo">
          <div class="photo-img">
            <img src="https://avatars.githubusercontent.com/u/76564306?s=40&v=4" alt="">
          </div>
          <div class="photo-text">
            <p>{{myId}}</p>
          </div>
        </div>

        <div class="line"></div>

        <div class="menu">

          <div class="menu-item" @click="showContact">
            <div class="menu-item-icon">
              <svg class="main-icon" aria-hidden="true">
                <use xlink:href="#icon-tianxuangouren"></use>
              </svg>
            </div>
            <div class="text">联系人</div>
          </div>

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="main-icon" aria-hidden="true">
                <use xlink:href="#icon-qunzu"></use>
              </svg>
            </div>
            <div class="text">群组</div>
          </div>

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="main-icon" aria-hidden="true">
                <use xlink:href="#icon-dingyue"></use>
              </svg>
            </div>
            <div class="text">频道</div>
          </div>

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="main-icon" aria-hidden="true">
                <use xlink:href="#icon-plume"></use>
              </svg>
            </div>
            <div class="text">动态</div>
          </div>

          <div class="menu-item logout" @click="logout">
            <div class="menu-item-icon">
              <svg class="main-icon" aria-hidden="true">
                <use xlink:href="#icon-tuichu"></use>
              </svg>
            </div>
            <div class="text">退出登录</div>
          </div>


        </div>

      </div>
    </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Contact from "/src/components/main/Contact.vue";
import {ref} from "vue";
import logout from "/src/js/main/logout/logout.js";
import {useMeStore} from "@/js/store/Me.js";
import {useChatListStore} from "@/js/store/ChatListData.js";
import("/src/js/icon/iconfont.js")

let contact_status = ref(false);
//初始化对话列表
useChatListStore().initialize();
const showContact = ()=>{
  contact_status.value = !contact_status.value;
}

const myId = ref(useMeStore().userInfo.userName);
</script>

<style scoped>
.contact{
  height: 90%;
  width: 30%;
  left: 35%;
  z-index: 1;
  position: absolute;
}

.main-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.main-container {
  display: flex;
  width: 100%;
  height: 97vh;
  margin: 0;
  padding: 0;
}

.left{
  box-sizing: border-box;
}

.warp{
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
  align-items: center;
  justify-content: center;
}

.nav{
  width:8vh;
  height:100%;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #cccccc;
  overflow: hidden;
  transition: 0.5s;
}

.nav:hover{
  width: 20vh;
}

.photo{
  width: 250px;
  height: 60px;
  display: flex;
}
.photo-img{
  width: 50px;
  height: 50px;
  margin-left: 3px;
  margin-top: 2px;
  border-radius: 50%;
  border: 3px solid lightgreen;
  overflow: hidden;
}

.photo-img img{
  width: 100%;
  height: 100%;
  border-radius: 50px;
  object-fit: cover;
}

.photo-img:hover{
  cursor: pointer;
}

.photo-text{
  height: 60px;
  margin-left: 20px;
}

.photo-text p{
  padding-top: 5px;
}

.line{
  width:7vh;
  height: 2px;
  background: #cccccc;
  transition: 0.5s;
  margin-left: 3px;
}

.nav:hover .line{
  width: 18vh;
}

.menu{
  margin-top: 5px;
  width: 25vh;
}

.menu-item{
  display: flex;
  position: relative;
  transition: 0.5s;
  border-radius: 6px;
}

.menu-item:hover{
  background: #cccccc;
  cursor: pointer;
}

.menu-item-icon{
  width: 50px;
  height: 50px;
  font-size: 25px;
  padding-top: 2px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text{
  width: 15vh;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  left: -30px;
  opacity: 0;
}

.nav:hover .text{
  opacity: 1;
}

.logout{
  margin-top: 50vh;
}

</style>