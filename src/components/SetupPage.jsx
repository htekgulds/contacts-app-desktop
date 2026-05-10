import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function SetupPage({ onConfigured }) {
  const [url, setUrl] = useState("http://localhost:3001/api");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await invoke("save_config", { url: url.trim() });
      onConfigured();
    } catch (err) {
      setError(err.toString());
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="setup-page">
      <div className="setup-card">
        <div className="setup-title">First-time setup</div>
        <p className="setup-desc">
          Enter the API server URL to fetch contacts data.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="setup-label" htmlFor="api-url">
            API Base URL
          </label>
          <input
            id="api-url"
            className="setup-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://localhost:3001/api"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          {error && <div className="setup-error">{error}</div>}
          <button className="setup-btn" type="submit" disabled={saving || !url.trim()}>
            {saving ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
