use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Person {
    name: String,
    dept: String,
    phone: String,
    room: String,
    floor: String,
    email: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Department {
    name: String,
    phone: String,
    head: String,
    floor: String,
    rooms: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UsefulNumber {
    name: String,
    number: String,
    hours: String,
    cat: String,
    icon: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AppData {
    personnel: Vec<Person>,
    departments: Vec<Department>,
    useful_numbers: Vec<UsefulNumber>,
}

const API_BASE: &str = "http://localhost:3001/api";

async fn fetch_from_server<T: for<'de> Deserialize<'de>>(endpoint: &str) -> Result<T, String> {
    let client = reqwest::Client::new();
    let url = format!("{}/{}", API_BASE, endpoint);
    client
        .get(&url)
        .send()
        .await
        .map_err(|e| e.to_string())?
        .json::<T>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_personnel() -> Result<Vec<Person>, String> {
    fetch_from_server("personnel").await
}

#[tauri::command]
async fn get_departments() -> Result<Vec<Department>, String> {
    fetch_from_server("departments").await
}

#[tauri::command]
async fn get_useful_numbers() -> Result<Vec<UsefulNumber>, String> {
    fetch_from_server("useful-numbers").await
}

#[tauri::command]
async fn get_all_data() -> Result<AppData, String> {
    fetch_from_server("data").await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_personnel,
            get_departments,
            get_useful_numbers,
            get_all_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}