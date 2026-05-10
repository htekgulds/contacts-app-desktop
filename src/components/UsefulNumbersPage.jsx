import { useState, useMemo } from "react";
import { catColors } from "../data/contacts";

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

export default function UsefulNumbersPage({ usefulNumbers }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const ql = query.toLowerCase().trim();
    if (!ql) return usefulNumbers;
    return usefulNumbers.filter(
      (u) =>
        u.name.toLowerCase().includes(ql) ||
        u.number.includes(ql) ||
        u.cat.toLowerCase().includes(ql)
    );
  }, [query]);

  return (
    <div id="useful" className="page active">
      <div className="list-page-layout">
        <div className="list-header">
          <span className="list-title">Useful Numbers</span>
          <span className="list-count">{filtered.length}</span>
          <div className="list-search-wrap">
            <span className="list-search-icon">⌕</span>
            <input
              className="list-search"
              type="text"
              placeholder="filter..."
              autoComplete="off"
              spellCheck="false"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="data-table-wrap">
          <div className="useful-grid">
            {filtered.map((u) => {
              const cc = catColors[u.cat] || catColors.ADMIN;
              return (
                <div key={u.name} className="useful-card">
                  <div
                    className="useful-icon"
                    style={{
                      background: cc.bg,
                      color: cc.color,
                      border: cc.border,
                    }}
                  >
                    {u.icon}
                  </div>
                  <div className="useful-body">
                    <div
                      className="useful-name"
                      dangerouslySetInnerHTML={{
                        __html: hl(u.name, query),
                      }}
                    />
                    <div
                      className="useful-number"
                      dangerouslySetInnerHTML={{
                        __html: hl(u.number, query),
                      }}
                    />
                    <div className="useful-hours">{u.hours}</div>
                  </div>
                  <span
                    className="useful-cat"
                    style={{
                      background: cc.bg,
                      color: cc.color,
                      border: cc.border,
                    }}
                  >
                    {u.cat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
