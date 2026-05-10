import { useState, useMemo } from "react";
import { personnel } from "../data/contacts";

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

export default function PersonnelPage({ onOpenPerson, onNavigate }) {
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState(1);

  const filtered = useMemo(() => {
    const ql = query.toLowerCase().trim();
    let data = personnel;
    if (ql) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.dept.toLowerCase().includes(ql) ||
          p.phone.includes(ql) ||
          p.email.toLowerCase().includes(ql) ||
          p.room.toLowerCase().includes(ql)
      );
    }
    return [...data].sort((a, b) => {
      const av = a[sortField] || "";
      const bv = b[sortField] || "";
      return av.localeCompare(bv) * sortDir;
    });
  }, [query, sortField, sortDir]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir((d) => d * -1);
    } else {
      setSortField(field);
      setSortDir(1);
    }
  }

  return (
    <div id="personnel" className="page active">
      <div className="list-page-layout">
        <div className="list-header">
          <span className="list-title">Personnel</span>
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
          <table>
            <thead>
              <tr>
                {[
                  { field: "name", label: "NAME" },
                  { field: "dept", label: "DEPARTMENT" },
                  { field: "phone", label: "PHONE" },
                  { field: "room", label: "ROOM" },
                  { field: "floor", label: "FLOOR" },
                  { field: "email", label: "EMAIL" },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className={sortField === field ? "sorted" : ""}
                    onClick={() => handleSort(field)}
                  >
                    {label}
                    {sortField === field ? (sortDir === 1 ? " ↑" : " ↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.name}
                  className="person-row"
                  onClick={() => onOpenPerson(p)}
                >
                  <td
                    className="td-name"
                    dangerouslySetInnerHTML={{ __html: hl(p.name, query) }}
                  />
                  <td className="td-dept">
                    <span
                      className="td-dept-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("departments", p.dept);
                      }}
                      dangerouslySetInnerHTML={{ __html: hl(p.dept, query) }}
                    />
                  </td>
                  <td
                    className="td-phone"
                    dangerouslySetInnerHTML={{ __html: hl(p.phone, query) }}
                  />
                  <td
                    className="td-room"
                    dangerouslySetInnerHTML={{ __html: hl(p.room, query) }}
                  />
                  <td>
                    <span className="td-floor">{p.floor}</span>
                  </td>
                  <td
                    className="td-email"
                    dangerouslySetInnerHTML={{ __html: hl(p.email, query) }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
