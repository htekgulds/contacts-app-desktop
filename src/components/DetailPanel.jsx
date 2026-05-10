function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function DetailPanel({ person, onClose }) {
  if (!person) return null;

  return (
    <>
      <div
        id="overlay"
        className="visible"
        onClick={onClose}
      />
      <div id="detail-panel" className="open">
        <div className="detail-topbar">
          <span style={{ fontSize: 10, color: "var(--text3)", letterSpacing: "0.1em" }}>
            CONTACT DETAIL
          </span>
          <button className="detail-close" onClick={onClose}>
            ✕ close
          </button>
        </div>
        <div className="detail-body">
          <div className="detail-avatar">{initials(person.name)}</div>
          <div className="detail-fullname">{person.name}</div>
          <div className="detail-role">{person.dept}</div>
          <div className="detail-fields">
            <div className="detail-field">
              <span className="df-label">PHONE</span>
              <span className="df-value df-phone">{person.phone}</span>
            </div>
            <div className="detail-field">
              <span className="df-label">ROOM</span>
              <span className="df-value">{person.room}</span>
            </div>
            <div className="detail-field">
              <span className="df-label">FLOOR</span>
              <span className="df-value">{person.floor}</span>
            </div>
            <div className="detail-field">
              <span className="df-label">DEPT</span>
              <span className="df-value df-dept">{person.dept}</span>
            </div>
            <div className="detail-field">
              <span className="df-label">EMAIL</span>
              <span className="df-value df-email">{person.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
