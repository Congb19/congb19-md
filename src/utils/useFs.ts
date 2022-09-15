import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { invoke } from '@tauri-apps/api';
import { reactive } from 'vue';

// export let tree: any[] = reactive([]);

export const test = async (path: string) => {
  console.log('click');
  const content = await invoke('my_read_path', { pathstr: path, path });
  return content;
};

export const fsTree = (content: string) => {
  let arr = content.split('*');
  let res: any[] = [];
  let files: any[] = [];
  arr.forEach((item) => {
    let isDir = item.indexOf('<d>./') > -1;
    let t = item.slice(5);
    let tarr = t.split('\\');
    let isMd =
      tarr[tarr.length - 1].endsWith('.md') ||
      tarr[tarr.length - 1].endsWith('.MD');
    let isTxt =
      tarr[tarr.length - 1].endsWith('.txt') ||
      tarr[tarr.length - 1].endsWith('.TXT');
    console.log(isDir, tarr);
    if (isDir || isMd || isTxt) {
      files.push({
        key: t,
        path: tarr,
        isDir,
        isTxt,
        isMd,
      });
    }
  });
  const dd = (item: any, tree: any[]) => {
    let p = tree ? tree.find((i) => i.label == item.path[0]) : null;
    if (!p) {
      let node: any = {
        key: item.key,
        label: item.path[0],
      };
      if (item.path.length > 1) {
        node = {
          ...node,
          isDir: true,
          isTxt: false,
          isMd: false,
          children: [],
        };
        item.path.shift();
        dd(item, node.children);
      } else {
        node = {
          ...node,
          isDir: item.isDir,
          isTxt: item.isTxt,
          isMd: item.isMd,
          children: [],
        };
        if (!item.isDir) delete node.children;
      }
      tree.push(node);
    } else {
      if (item.path.length > 1) {
        item.path.shift();
        dd(item, p.children);
      }
    }
  };
  files.forEach((item) => {
    dd(item, res);
  });
  return res;
};
