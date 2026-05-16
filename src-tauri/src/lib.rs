use serde::{Deserialize, Serialize};
use std::collections::HashMap;

mod config;

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

#[tauri::command]
fn check_config() -> bool {
    config::exists()
}

#[tauri::command]
fn save_config(url: String, endpoint: String) -> Result<(), String> {
    config::save(&url, &endpoint)
}

fn apply_field_mappings(value: &mut serde_json::Value, mappings: &config::FieldMapping) {
    let obj = match value.as_object_mut() {
        Some(o) => o,
        None => return,
    };
    for (json_key, field_map) in mappings {
        let entry = match obj.get_mut(json_key) {
            Some(e) => e,
            None => continue,
        };
        let items: Vec<&mut serde_json::Value> = match entry {
            serde_json::Value::Array(arr) => arr.iter_mut().collect(),
            serde_json::Value::Object(_) => vec![entry],
            _ => continue,
        };
        for item in items {
            let map_obj = match item.as_object_mut() {
                Some(o) => o,
                None => continue,
            };
            let reverse: HashMap<&str, &str> = field_map
                .iter()
                .map(|(rust_f, json_f)| (json_f.as_str(), rust_f.as_str()))
                .collect();
            let to_rename: Vec<String> = map_obj
                .keys()
                .filter(|k| reverse.contains_key(k.as_str()))
                .cloned()
                .collect();
            for old_key in to_rename {
                let new_key = reverse[old_key.as_str()].to_string();
                if let Some(val) = map_obj.remove(&old_key) {
                    map_obj.insert(new_key, val);
                }
            }
        }
    }
}

#[tauri::command]
async fn get_all_data() -> Result<AppData, String> {
    let cfg = config::load();
    let client = reqwest::Client::new();
    let url = format!("{}/{}", cfg.api_base_url, cfg.data_endpoint);
    let mut value: serde_json::Value = client
        .get(&url)
        .send()
        .await
        .map_err(|e| e.to_string())?
        .json()
        .await
        .map_err(|e| e.to_string())?;
    apply_field_mappings(&mut value, &cfg.field_mappings);
    serde_json::from_value(value).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            check_config,
            save_config,
            get_all_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}