use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize)]
pub struct AppConfig {
    pub api_base_url: String,
    pub data_endpoint: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        AppConfig {
            api_base_url: "http://localhost:3001/api".into(),
            data_endpoint: "data".into(),
        }
    }
}

fn config_dir() -> PathBuf {
    let base = dirs::config_dir().unwrap_or_else(|| PathBuf::from("."));
    base.join("contacts-app")
}

fn config_path() -> PathBuf {
    config_dir().join("config.json")
}

pub fn exists() -> bool {
    let path = config_path();
    if !path.exists() {
        return false;
    }
    if let Ok(content) = fs::read_to_string(&path) {
        if let Ok(cfg) = serde_json::from_str::<AppConfig>(&content) {
            return !cfg.api_base_url.is_empty() && !cfg.data_endpoint.is_empty();
        }
    }
    false
}

pub fn save(api_base_url: &str, data_endpoint: &str) -> Result<(), String> {
    let cfg = AppConfig {
        api_base_url: api_base_url.to_string(),
        data_endpoint: data_endpoint.to_string(),
    };
    fs::create_dir_all(config_dir()).map_err(|e| e.to_string())?;
    let json = serde_json::to_string_pretty(&cfg).map_err(|e| e.to_string())?;
    fs::write(config_path(), json).map_err(|e| e.to_string())
}

pub fn load() -> AppConfig {
    let path = config_path();
    if let Ok(content) = fs::read_to_string(&path) {
        if let Ok(config) = serde_json::from_str(&content) {
            return config;
        }
    }
    AppConfig::default()
}
