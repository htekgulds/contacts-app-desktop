# Contacts App

A desktop contacts directory built with [Tauri](https://tauri.app) (Rust) + React. Data is fetched from an API at runtime. The `server/` directory contains a local mock server for development. Configurable API URL via on-boarding setup page or config file.

## Features

- **Personnel browser** — sortable table, live filter, click to view details
- **Departments view** — sidebar with department detail and member list
- **Useful numbers** — categorized cards with live filter
- **Global search** — search people, departments, and numbers from the home page
- **Detail panel** — slide-in panel for personnel info
- **First-time setup** — prompts for API URL on first launch

## Keybindings

| Key | Action |
|-----|--------|
| `F1` | Home / search |
| `F2` | Personnel page |
| `F3` | Departments page |
| `F4` | Useful numbers page |
| `Escape` | Close detail panel / clear search |
| `↑` / `↓` | Navigate search results (home page) |
| `Enter` | Open selected search result |

From personnel table: click column headers to sort, click department links to jump to that department.

## Dependencies

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://rustup.rs/)
- System: `webkit2gtk`, `libappindicator-gtk3`, `fuse2` (for AppImage build)

### Arch Linux

```bash
sudo pacman -S webkit2gtk libappindicator-gtk3 fuse2
```

## Setup & Run

### 1. Install npm dependencies

```bash
npm install
```

### 2. Start the API server

```bash
node server/server.cjs
```

The server runs at `http://localhost:3001/api` by default. It serves mock data from `server/data.json` for development and testing.

A remote API must expose the following endpoints under the configured base URL:

```
GET /data               → { personnel: [...], departments: [...], useful_numbers: [...] }
GET /personnel          → [{ name, dept, phone, room, floor, email }, ...]
GET /departments        → [{ name, phone, head, floor, rooms }, ...]
GET /useful-numbers     → [{ name, number, hours, cat, icon }, ...]
```

### 3. Start the Tauri app (development)

```bash
npm run tauri dev
```

### 4. Configure API URL (first launch)

On first launch a setup page appears asking for the API base URL:

```
http://localhost:3001/api
```

You can also create the config file manually at:

- **Linux**: `~/.config/contacts-app/config.json`
- **macOS**: `~/Library/Application Support/contacts-app/config.json`
- **Windows**: `%APPDATA%/contacts-app/config.json`

```json
{
  "api_base_url": "http://localhost:3001/api"
}
```

## Production Build

```bash
npm run tauri build
```

The bundled app will be placed in `src-tauri/target/release/bundle/`.

## Project Layout

```
├── server/
│   ├── server.cjs          # Express API server
│   └── data.json           # Contacts data
├── src/
│   ├── App.jsx             # Root component with routing & config check
│   ├── hooks/
│   │   └── useContactsData.js  # Custom hook for Tauri invoke
│   ├── components/
│   │   ├── SetupPage.jsx   # First-time config page
│   │   ├── HomePage.jsx    # Global search
│   │   ├── PersonnelPage.jsx
│   │   ├── DepartmentsPage.jsx
│   │   ├── UsefulNumbersPage.jsx
│   │   ├── DetailPanel.jsx # Personnel detail slide-in
│   │   ├── Topbar.jsx
│   │   └── Statusbar.jsx
│   └── App.css
├── src-tauri/
│   └── src/
│       ├── main.rs
│       ├── lib.rs          # Tauri commands (config check, data fetch)
│       └── config.rs       # Config file read/write
└── package.json
```
