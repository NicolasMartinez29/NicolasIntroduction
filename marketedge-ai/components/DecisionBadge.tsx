import type { Decision, Risk } from '@/lib/types';

const decisionStyle: Record<Decision, string> = {
  PASS: 'bg-bad/15 border-bad/40 text-bad',
  WATCH: 'bg-warn/15 border-warn/40 text-warn',
  TEST: 'bg-cool/15 border-cool/40 text-cool',
  BUY: 'bg-edge/15 border-edge/40 text-edge'
};

export function DecisionBadge({ decision }: { decision: Decision }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wider ${decisionStyle[decision]}`}
    >
      {decision}
    </span>
  );
}

const riskStyle: Record<Risk, string> = {
  low: 'bg-edge/10 border-edge/30 text-edge',
  medium: 'bg-warn/10 border-warn/30 text-warn',
  high: 'bg-bad/10 border-bad/40 text-bad'
};

export function RiskBadge({ risk }: { risk: Risk | null }) {
  if (!risk) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${riskStyle[risk]}`}
    >
      {risk} risk
    </span>
  );
}

export function ScoreBar({ score }: { score: number | null }) {
  if (score == null) return <span className="text-ink-400 text-xs">no score</span>;
  const color =
    score >= 80
      ? 'bg-edge'
      : score >= 60
      ? 'bg-cool'
      : score >= 40
      ? 'bg-warn'
      : 'bg-bad';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-700">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, score))}%` }} />
      </div>
      <span className="font-mono text-xs text-ink-400">{score}</span>
    </div>
  );
}
