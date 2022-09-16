<template>
  <div class="cb-editor">
    <n-button type="success" class="cb-editor__btn-save" @click="save"
      >保存</n-button
    >
    <n-scrollbar style="max-height: calc(100vh - 82px)">
      <VueEditor :editor="editor" />
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
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
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';

import { NButton, NScrollbar } from 'naive-ui';

const { editor } = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, "# 💣Congb19's Markdown Editor");
      console.log(ctx);
    })
    .use(nord)
    .use(emoji)
    .use(commonmark)
    .use(history)
);
console.log(editor);
const getMarkdown = () =>
  editor.action((ctx: any) => {
    const editorView = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    return serializer(editorView.state.doc);
  });
const save = () => {
  let str = getMarkdown();
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
