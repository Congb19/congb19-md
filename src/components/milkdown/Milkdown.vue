<template>
  <div class="cb-editor">
    <n-button type="success" class="cb-editor__btn-save" @click="save"
      >保存</n-button
    >
    <n-scrollbar style="max-height: calc(100vh - 82px)">
      {{ selectedNode }}<br>
      {{ state }}
      <VueEditor :editor="editor" />
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, reactive, ref, watch } from 'vue';
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  editorViewCtx,
  serializerCtx,
} from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { tooltip } from '@milkdown/plugin-tooltip';
import { replaceAll } from '@milkdown/utils';

import { NButton, NScrollbar } from 'naive-ui';

import * as fs from '@/utils/useFs';

const props = defineProps({
  selectedNode: {
    type: Object as PropType<any>,
  },
});
const state = reactive({
  modified: false,
  current: {},
});
watch(props.selectedNode, async (newVal, oldVal) => {
  console.log(newVal.info, oldVal.info);
  if (newVal.info.isMd) {
    if (state.modified) {
      //弹提示是否保存
    } else {
      // 把文件内容替换到编辑器中
      let fullpath =
        newVal.info.rootPath +
        (newVal.info.rootPath.endsWith('/') ? '' : '/') +
        newVal.info.key.replaceAll('\\', '/');
      let str = (await fs.readFile(fullpath)) as string;
      writeMarkdown(str);
      state.modified = false;
      state.current = { ...newVal.info };
    }
  }
});

const { editor, loading, getInstance, getDom } = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, "# 💣Congb19's Markdown Editor");
    })
    .use(nord)
    .use(emoji)
    // .use(commonmark)
    .use(gfm)
    .use(history)
    .use(tooltip)
);
// console.log(editor);

const readMarkdown = () =>
  getInstance()?.action((ctx: any) => {
    const editorView = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    return serializer(editorView.state.doc);
  });
const writeMarkdown = (str: string) => getInstance()?.action(replaceAll(str));

const save = () => {
  let str = readMarkdown();
  console.log(str);
};
</script>
<style>
.cb-editor {
  height: calc(100vh - 82px);
  position: relative;
  /* overflow: auto; */
}
.cb-editor__btn-save {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 999;
}
</style>
