export default function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <rect x="0" y="6" width="3" height="5" rx="0.5" opacity="0.95" />
          <rect x="4" y="4" width="3" height="7" rx="0.5" opacity="0.95" />
          <rect x="8" y="2" width="3" height="9" rx="0.5" opacity="0.95" />
          <rect x="12" y="0" width="3" height="11" rx="0.5" opacity="0.95" />
        </svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 4.5 Q7 -0.5 13 4.5" />
          <path d="M3 6.5 Q7 3 11 6.5" />
          <circle cx="7" cy="8.5" r="0.8" fill="currentColor" />
        </svg>
        <span className="battery" />
      </div>
    </div>
  );
}
