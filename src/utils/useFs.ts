import { readDir, BaseDirectory } from '@tauri-apps/api/fs';

const processEntries = (entries: any[]) => {
  for (const entry of entries) {
    console.log("Entry: ", entry);
    if (entry.children) {
      processEntries(entry.children);
    }
  }
}

export const test = async () => {
  console.log('click');
  const entries = await readDir('testDir', {
    dir: BaseDirectory.Home,
    recursive: true,
  });
  console.log(`entries: ${entries}`);
  processEntries(entries);
};

export const fsTree = () => {
  let tree = [];
  
}