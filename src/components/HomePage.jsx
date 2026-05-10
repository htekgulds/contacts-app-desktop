import { useState, useRef } from "react";
import { personnel, departments, usefulNumbers } from "../data/contacts";

function escHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hl(text, q) {
  if (!q) return escHtml(text);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return escHtml(text);
  return (
    escHtml(text.slice(0, idx)) +
    '<span class="hl">' +
    escHtml(text.slice(idx, idx + q.length)) +
    "</span>" +
    escHtml(text.slice(idx + q.length))
  );
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function HomePage({ onOpenPerson, onNavigate }) {
  const [query, setQuery] = useState("");
  const [focusIdx, setFocusIdx] = useState(-1);
  const inputRef = useRef(null);

  const ql = query.toLowerCase().trim();

  const results = !ql
    ? []
    : [
        ...personnel
          .filter(
            (p) =>
              p.name.toLowerCase().includes(ql) ||
              p.dept.toLowerCase().includes(ql) ||
              p.phone.includes(ql) ||
              p.email.toLowerCase().includes(ql)
          )
          .map((p) => ({ type: "person", data: p })),
        ...departments
          .filter((d) => d.name.toLowerCase().includes(ql) || d.phone.includes(ql))
          .map((d) => ({ type: "dept", data: d })),
        ...usefulNumbers
          .filter(
            (u) =>
              u.name.toLowerCase().includes(ql) ||
              u.number.includes(ql) ||
              u.cat.toLowerCase().includes(ql)
          )
          .map((u) => ({ type: "useful", data: u })),
      ].slice(0, 12);

  function handleAction(item) {
    if (item.type === "person") {
      onOpenPerson(item.data);
    } else if (item.type === "dept") {
      onNavigate("departments", item.data.name);
    } else {
      onNavigate("useful");
    }
    setQuery("");
    setFocusIdx(-1);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (focusIdx >= 0 && results[focusIdx]) {
        handleAction(results[focusIdx]);
      }
    } else if (e.key === "Escape") {
      setQuery("");
      setFocusIdx(-1);
      inputRef.current?.blur();
    }
  }

  return (
    <div id="home" className="page active">
      <div className="home-bg-grid" />
      <div className="home-center">
        <div className="home-title">organization directory</div>
        <div className="home-logo">
          rolodex<span>_</span>
        </div>
        <div className="search-container">
          <span className="search-prefix">&gt;</span>
          <input
            id="home-search"
            ref={inputRef}
            type="text"
            placeholder="search people, departments, numbers..."
            autoComplete="off"
            spellCheck="false"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFocusIdx(-1);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div
            className={`search-results${query.trim() && results.length > 0 ? " visible" : ""}`}
          >
            {results.length === 0 && query.trim() && (
              <div className="no-results">
                no results for &quot;{escHtml(query)}&quot;
              </div>
            )}
            {results.map((item, i) => (
              <div
                key={i}
                className={`result-item${i === focusIdx ? " focused" : ""}`}
                onClick={() => handleAction(item)}
                onMouseEnter={() => setFocusIdx(i)}
              >
                {item.type === "person" && (
                  <>
                    <div className="result-icon ri-person">
                      {initials(item.data.name)}
                    </div>
                    <div className="result-main">
                      <div
                        className="result-name"
                        dangerouslySetInnerHTML={{
                          __html: hl(item.data.name, query),
                        }}
                      />
                      <div
                        className="result-sub"
                        dangerouslySetInnerHTML={{
                          __html: `${hl(item.data.dept, query)} · ${item.data.phone} · ${item.data.room}`,
                        }}
                      />
                    </div>
                    <span className="result-badge rb-person">PERSON</span>
                  </>
                )}
                {item.type === "dept" && (
                  <>
                    <div className="result-icon ri-dept">D</div>
                    <div className="result-main">
                      <div
                        className="result-name"
                        dangerouslySetInnerHTML={{
                          __html: hl(item.data.name, query),
                        }}
                      />
                      <div className="result-sub">
                        {item.data.phone} · Floor {item.data.floor} · Head:{" "}
                        {item.data.head}
                      </div>
                    </div>
                    <span className="result-badge rb-dept">DEPT</span>
                  </>
                )}
                {item.type === "useful" && (
                  <>
                    <div className="result-icon ri-useful">{item.data.icon}</div>
                    <div className="result-main">
                      <div
                        className="result-name"
                        dangerouslySetInnerHTML={{
                          __html: hl(item.data.name, query),
                        }}
                      />
                      <div
                        className="result-sub"
                        dangerouslySetInnerHTML={{
                          __html: `${hl(item.data.number, query)} · ${item.data.hours}`,
                        }}
                      />
                    </div>
                    <span className="result-badge rb-useful">{item.data.cat}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="home-hints">
          <div className="hint">
            <kbd>↑↓</kbd> navigate
          </div>
          <div className="hint">
            <kbd>↵</kbd> open
          </div>
          <div className="hint">
            <kbd>esc</kbd> clear
          </div>
          <div className="hint">
            <kbd>F2–F4</kbd> browse
          </div>
        </div>
      </div>
      <div className="home-stats">
        <div className="home-stat">
          <div className="hs-val">{personnel.length}</div>
          <div className="hs-label">PERSONNEL</div>
        </div>
        <div className="home-stat">
          <div className="hs-val">{departments.length}</div>
          <div className="hs-label">DEPARTMENTS</div>
        </div>
        <div className="home-stat">
          <div className="hs-val">{usefulNumbers.length}</div>
          <div className="hs-label">USEFUL NUMBERS</div>
        </div>
      </div>
    </div>
  );
}
