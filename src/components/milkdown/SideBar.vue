<template>
  <div class="cb-sidebar">
    <!-- <NButton @click="fs.test">测试</NButton> -->
    <n-input-group>
      <NInput placeholder="请输入本地目录路径" v-model:value="path"></NInput>
      <NButton @click="openPath" type="success">打开</NButton>
    </n-input-group>
    <!-- <n-upload directory :default-upload="false" @change="handleChange">
    <n-button>打开目录</n-button>
  </n-upload> -->
    <n-scrollbar style="max-height: calc(100vh - 45px)">
      <p></p>
      <n-tree
        block-line
        :data="data"
        selectable
        :on-update:selected-keys="selectFile"
      />
    </n-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import {
  NButton,
  NInput,
  NInputGroup,
  NUpload,
  NTree,
  TreeOption,
  UploadFileInfo,
  NScrollbar,
} from 'naive-ui';
import * as fs from '@/utils/useFs';
import { reactive, ref, watch } from 'vue';

const path = ref('');
const rootPath = ref('');
const content = ref('');
let data: TreeOption[] = reactive([]);
const openPath = async () => {
  rootPath.value = path.value;
  content.value = (await fs.test(rootPath.value)) as string;
  data.length = 0;
  data.push(...fs.fsTree(content.value));
  console.log('data', data);
};

// const selectedKeys: any[] = [];
const selectFile = (keys: Array<string | number>) => {
  console.log(keys);
  if (keys.length > 0) {
  }
};
// const handleChange = (options: { fileList: UploadFileInfo[] }) => {
//   console.log('open', options);
// };
</script>
<style scoped>
.cb-sidebar {
  margin: 5px;
  height: calc(100vh - 12px);
  /* overflow: auto; */
}
</style>