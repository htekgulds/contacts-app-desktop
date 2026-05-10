import { useState, useMemo, useEffect } from "react";
import { personnel, departments } from "../data/contacts";

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

export default function DepartmentsPage({ initialDept, onOpenPerson }) {
  const [query, setQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState(initialDept || null);

  const ql = query.toLowerCase().trim();
  const filtered = useMemo(
    () => departments.filter((d) => !ql || d.name.toLowerCase().includes(ql)),
    [ql]
  );

  useEffect(() => {
    if (initialDept) setSelectedDept(initialDept);
  }, [initialDept]);

  const dept = selectedDept
    ? departments.find((d) => d.name === selectedDept)
    : null;
  const members = dept
    ? personnel.filter((p) => p.dept === dept.name)
    : [];

  return (
    <div id="departments" className="page active">
      <div className="dept-layout" style={{ flex: 1 }}>
        <div
          style={{
            width: 220,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid var(--border)",
          }}
        >
          <div className="list-header" style={{ borderRight: "none" }}>
            <span className="list-title">Depts</span>
            <div className="list-search-wrap" style={{ marginLeft: 8 }}>
              <span className="list-search-icon">⌕</span>
              <input
                className="list-search"
                type="text"
                placeholder="filter..."
                style={{ width: 110 }}
                autoComplete="off"
                spellCheck="false"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="dept-sidebar">
            {filtered.map((d) => {
              const count = personnel.filter(
                (p) => p.dept === d.name
              ).length;
              return (
                <div
                  key={d.name}
                  className={`dept-list-item${selectedDept === d.name ? " active" : ""}`}
                  onClick={() => setSelectedDept(d.name)}
                >
                  <div className="dept-dot" />
                  <div>
                    <div
                      className="dept-list-name"
                      dangerouslySetInnerHTML={{
                        __html: hl(d.name, query),
                      }}
                    />
                    <div className="dept-list-count">{count} people</div>
                    <div className="dept-list-phone">{d.phone}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dept-detail" id="dept-detail">
          {!dept ? (
            <div className="empty-state">← select a department</div>
          ) : (
            <>
              <div className="dept-detail-header">
                <div className="dept-detail-name">{escHtml(dept.name)}</div>
                <div className="dept-detail-meta">
                  <div className="dept-meta-item">
                    <span>phone</span>
                    {dept.phone}
                  </div>
                  <div className="dept-meta-item">
                    <span>floor</span>
                    {dept.floor}
                  </div>
                  <div className="dept-meta-item">
                    <span>rooms</span>
                    {dept.rooms}
                  </div>
                  <div className="dept-meta-item">
                    <span>head</span>
                    {dept.head}
                  </div>
                </div>
              </div>
              <div className="dept-members">
                <div
                  style={{
                    padding: "7px 18px",
                    background: "var(--bg3)",
                    borderBottom: "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: "200px 120px 100px 1fr",
                    gap: 8,
                    fontSize: 9,
                    color: "var(--text3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>NAME</span>
                  <span>PHONE</span>
                  <span>ROOM</span>
                  <span>EMAIL</span>
                </div>
                {members.map((m) => (
                  <div
                    key={m.name}
                    className="member-row"
                    onClick={() => onOpenPerson(m)}
                  >
                    <span className="member-name">{m.name}</span>
                    <span className="member-phone">{m.phone}</span>
                    <span className="member-room">{m.room}</span>
                    <span className="member-email">{m.email}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
