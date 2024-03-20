<script setup>
import UserNameAndPwd from "@/components/user/UserNameAndPwd.vue";
</script>

<template>
  <div id="signinGG">
    <div id="signin">
      <p>Register</p>
      <UserNameAndPwd/>
      <div style="margin-top: 10px">
        <router-link to="/user/login">登录账户</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

#signinGG{
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("../../../components/image/backgroud.jpg") center no-repeat;
}

#signin{
  position: relative;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -200px;
  background-color: whitesmoke;
  width: 400px;
  height: 550px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 5px;
  box-sizing: border-box;
}

p{
  font-size: 42px;
  font-weight: 600;
  font-family: "JetBrains Mono", monospace;
}
</style>