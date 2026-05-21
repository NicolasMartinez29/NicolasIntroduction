import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import { DecisionBadge, RiskBadge, ScoreBar } from '@/components/DecisionBadge';
import { getOpportunity } from '@/lib/db';

export const dynamic = 'force-dynamic';

function fmtMoney(n: number | null | undefined) {
  if (n == null) return '—';
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function lines(text: string | null) {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((s) => s.replace(/^[-•\s]+/, '').trim())
    .filter(Boolean);
}

export default async function OpportunityPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const op = getOpportunity(id);
  if (!op) notFound();

  const supplierEn = lines(op.supplier_questions_en);
  const supplierZh = lines(op.supplier_questions_zh);
  const mechanic = lines(op.mechanic_questions);
  const missing = lines(op.missing_info);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-2">
          <Link
            href="/dashboard"
            className="text-xs text-ink-400 transition hover:text-edge"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <DecisionBadge decision={op.decision} />
              <RiskBadge risk={op.risk_level} />
              {op.category && (
                <span className="rounded-md border border-ink-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-400">
                  {op.category}
                </span>
              )}
              {op.source_platform && (
                <span className="rounded-md border border-ink-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-400">
                  {op.source_platform}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{op.title}</h1>
            {op.next_action && (
              <p className="mt-2 text-sm text-ink-200">
                <span className="font-bold uppercase tracking-wide text-edge">
                  Next:
                </span>{' '}
                {op.next_action}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <ScoreBar score={op.opportunity_score} />
          </div>
        </div>

        {/* Math */}
        <Section title="Profit math">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Money label="Source" value={op.source_price_usd} />
            <Money label="Shipping" value={op.shipping_cost_usd} />
            <Money label="Repair" value={op.repair_cost_usd} />
            <Money label="Other" value={op.other_costs_usd} />
            <Money label="Landed" value={op.landed_cost_usd} highlight />
            <Money label="Resale" value={op.resale_price_usd} />
            <Money
              label="Profit"
              value={op.expected_profit_usd}
              highlight
              color="text-edge"
            />
            <div className="rounded-xl border border-ink-700/60 bg-ink-800/30 px-3 py-2">
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">
                ROI · Margin
              </div>
              <div className="mt-0.5 font-mono text-sm text-ink-200">
                {op.roi_pct != null ? `${op.roi_pct.toFixed(0)}%` : '—'} ·{' '}
                {op.margin_pct != null ? `${op.margin_pct.toFixed(0)}%` : '—'}
              </div>
            </div>
            <Money label="Break-even" value={op.break_even_usd} />
            <Money label="Min sell" value={op.min_acceptable_usd} />
            <Money label="Neg. floor" value={op.negotiation_floor} />
          </div>
        </Section>

        {/* Risk & demand */}
        {(op.risk_notes ||
          op.demand_evidence ||
          op.supplier_trust ||
          op.vehicle_fitment ||
          op.specs) && (
          <Section title="Signals">
            <div className="space-y-2 text-sm">
              {op.vehicle_fitment && (
                <Detail label="Fitment" value={op.vehicle_fitment} />
              )}
              {op.specs && <Detail label="Specs" value={op.specs} />}
              {op.supplier_trust && (
                <Detail label="Supplier trust" value={op.supplier_trust} />
              )}
              {op.demand_evidence && (
                <Detail label="Demand evidence" value={op.demand_evidence} />
              )}
              {op.risk_notes && (
                <Detail label="Risk notes" value={op.risk_notes} />
              )}
            </div>
          </Section>
        )}

        {missing.length > 0 && (
          <Section title="Missing info">
            <BulletList items={missing} accent="warn" />
          </Section>
        )}

        {supplierEn.length > 0 && (
          <Section title="Ask the supplier (EN)">
            <BulletList items={supplierEn} />
          </Section>
        )}

        {supplierZh.length > 0 && (
          <Section title="问供应商 (中文)">
            <BulletList items={supplierZh} />
          </Section>
        )}

        {mechanic.length > 0 && (
          <Section title="Ask a mechanic">
            <BulletList items={mechanic} />
          </Section>
        )}

        {(op.marketplace_title || op.marketplace_description) && (
          <Section title="Marketplace listing">
            {op.marketplace_title && (
              <Detail label="Title" value={op.marketplace_title} />
            )}
            {op.marketplace_description && (
              <div className="mt-2 whitespace-pre-wrap rounded-lg border border-ink-700/60 bg-ink-800/30 px-3 py-2 text-sm text-ink-200">
                {op.marketplace_description}
              </div>
            )}
            {op.marketplace_price_range && (
              <div className="mt-2">
                <Detail label="Price range" value={op.marketplace_price_range} />
              </div>
            )}
            {op.selling_angle && (
              <div className="mt-2">
                <Detail label="Selling angle" value={op.selling_angle} />
              </div>
            )}
            {op.buyer_avatar && (
              <div className="mt-2">
                <Detail label="Buyer avatar" value={op.buyer_avatar} />
              </div>
            )}
            {op.negotiation_message && (
              <div className="mt-3">
                <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">
                  Reply for "is this still available?"
                </div>
                <div className="mt-1 whitespace-pre-wrap rounded-lg border border-edge/30 bg-edge/5 px-3 py-2 text-sm">
                  {op.negotiation_message}
                </div>
              </div>
            )}
          </Section>
        )}
      </main>
    </div>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
        {title}
      </h2>
      <div className="rounded-2xl border border-ink-700/60 bg-ink-800/20 p-4">
        {children}
      </div>
    </section>
  );
}

function Money({
  label,
  value,
  highlight,
  color
}: {
  label: string;
  value: number | null | undefined;
  highlight?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 ${
        highlight
          ? 'border-ink-600 bg-ink-700/40'
          : 'border-ink-700/60 bg-ink-800/30'
      }`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <div className={`mt-0.5 font-mono text-sm font-semibold ${color ?? 'text-ink-200'}`}>
        {fmtMoney(value)}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <div className="text-sm text-ink-200">{value}</div>
    </div>
  );
}

function BulletList({
  items,
  accent
}: {
  items: string[];
  accent?: 'warn';
}) {
  const dotColor = accent === 'warn' ? 'bg-warn' : 'bg-edge';
  return (
    <ul className="space-y-1.5 text-sm text-ink-200">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className={`mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full ${dotColor}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
