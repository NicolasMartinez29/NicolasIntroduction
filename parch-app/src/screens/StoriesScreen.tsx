import { stories } from '../data/mockData';
import Avatar from '../components/Avatar';

export default function StoriesScreen() {
  return (
    <div className="fade-in">
      <div className="screen-header">
        <span className="city">
          <span className="live-dot" /> 3.2k historias compartidas
        </span>
        <h1>Historias reales</h1>
        <div className="subtitle">
          Personas como tú, contando un momento que cambió su semana.
        </div>
      </div>

      <div
        style={{
          margin: '4px 24px 14px',
          padding: 12,
          borderRadius: 12,
          background: 'rgba(255, 138, 61, 0.08)',
          border: '1px dashed rgba(255, 138, 61, 0.3)',
          fontSize: 11,
          color: 'var(--glow-warm)',
          letterSpacing: '0.04em',
          textAlign: 'center'
        }}
      >
        * Mock data. Estas historias son ficticias y se muestran solo en el prototipo.
      </div>

      <div className="list">
        {stories.map((s, i) => (
          <div key={s.id} className={`story-card fade-up-delay-${(i % 3) + 1}`}>
            <div className="quote-icon">"</div>
            <div className="body">{s.body}</div>
            <div className="author">
              <Avatar initials={s.authorInitials} tone={s.authorTone} size="md" />
              <div className="info">
                <span className="name">{s.anonymous ? 'Anónimo' : s.authorName}</span>
                <span>{s.authorCity}</span>
              </div>
            </div>
            <div className="tag-row">
              {s.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
