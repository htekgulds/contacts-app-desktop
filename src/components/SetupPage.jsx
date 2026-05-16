import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function SetupPage({ onConfigured }) {
  const [url, setUrl] = useState("http://localhost:3001/api");
  const [endpoint, setEndpoint] = useState("data");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await invoke("save_config", { url: url.trim(), endpoint: endpoint.trim() });
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
          Enter the API server URL and data endpoint.
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
          <label className="setup-label" htmlFor="data-endpoint">
            Data Endpoint
          </label>
          <input
            id="data-endpoint"
            className="setup-input"
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="data"
            autoComplete="off"
            spellCheck="false"
          />
          {error && <div className="setup-error">{error}</div>}
          <button className="setup-btn" type="submit" disabled={saving || !url.trim() || !endpoint.trim()}>
            {saving ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
