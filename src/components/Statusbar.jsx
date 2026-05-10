export default function Statusbar({ currentPage, info }) {
  return (
    <div id="statusbar">
      <span className="sb-item">
        <span id="sb-mode">{currentPage.toUpperCase()}</span>
      </span>
      <span className="sb-sep">│</span>
      <span className="sb-item">
        <span className="sb-key">F1-F4</span>{" "}
        <span className="sb-val">navigate</span>
      </span>
      <span className="sb-sep">│</span>
      <span className="sb-item">
        <span className="sb-key">↵</span> <span className="sb-val">open</span>
      </span>
      <span className="sb-sep">│</span>
      <span className="sb-item">
        <span className="sb-key">esc</span>{" "}
        <span className="sb-val">close/back</span>
      </span>
      <span className="sb-right" id="sb-info">
        {info}
      </span>
    </div>
  );
}
