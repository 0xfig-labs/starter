// Example: Tauri SQLite CRUD commands for the notes feature
use libsql::params;
use serde::{Deserialize, Serialize};
use tauri::State;

use crate::db::AppDb;

#[derive(Clone, Serialize)]
pub struct Note {
    id: i64,
    title: String,
    body: String,
}

#[derive(Deserialize)]
pub struct CreateNoteInput {
    title: String,
    body: String,
}

#[tauri::command]
pub async fn notes_list(db: State<'_, AppDb>) -> Result<Vec<Note>, String> {
    let mut rows = db
        .connection()
        .query("SELECT id, title, body FROM notes ORDER BY id DESC", ())
        .await
        .map_err(|error| error.to_string())?;

    let mut notes = Vec::new();
    while let Some(row) = rows.next().await.map_err(|error| error.to_string())? {
        notes.push(Note {
            id: row.get(0).map_err(|error| error.to_string())?,
            title: row.get(1).map_err(|error| error.to_string())?,
            body: row.get(2).map_err(|error| error.to_string())?,
        });
    }

    Ok(notes)
}

#[tauri::command]
pub async fn notes_create(db: State<'_, AppDb>, input: CreateNoteInput) -> Result<Note, String> {
    let title = input.title.trim();
    if title.is_empty() {
        return Err("Title is required".to_string());
    }

    let mut rows = db
        .connection()
        .query(
            "INSERT INTO notes (title, body) VALUES (?1, ?2) RETURNING id, title, body",
            params![title, input.body.as_str()],
        )
        .await
        .map_err(|error| error.to_string())?;

    let row = rows
        .next()
        .await
        .map_err(|error| error.to_string())?
        .ok_or_else(|| "Created note was not found".to_string())?;

    Ok(Note {
        id: row.get(0).map_err(|error| error.to_string())?,
        title: row.get(1).map_err(|error| error.to_string())?,
        body: row.get(2).map_err(|error| error.to_string())?,
    })
}
