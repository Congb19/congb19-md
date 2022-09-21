<template>
  <div class="cb-editor">
    <n-button type="success" class="cb-editor__btn-save" @click="save"
      >保存</n-button
    >
    <n-scrollbar style="max-height: calc(100vh - 82px)">
      {{ selectedNode }}<br />
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
  editorStateCtx,
} from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { tooltip } from '@milkdown/plugin-tooltip';
import { replaceAll } from '@milkdown/utils';

import { NButton, NScrollbar, useMessage, useDialog } from 'naive-ui';

import * as fs from '@/utils/useFs';

const props = defineProps({
  selectedNode: {
    type: Object as PropType<any>,
  },
});
const originStr = ref('');
const state = reactive({
  modified: computed(() => originStr !== readMarkdown()),
  current: {
    rootPath: '',
    key: '',
  },
});

// const fullpath = computed(() => {
//   state.current.rootPath +
//     (state.current.rootPath.endsWith('/') ? '' : '/') +
//     state.current.key.replaceAll('\\', '/');
// });

watch(props.selectedNode, async (newVal, oldVal) => {
  console.log(newVal.info, oldVal.info);
  if (newVal.info.key !== state.current.key && newVal.info.isMd) {
    if (state.modified) {
      //弹提示是否保存
      handleConfirm(
        async () => {
          // 保存旧文件
          let saveOk = await save();
          if (saveOk) message.success('保存成功');
          fillInEditor(newVal.info);
        },
        () => fillInEditor(newVal.info),
        () => fillInEditor(newVal.info)
      );
    } else {
      // 把文件内容替换到编辑器中
      fillInEditor(newVal.info);
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

// 编辑器方法
const readMarkdown = () => {
  return getInstance()?.action((ctx: any) => {
    const editorView = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    return serializer(editorView.state.doc);
  });
};
const writeMarkdown = (str: string) => {
  return getInstance()?.action(replaceAll(str));
};
const fillInEditor = async (info: any) => {
  let fullpath =
    info.rootPath +
    (info.rootPath.endsWith('/') ? '' : '/') +
    info.key.replaceAll('\\', '/');
  let str = (await fs.readFile(fullpath)) as string;
  writeMarkdown(str);
  originStr.value = str;
  // state.modified = false;
  state.current = { ...info };
};

// 交互
const save = async () => {
  // test();
  let str = readMarkdown();
  // console.log('readMarkdown', str);
  let fullpath =
    state.current.rootPath +
    (state.current.rootPath.endsWith('/') ? '' : '/') +
    state.current.key.replaceAll('\\', '/');
  let res = await fs.writeFile(fullpath, str);
  return res;
};
const message = useMessage();
const dialog = useDialog();
const handleConfirm = (
  okFn: Function,
  cancelFn: Function,
  closeFn: Function
) => {
  dialog.warning({
    title: '警告',
    content: '文件内容已修改，是否需要保存？',
    positiveText: '保存',
    negativeText: '不保存',
    maskClosable: false,
    onPositiveClick: () => {
      okFn();
    },
    onNegativeClick: () => {
      cancelFn();
    },
    onClose: () => {
      closeFn();
    },
  });
};
const test = () => {
  getInstance()?.action((ctx) => {
    const state = ctx.get(editorStateCtx);
    console.log('ctxstate!', state);
  });
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
