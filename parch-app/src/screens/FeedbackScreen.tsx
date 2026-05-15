import { useState } from 'react';
import { feelings } from '../data/mockData';
import { IconHeart, IconCheck } from '../components/Icon';
import type { ScreenName } from '../App';

type Props = { onNavigate: (s: ScreenName) => void };

export default function FeedbackScreen({ onNavigate }: Props) {
  const [selected, setSelected] = useState<string[]>(['f1', 'f2']);
  const [story, setStory] = useState('Conocí a Camila y a Juan. Llegué bloqueado, me fui hablando hasta tarde.');
  const [permission, setPermission] = useState<'anon' | 'name' | 'no' | null>('anon');
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  if (saved) {
    return (
      <div className="fade-in" style={{ padding: '40px 24px', textAlign: 'center' }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            margin: '20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--glow-mint), var(--glow-cyan))',
            boxShadow: '0 12px 40px rgba(77, 255, 184, 0.4)'
          }}
        >
          <IconHeart size={44} color="#04141A" />
        </div>
        <h1 className="t-display" style={{ fontSize: 26, lineHeight: 1.2 }}>
          Gracias por compartir.
        </h1>
        <div className="t-soft" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.5, padding: '0 12px' }}>
          Tu historia puede ayudar a alguien a salir de un momento oscuro.
        </div>

        <div style={{ marginTop: 32 }}>
          <button className="btn btn-primary btn-block" onClick={() => onNavigate('stories')}>
            Ver otras historias
          </button>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => onNavigate('map')}>
            Volver al mapa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="screen-header">
        <h1>¿Cómo te fue en este parche?</h1>
        <div className="subtitle">Tu respuesta nos ayuda a crear momentos mejores.</div>
      </div>

      <div className="feeling-grid">
        {feelings.map((f) => (
          <button
            key={f.id}
            className={`feeling-tile ${selected.includes(f.id) ? 'selected' : ''}`}
            onClick={() => toggle(f.id)}
          >
            <span className="emoji">{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      <div className="field-group" style={{ marginTop: 18 }}>
        <div className="field">
          <label>Cuéntanos en una frase qué pasó…</label>
          <textarea
            className="field-input"
            rows={3}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            style={{ resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        <div className="field">
          <label>¿Podemos compartir tu historia?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className={`toggle ${permission === 'anon' ? 'active' : ''}`}
              onClick={() => setPermission('anon')}
              style={{ textAlign: 'left' }}
            >
              ✓ Sí, anónimo
            </button>
            <button
              className={`toggle ${permission === 'name' ? 'active' : ''}`}
              onClick={() => setPermission('name')}
              style={{ textAlign: 'left' }}
            >
              ✓ Sí, con mi nombre
            </button>
            <button
              className={`toggle ${permission === 'no' ? 'active' : ''}`}
              onClick={() => setPermission('no')}
              style={{ textAlign: 'left' }}
            >
              ✕ No compartir
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <button className="btn btn-primary btn-block" onClick={() => setSaved(true)}>
          <IconCheck size={18} /> Guardar historia
        </button>
      </div>
    </div>
  );
}
