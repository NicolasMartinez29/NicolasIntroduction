import { deleteOpportunity, getOpportunity } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const opportunity = getOpportunity(id);
  if (!opportunity) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json({ opportunity });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  deleteOpportunity(id);
  return Response.json({ ok: true });
}
