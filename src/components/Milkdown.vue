<template>
  <VueEditor :editor="editor" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';

import { NButton } from 'naive-ui';


export default defineComponent({
  name: 'Milkdown',
  components: {
    VueEditor,
    NButton,
  },
  setup: () => {
    const editor = useEditor((root) =>
      Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, '# Milkdown 💖 Vue');
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
<style></style>