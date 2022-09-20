<template>
  <div class="cb-sidebar">
    <!-- <NButton @click="fs.test">测试</NButton> -->
    <n-input-group>
      <NInput
        placeholder="请输入本地目录路径"
        v-model:value="path"
        @keydown="open"
      ></NInput>
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
        @update:selected-keys="selectFile"
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

const emits = defineEmits(['select']);

const path = ref('');
const rootPath = ref('');
const content = ref('');
let selectedNode: any = reactive({});
let data: TreeOption[] = reactive([
  {
    key: 'test1',
    label: '111',
    isDir: true,
    isTxt: false,
    isMd: false,
  },
  {
    key: 'test2',
    label: '222',
    isDir: false,
    isTxt: true,
    isMd: false,
  },
]);

const open = (e: any) => {
  if (e.key == 'Enter') openPath();
};
const openPath = async () => {
  rootPath.value = path.value;
  content.value = (await fs.readPath(rootPath.value)) as string;
  data.length = 0;
  data.push(...fs.fsTree(content.value));
  console.log('data', data);
};
const selectFile = (keys: Array<string | number>) => {
  if (keys.length > 0) {
    selectedNode = getNode(data, keys[0] as string);
    console.log(keys, selectedNode);
    emits('select', selectedNode, rootPath.value);
  }
};
const getNode = (tree: any[], key: string): any => {
  for (let node of tree) {
    if (node.key == key) return node;
    if (node.children) {
      let t = {};
      t = getNode(node.children, key);
      if (t.hasOwnProperty('key')) return t;
    }
  }
  return {};
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