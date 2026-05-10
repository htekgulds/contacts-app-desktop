import { useState, useEffect } from "react";

const tabs = [
  { page: "home", key: "F1", label: "HOME" },
  { page: "personnel", key: "F2", label: "PERSONNEL" },
  { page: "departments", key: "F3", label: "DEPARTMENTS" },
  { page: "useful", key: "F4", label: "USEFUL NUMBERS" },
];

export default function Topbar({ currentPage, onNavigate }) {
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toTimeString().slice(0, 5));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="topbar">
      <div className="logo">◈ ROLODEX</div>
      <div className="nav-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.page}
            className={`nav-tab${currentPage === tab.page ? " active" : ""}`}
            onClick={() => onNavigate(tab.page)}
          >
            <span className="tab-key">{tab.key}</span> {tab.label}
          </div>
        ))}
      </div>
      <div className="topbar-right">
        <span className="status-dot" />
        <span id="clock">{clock}</span>
      </div>
    </div>
  );
}
