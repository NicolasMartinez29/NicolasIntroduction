'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DecisionBadge, ScoreBar, RiskBadge } from './DecisionBadge';
import type { Decision, Risk } from '@/lib/types';

type ChatBubble = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ToolEcho = {
  id: string;
  title: string;
  decision: Decision;
  opportunity_score: number | null;
  risk_level: Risk | null;
  expected_profit_usd: number | null;
  roi_pct: number | null;
};

const STARTERS = [
  'F-150 OEM grille from a junkyard. Asking $180. Looks clean. What do I check?',
  '1688 forged wheels 20x10 5x114.3 ET25, quoted $220/wheel + $90 shipping per wheel to USA. Set of 4. Demand?',
  'Local guy selling a complete tonneau cover for Tacoma, $120. Looks new. Resale at $300?',
  'eBay headlights for 4Runner 5th gen, $140 used. Worth flipping?'
];

function renderAssistant(text: string) {
  // Lightweight inline formatting: bold (**...**) and preserve line breaks.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatBubble[]>([]);
  const [tools, setTools] = useState<ToolEcho[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, tools, busy]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setError(null);
    const userMsg: ChatBubble = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim()
    };
    const assistantId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      userMsg,
      { id: assistantId, role: 'assistant', content: '' }
    ]);
    setInput('');
    setBusy(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversation_id: conversationId
        })
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => 'Request failed');
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          let evt: { type: string; [k: string]: unknown };
          try {
            evt = JSON.parse(trimmed);
          } catch {
            continue;
          }
          if (evt.type === 'meta' && typeof evt.conversation_id === 'string') {
            setConversationId(evt.conversation_id);
          } else if (evt.type === 'text' && typeof evt.delta === 'string') {
            const delta = evt.delta;
            setMessages((m) =>
              m.map((msg) =>
                msg.id === assistantId
                  ? { ...msg, content: msg.content + delta }
                  : msg
              )
            );
          } else if (evt.type === 'opportunity') {
            setTools((t) => [
              ...t,
              {
                id: evt.id as string,
                title: evt.title as string,
                decision: evt.decision as Decision,
                opportunity_score:
                  (evt.opportunity_score as number | null) ?? null,
                risk_level: (evt.risk_level as Risk | null) ?? null,
                expected_profit_usd:
                  (evt.expected_profit_usd as number | null) ?? null,
                roi_pct: (evt.roi_pct as number | null) ?? null
              }
            ]);
          } else if (evt.type === 'error') {
            setError((evt.message as string) ?? 'Unknown error');
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      textareaRef.current?.focus();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col">
      {/* Conversation */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {isEmpty && (
            <div className="animate-fade-in space-y-8 pt-8">
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-edge">
                  Reseller copilot · private
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Drop an opportunity.
                  <br />
                  <span className="text-ink-400">
                    Get a decision, not a pep talk.
                  </span>
                </h1>
                <p className="max-w-xl text-sm text-ink-400">
                  Paste product details, prices, links, specs, supplier notes — anything.
                  MarketEdge AI returns a strict <span className="text-bad">PASS</span> /{' '}
                  <span className="text-warn">WATCH</span> /{' '}
                  <span className="text-cool">TEST</span> /{' '}
                  <span className="text-edge">BUY</span> with the math, the missing info, and the
                  questions you need to send to the supplier.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {STARTERS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="group rounded-xl border border-ink-700/70 bg-ink-800/40 p-4 text-left text-sm transition hover:border-edge/40 hover:bg-ink-800/80"
                  >
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400 group-hover:text-edge">
                      Try
                    </div>
                    <div className="text-ink-200">{s}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 border-t border-ink-700/40 pt-6 text-center">
                {(
                  [
                    { label: 'PASS', desc: 'No-go', cls: 'text-bad' },
                    { label: 'WATCH', desc: 'Needs info', cls: 'text-warn' },
                    { label: 'TEST', desc: 'Small bet', cls: 'text-cool' },
                    { label: 'BUY', desc: 'Stack it', cls: 'text-edge' }
                  ] as const
                ).map((d) => (
                  <div key={d.label}>
                    <div className={`text-[11px] font-bold tracking-[0.18em] ${d.cls}`}>
                      {d.label}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-ink-400">
                      {d.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className="animate-fade-in">
              {m.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-edge/30 bg-edge/5 px-4 py-3 text-sm">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="assistant max-w-[92%] whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-ink-700/70 bg-ink-800/40 px-4 py-3 text-sm leading-relaxed text-ink-200">
                    {m.content ? (
                      renderAssistant(m.content)
                    ) : (
                      <span className="inline-flex items-center gap-2 text-ink-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-edge" />
                        analyzing...
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {tools.length > 0 && (
            <div className="space-y-2 border-t border-ink-700/40 pt-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
                Saved to dashboard this session
              </div>
              {tools.map((t) => (
                <Link
                  key={t.id}
                  href={`/opportunity/${t.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink-700/60 bg-ink-800/30 p-3 transition hover:border-edge/40 hover:bg-ink-800/60"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <DecisionBadge decision={t.decision} />
                      <RiskBadge risk={t.risk_level} />
                    </div>
                    <div className="mt-1 truncate text-sm font-medium">{t.title}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-right">
                    {t.expected_profit_usd != null && (
                      <div className="hidden sm:block">
                        <div className="font-mono text-sm font-semibold text-edge">
                          ${t.expected_profit_usd.toFixed(0)}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-ink-400">
                          profit
                        </div>
                      </div>
                    )}
                    {t.roi_pct != null && (
                      <div className="hidden sm:block">
                        <div className="font-mono text-sm text-ink-200">
                          {t.roi_pct.toFixed(0)}%
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-ink-400">
                          ROI
                        </div>
                      </div>
                    )}
                    <ScoreBar score={t.opportunity_score} />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-bad/40 bg-bad/10 px-3 py-2 text-sm text-bad">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-ink-700/60 bg-ink-950/80 px-4 py-3 backdrop-blur-xl">
        <form
          className="mx-auto flex max-w-3xl items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Paste an opportunity. Price, link, photos described in words, what you know, what you don't…"
            className="max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-sm placeholder:text-ink-400 focus:border-edge/50 focus:outline-none"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-edge to-cool px-4 text-sm font-semibold text-ink-950 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? (
              <>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-950" />
                Analyzing
              </>
            ) : (
              <>
                Analyze
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>
        <div className="mx-auto mt-2 max-w-3xl text-center text-[10px] uppercase tracking-[0.16em] text-ink-400">
          Strict mentor. Never tells you what you want to hear.
        </div>
      </div>
    </div>
  );
}
