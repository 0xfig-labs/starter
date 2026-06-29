mod db;
mod notes;

use notes::{notes_create, notes_list};
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let db = tauri::async_runtime::block_on(db::init(app))?;
            app.manage(db);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![notes_list, notes_create])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
