use std::fs;

use libsql::{Builder, Connection};
use tauri::Manager;

pub struct AppDb {
    conn: Connection,
}

impl AppDb {
    pub fn connection(&self) -> &Connection {
        &self.conn
    }
}

pub async fn init(app: &tauri::App) -> anyhow::Result<AppDb> {
    let app_dir = app.path().app_data_dir()?;
    fs::create_dir_all(&app_dir)?;

    let db = Builder::new_local(app_dir.join("app.sqlite").to_string_lossy().to_string())
        .build()
        .await?;
    let conn = db.connect()?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )",
        (),
    )
    .await?;

    Ok(AppDb { conn })
}
