import Link from 'next/link';
import Nav from '@/components/Nav';
import { DecisionBadge, ScoreBar, RiskBadge } from '@/components/DecisionBadge';
import { listOpportunities } from '@/lib/db';

export const dynamic = 'force-dynamic';

function fmtMoney(n: number | null) {
  if (n == null) return '—';
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function fmtPct(n: number | null) {
  if (n == null) return '—';
  return `${n.toFixed(0)}%`;
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export default function DashboardPage() {
  const rows = listOpportunities();

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.decision] = (acc[r.decision] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalProfit = rows
    .filter((r) => r.decision === 'BUY' || r.decision === 'TEST')
    .reduce((sum, r) => sum + (r.expected_profit_usd ?? 0), 0);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-edge">
              Dashboard
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
            <p className="mt-1 text-sm text-ink-400">
              Every analysis recorded by the copilot. {rows.length} total.
            </p>
          </div>
          <a
            href="/api/export"
            className="rounded-md border border-ink-700 px-3 py-1.5 text-xs text-ink-200 transition hover:border-edge/50 hover:text-edge"
          >
            Export CSV
          </a>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Stat label="PASS" value={counts.PASS ?? 0} color="text-bad" />
          <Stat label="WATCH" value={counts.WATCH ?? 0} color="text-warn" />
          <Stat label="TEST" value={counts.TEST ?? 0} color="text-cool" />
          <Stat label="BUY" value={counts.BUY ?? 0} color="text-edge" />
          <Stat
            label="Pipeline $"
            value={fmtMoney(totalProfit)}
            color="text-white"
          />
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-ink-700/60 bg-ink-800/30 p-12 text-center">
            <div className="text-ink-400">
              No opportunities yet.{' '}
              <Link href="/" className="text-edge underline-offset-2 hover:underline">
                Start in chat →
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-800/20">
            <div className="grid grid-cols-12 gap-2 border-b border-ink-700/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
              <div className="col-span-4">Title</div>
              <div className="col-span-1">Risk</div>
              <div className="col-span-1 text-right">Cost</div>
              <div className="col-span-1 text-right">Sale</div>
              <div className="col-span-1 text-right">Profit</div>
              <div className="col-span-1 text-right">ROI</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-1 text-right">Decision</div>
            </div>
            {rows.map((row) => (
              <Link
                key={row.id}
                href={`/opportunity/${row.id}`}
                className="grid grid-cols-12 items-center gap-2 border-b border-ink-700/30 px-4 py-3 text-sm transition last:border-b-0 hover:bg-ink-800/50"
              >
                <div className="col-span-4 min-w-0">
                  <div className="truncate font-medium">{row.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[10px] uppercase tracking-wide text-ink-400">
                    <span>{fmtDate(row.created_at)}</span>
                    {row.category && (
                      <>
                        <span>·</span>
                        <span>{row.category}</span>
                      </>
                    )}
                    {row.source_platform && (
                      <>
                        <span>·</span>
                        <span>{row.source_platform}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <RiskBadge risk={row.risk_level} />
                </div>
                <div className="col-span-1 text-right font-mono text-xs text-ink-200">
                  {fmtMoney(row.landed_cost_usd)}
                </div>
                <div className="col-span-1 text-right font-mono text-xs text-ink-200">
                  {fmtMoney(row.resale_price_usd)}
                </div>
                <div className="col-span-1 text-right font-mono text-xs">
                  <span
                    className={
                      row.expected_profit_usd && row.expected_profit_usd > 0
                        ? 'text-edge'
                        : 'text-ink-400'
                    }
                  >
                    {fmtMoney(row.expected_profit_usd)}
                  </span>
                </div>
                <div className="col-span-1 text-right font-mono text-xs text-ink-200">
                  {fmtPct(row.roi_pct)}
                </div>
                <div className="col-span-2">
                  <ScoreBar score={row.opportunity_score} />
                </div>
                <div className="col-span-1 text-right">
                  <DecisionBadge decision={row.decision} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  color
}: {
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-ink-700/60 bg-ink-800/30 px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
        {label}
      </div>
      <div className={`mt-1 font-mono text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
