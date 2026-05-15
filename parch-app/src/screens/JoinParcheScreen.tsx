import { useState } from 'react';
import { voteOptions } from '../data/mockData';
import { IconClock, IconLocation, IconShare, IconCheck } from '../components/Icon';
import Avatar, { AvatarStack } from '../components/Avatar';
import type { ScreenName } from '../App';

type Props = { onNavigate: (s: ScreenName) => void };

export default function JoinParcheScreen({ onNavigate }: Props) {
  const [voted, setVoted] = useState<string | null>('v1');
  const [joined, setJoined] = useState(false);

  const totalVotes = voteOptions.reduce((s, v) => s + v.votes, 0) + (voted ? 1 : 0);
  const optionWithVote = (id: string) => voteOptions.find((v) => v.id === id)!.votes + (voted === id ? 1 : 0);

  const winning = [...voteOptions]
    .map((v) => ({ ...v, total: optionWithVote(v.id) }))
    .sort((a, b) => b.total - a.total)[0];

  return (
    <div className="fade-in">
      <div className="screen-header">
        <span className="city">
          <span className="live-dot" /> Decidiendo en vivo
        </span>
        <h1>Parche de hoy</h1>
        <div className="subtitle">Voten qué hacer. El plan ganador se confirma a las 6pm.</div>
      </div>

      {/* Header info */}
      <div className="list">
        <div className="glass" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Anfitrión
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <Avatar initials="CR" tone="coral" size="md" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Camila R.</div>
                  <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>Sioux Falls · Latinos en SF</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Cuándo
              </div>
              <div style={{ marginTop: 8, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <IconClock size={14} /> 7:30 pm
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <AvatarStack
              items={[
                { initials: 'CR', tone: 'coral' },
                { initials: 'JP', tone: 'cyan' },
                { initials: 'VL', tone: 'warm' },
                { initials: 'DS', tone: 'mint' },
                { initials: 'AM', tone: 'violet' }
              ]}
            />
            <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>5 invitados · 2 ya están dentro</div>
          </div>

          <div
            style={{
              marginTop: 12,
              padding: '10px 12px',
              borderRadius: 12,
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px dashed rgba(0, 229, 255, 0.3)',
              fontSize: 12,
              color: 'var(--text-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <IconLocation size={14} color="var(--glow-cyan)" /> Lugar se revela cuando el grupo confirme.
          </div>
        </div>

        {/* Voting */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 4px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>¿Qué hacemos hoy?</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            Ganando: {winning.label}
          </div>
        </div>

        {voteOptions.map((v) => {
          const total = optionWithVote(v.id);
          const pct = totalVotes > 0 ? Math.round((total / totalVotes) * 100) : 0;
          const isWin = winning.id === v.id;
          return (
            <button
              key={v.id}
              className={`vote-option ${isWin ? 'winning' : ''}`}
              style={{ textAlign: 'left' }}
              onClick={() => setVoted(v.id)}
            >
              <div className="row">
                <div className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{v.emoji}</span> {v.label}
                  {voted === v.id && <IconCheck size={14} color="var(--glow-coral)" />}
                </div>
                <div className="pct">{pct}% · {total} votos</div>
              </div>
              <div className="vote-bar">
                <div className="vote-fill" style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}

        {/* Chat preview */}
        <div style={{ marginTop: 6 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '6px 4px' }}>
            En el chat
          </div>
          <div className="chat-preview">
            <div className="chat-bubble">
              <div className="who">Camila R.</div>
              Yo voto burgers, llevo dos días pensando en eso 😭
            </div>
            <div className="chat-bubble">
              <div className="who">Juan P.</div>
              Burgers y después drive nocturno?
            </div>
            <div className="chat-bubble me">
              <div className="who" style={{ color: 'rgba(255,255,255,0.7)' }}>Tú</div>
              Listo, voto por burgers también.
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <button
            className={`btn ${joined ? 'btn-secondary' : 'btn-primary'}`}
            style={{ flex: 1 }}
            onClick={() => setJoined((j) => !j)}
          >
            {joined ? '✓ Estás dentro' : 'Unirme'}
          </button>
          <button className="btn btn-secondary" aria-label="Invitar amigo">
            <IconShare size={16} />
          </button>
        </div>

        {/* After plan banner */}
        <button
          className="glass"
          style={{
            padding: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
            marginTop: 6,
            border: '1px dashed var(--glass-border-strong)'
          }}
          onClick={() => onNavigate('feedback')}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>¿Ya pasó tu parche?</div>
            <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>Cuéntanos cómo te fue.</div>
          </div>
          <div style={{ fontSize: 18 }}>→</div>
        </button>
      </div>
    </div>
  );
}
