import { listOpportunities } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const opportunities = listOpportunities();
  return Response.json({ opportunities });
}
