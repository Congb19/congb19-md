<template>
  <div class="cb-editor">
    <n-button type="success" class="cb-editor__btn-save">保存</n-button>
    <n-scrollbar style="max-height: calc(100vh - 82px)">
      <VueEditor :editor="editor" />
    </n-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';

import { NButton, NScrollbar } from 'naive-ui';

export default defineComponent({
  name: 'Milkdown',
  components: {
    VueEditor,
    NButton,
    NScrollbar,
  },
  setup: () => {
    const editor = useEditor((root) =>
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
    return {
      editor,
    };
  },
});
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