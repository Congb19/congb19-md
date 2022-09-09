<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import SideBar from './components/SideBar.vue';
import Milkdown from './components/Milkdown.vue';
</script>

<template>
  <div class="container">
    <SideBar></SideBar>
    <Milkdown></Milkdown>
  </div>
</template>

<style scoped>
.container {
  margin: 0;
  height: 100vh;
  width: 100vw;
  /* padding-top: 10vh; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center; */
}
</style>