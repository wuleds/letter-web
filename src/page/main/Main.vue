<template>
  <div class="container">

    <div class="left">
    <div class="warp">
      <div class="nav">

        <div class="photo">
          <div class="photo-img">
            <img src="https://avatars.githubusercontent.com/u/76564306?s=40&v=4" alt="">
          </div>
          <div class="photo-text">
            <p>早上好！</p>
          </div>
        </div>

        <div class="line"></div>

        <div class="menu">

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianxuangouren"></use>
              </svg>
            </div>
            <div class="text">好友</div>
          </div>

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qunzu"></use>
              </svg>
            </div>
            <div class="text">群组</div>
          </div>

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dingyue"></use>
              </svg>
            </div>
            <div class="text">频道</div>
          </div>

          <div class="menu-item">
            <div class="menu-item-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-plume"></use>
              </svg>
            </div>
            <div class="text">动态</div>
          </div>

          <div class="menu-item logout">
            <div class="menu-item-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuichu"></use>
              </svg>
            </div>
            <div class="text">退出登录</div>
          </div>


        </div>

      </div>
    </div>
    </div>
        <ChatList :chatList="chatList" @selectUser="selectUser" />
        <MessageArea :selectedUser="selectedUser" />

  </div>
</template>

<script setup>
import ChatList from '/src/components/main/ChatList.vue';
import MessageArea from '/src/components/main/MessageArea.vue';
import {openNotification} from "@/js/Notify/Notify.js";
import("/src/js/icon/iconfont.js")

const chatList = [
        {
          id: 1,
          name: '张三',
        },
        {
          id: 2,
          name: '李四',
        },
        {
          id: 3,
          name: '王五',
        },
  {
    id: 4,
    name: '张三',
  },
  {
    id: 5,
    name: '李四',
  },
  {
    id: 6,
    name: '王五',
  },
  {
    id: 7,
    name: '张三',
  },
  {
    id: 8,
    name: '李四',
  },
  {
    id: 9,
    name: '王五',
  }
  ];
let selectedUser =  [
  {
    name: '张三'
  },
  {
    name: '李四'
  },
  {
    name: '王五'

  }
]
const selectUser = (user) =>{
      openNotification('success', '选择了用户' + user.name);
};
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.container {
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
  border-radius: 20px;
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