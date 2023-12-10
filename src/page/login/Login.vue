<script setup>

import UserIdAndPwd from "@/components/UserIdAndPwd.vue";
</script>

<template>
  <div id="loginGG">
      <div class="login">
        <p>Login</p>
        <UserIdAndPwd/>
      </div>
  </div>
</template>

<style scoped>

#loginGG{
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("src/components/image/backgroud.jpg") center no-repeat;
}

.login{
  position: relative;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  background-color: whitesmoke;
  width: 400px;
  height: 400px;
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