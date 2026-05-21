import { listOpportunities } from '@/lib/db';
import type { Opportunity } from '@/lib/types';

export const runtime = 'nodejs';

const COLUMNS: { key: keyof Opportunity; label: string }[] = [
  { key: 'created_at', label: 'Created' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'source_platform', label: 'Source' },
  { key: 'source_url', label: 'URL' },
  { key: 'source_price_usd', label: 'Source price (USD)' },
  { key: 'quantity', label: 'Qty' },
  { key: 'shipping_cost_usd', label: 'Shipping (USD)' },
  { key: 'repair_cost_usd', label: 'Repair (USD)' },
  { key: 'other_costs_usd', label: 'Other (USD)' },
  { key: 'landed_cost_usd', label: 'Landed (USD)' },
  { key: 'resale_price_usd', label: 'Resale (USD)' },
  { key: 'expected_profit_usd', label: 'Profit (USD)' },
  { key: 'roi_pct', label: 'ROI %' },
  { key: 'margin_pct', label: 'Margin %' },
  { key: 'break_even_usd', label: 'Break-even (USD)' },
  { key: 'min_acceptable_usd', label: 'Min acceptable (USD)' },
  { key: 'vehicle_fitment', label: 'Fitment' },
  { key: 'risk_level', label: 'Risk' },
  { key: 'decision', label: 'Decision' },
  { key: 'opportunity_score', label: 'Score' },
  { key: 'next_action', label: 'Next action' }
];

function escapeCsv(v: unknown): string {
  if (v === null || v === undefined) return '';
  let s: string;
  if (typeof v === 'number') s = String(v);
  else s = String(v);
  if (/[",\n\r]/.test(s)) {
    s = '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export async function GET() {
  const rows = listOpportunities();
  const header = COLUMNS.map((c) => escapeCsv(c.label)).join(',');
  const body = rows
    .map((row) =>
      COLUMNS.map((c) => {
        if (c.key === 'created_at') {
          return escapeCsv(new Date(row.created_at).toISOString());
        }
        return escapeCsv(row[c.key]);
      }).join(',')
    )
    .join('\n');
  const csv = header + '\n' + body + '\n';

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="marketedge-opportunities-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`
    }
  });
}
