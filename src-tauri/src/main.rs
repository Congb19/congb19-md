#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{fs, io, env, path::Path};

#[tauri::command]
async fn read_file(path: std::path::PathBuf) -> String {
    // 读取文件内容，以文本字符串形式返回
    std::fs::read_to_string(path).unwrap()
}

#[tauri::command]
async fn read_path(pathstr: String) -> String {    
    // println!("------------>");
    // println!("curdir: {}", env::current_dir().unwrap().display());
    // println!("curexe: {}", env::current_exe().unwrap().display());
    // println!("cd to ../..\n");
    env::set_current_dir(pathstr).unwrap();
    // println!("ls: {}", env::current_dir().unwrap().display());
    fn dd(paths: fs::ReadDir) -> String {
        let mut res = "".to_string();
        for path in paths {
            let f = path.unwrap().path();
            // println!("{} {}", if f.is_file() { "*<f> " } else { "*<d>" }, f.display());
            if f.is_file() { res.push_str("*<f>") } else { res.push_str("*<d>") }
            res.push_str(f.to_str().unwrap()); 
            if f.is_dir() {
                let t = fs::read_dir(f).unwrap();
                res.push_str(dd(t).as_str());
            }
        }
        return res;
    }
    let paths = fs::read_dir("./").unwrap();
    let result = dd(paths);
    // println!("{}", result);
    return result;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_file, read_path])
        // .invoke_handler(tauri::generate_handler![read_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
