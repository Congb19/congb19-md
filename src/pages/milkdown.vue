<template>
  <div class="container">
    <n-layout has-sider>
      <n-layout-sider>
        <SideBar></SideBar>
      </n-layout-sider>
      <n-layout>
        <n-layout-header>
          <n-breadcrumb>
            <n-breadcrumb-item> GO</n-breadcrumb-item>
            <n-breadcrumb-item> test.md</n-breadcrumb-item>
          </n-breadcrumb>
        </n-layout-header>
        <n-layout-content>
          <Milkdown></Milkdown>
        </n-layout-content>
        <n-layout-footer>
          &nbsp;<n-a href="https://congb19.com" target="_blank">@Congb19</n-a>
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>
<script setup lang="ts">
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NBreadcrumb,
  NBreadcrumbItem,
  NScrollbar,
  NA,
} from 'naive-ui';
import SideBar from '@/components/milkdown/SideBar.vue';
import Milkdown from '@/components/milkdown/Milkdown.vue';
</script>
<style scoped>
.container {
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
.n-layout-header,
.n-layout-footer {
  border: 1px darkcyan solid;
  background: rgba(128, 128, 128, 0.2);
  height: 40px;
  padding: 6px;
}

.n-layout-sider {
  /* background: rgba(128, 128, 128, 0.3); */
  border: 1px darkcyan solid;
  height: 100vh;
  overflow: hidden;
  /* padding: 2px; */
}

.n-layout-content {
  border: 1px darkcyan solid;
  overflow: hidden;
  /* background: rgba(128, 128, 128, 0.4); */
  /* height: calc(100vh-24px); */
}
</style>
