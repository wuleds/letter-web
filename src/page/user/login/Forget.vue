<script setup>
import ForgetUrl from "/src/components/ForgetUrl.vue";
</script>

<template>
  <div id="one">
    <div id="two">
      <p>Forget</p>
      <ForgetUrl/>
      <div style="margin-top: 10px">
        <router-link style="margin-right:10px" to="/user/signin">注册账户</router-link>
        <router-link style="margin-left: 10px" to="/user/login">登录账户</router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
#one{
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("../../../components/image/backgroud.jpg") center no-repeat;
}

#two{
  position: relative;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  background-color: whitesmoke;
  width: 400px;
  height: 350px;
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