<template>
  <div class="container">
    <n-message-provider>
      <n-dialog-provider>
        <n-layout has-sider>
          <n-layout-sider>
            <SideBar @select="selectFile"></SideBar>
          </n-layout-sider>
          <n-layout>
            <n-layout-header>
              <n-breadcrumb>
                <n-breadcrumb-item v-for="item in filePath">{{
                  item
                }}</n-breadcrumb-item>
                <!-- <n-breadcrumb-item> test.md</n-breadcrumb-item> -->
              </n-breadcrumb>
            </n-layout-header>
            <n-layout-content>
              <Milkdown :selectedNode="selectedNode"></Milkdown>
            </n-layout-content>
            <n-layout-footer>
              &nbsp;<n-a href="https://congb19.com" target="_blank"
                >@Congb19</n-a
              >
            </n-layout-footer>
          </n-layout>
        </n-layout>
      </n-dialog-provider>
    </n-message-provider>
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
  NMessageProvider,
  NDialogProvider
} from 'naive-ui';
import SideBar from '@/components/milkdown/SideBar.vue';
import Milkdown from '@/components/milkdown/Milkdown.vue';
import { computed, reactive } from 'vue';
let selectedNode: any = reactive({
  info: {
    label: '',
    key: '',
    isDir: false,
    isTxt: false,
    isMd: false,
  },
});
const selectFile = (node: any, rootPath: string) => {
  console.log('selectFile', node);
  selectedNode.info = { ...node, rootPath };
};
let paths: string[] = reactive([]);
const filePath = computed(() => {
  if (selectedNode.info.isDir) return paths;
  else {
    paths.length = 0;
    paths.push(...selectedNode.info.key.split('\\'));
    return paths;
  }
});
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
  /* background: rgba(128, 128, 128, 0.2); */
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