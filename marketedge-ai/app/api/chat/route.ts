import { NextRequest } from 'next/server';
import type Anthropic from '@anthropic-ai/sdk';
import { getAnthropic, CHAT_MODEL } from '@/lib/anthropic';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { RECORD_OPPORTUNITY_TOOL } from '@/lib/tool-schema';
import {
  addMessage,
  createConversation,
  getConversation,
  insertOpportunity,
  listMessages,
  touchConversation
} from '@/lib/db';
import type { Decision, Risk } from '@/lib/types';

export const runtime = 'nodejs';

type ClientMessage = { role: 'user' | 'assistant'; content: string };

type ToolInput = {
  title?: string;
  decision?: Decision;
  risk_level?: Risk;
  [key: string]: unknown;
};

/**
 * Streaming chat endpoint.
 *
 * Wire format (newline-delimited JSON):
 *   {"type":"meta","conversation_id":"..."}
 *   {"type":"text","delta":"..."}
 *   {"type":"opportunity","id":"...","decision":"BUY"}   // when the tool fires
 *   {"type":"done"}
 *   {"type":"error","message":"..."}
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      message: string;
      conversation_id?: string;
    };

    if (!body.message || typeof body.message !== 'string') {
      return Response.json({ error: 'message is required' }, { status: 400 });
    }

    // Resolve or create the conversation
    let conversationId = body.conversation_id;
    if (conversationId) {
      const existing = getConversation(conversationId);
      if (!existing) conversationId = undefined;
    }
    if (!conversationId) {
      const title = body.message.slice(0, 60);
      const conv = createConversation(title);
      conversationId = conv.id;
    }

    // Persist the user message
    addMessage(conversationId, 'user', body.message);

    // Load history → Anthropic message shape
    const history = listMessages(conversationId);
    const apiMessages: ClientMessage[] = history.map((m) => ({
      role: m.role,
      content: m.content
    }));

    const client = getAnthropic();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const enc = new TextEncoder();
        const send = (obj: unknown) =>
          controller.enqueue(enc.encode(JSON.stringify(obj) + '\n'));

        send({ type: 'meta', conversation_id: conversationId });

        try {
          const messageStream = client.messages.stream({
            model: CHAT_MODEL,
            max_tokens: 4096,
            // Cache the long system prompt (rarely changes — high cache hit rate)
            system: [
              {
                type: 'text',
                text: SYSTEM_PROMPT,
                cache_control: { type: 'ephemeral' }
              }
            ],
            // Cache the tool too — same prefix every request
            tools: [
              {
                ...RECORD_OPPORTUNITY_TOOL,
                cache_control: { type: 'ephemeral' }
              } as Anthropic.Tool
            ],
            messages: apiMessages
          });

          // Stream text deltas to the client
          messageStream.on('text', (delta) => {
            send({ type: 'text', delta });
          });

          // Wait for completion to harvest tool use + persist
          const finalMessage = await messageStream.finalMessage();

          // Extract assistant text (for history)
          const assistantText = finalMessage.content
            .filter((b): b is Anthropic.TextBlock => b.type === 'text')
            .map((b) => b.text)
            .join('\n');

          if (assistantText) {
            addMessage(conversationId!, 'assistant', assistantText);
          }

          // Handle tool calls — save opportunity
          for (const block of finalMessage.content) {
            if (block.type === 'tool_use' && block.name === 'record_opportunity') {
              const input = block.input as ToolInput;
              if (!input.title || !input.decision) continue;
              const saved = insertOpportunity({
                conversation_id: conversationId,
                title: input.title,
                category: (input.category as string) ?? null,
                source_platform: (input.source_platform as string) ?? null,
                source_url: (input.source_url as string) ?? null,
                source_price_usd: (input.source_price_usd as number) ?? null,
                quantity: (input.quantity as number) ?? 1,
                shipping_cost_usd: (input.shipping_cost_usd as number) ?? null,
                repair_cost_usd: (input.repair_cost_usd as number) ?? null,
                other_costs_usd: (input.other_costs_usd as number) ?? null,
                landed_cost_usd: (input.landed_cost_usd as number) ?? null,
                resale_price_usd: (input.resale_price_usd as number) ?? null,
                expected_profit_usd: (input.expected_profit_usd as number) ?? null,
                roi_pct: (input.roi_pct as number) ?? null,
                margin_pct: (input.margin_pct as number) ?? null,
                break_even_usd: (input.break_even_usd as number) ?? null,
                min_acceptable_usd: (input.min_acceptable_usd as number) ?? null,
                vehicle_fitment: (input.vehicle_fitment as string) ?? null,
                specs: (input.specs as string) ?? null,
                risk_level: input.risk_level ?? null,
                decision: input.decision,
                opportunity_score: (input.opportunity_score as number) ?? null,
                supplier_trust: (input.supplier_trust as string) ?? null,
                demand_evidence: (input.demand_evidence as string) ?? null,
                risk_notes: (input.risk_notes as string) ?? null,
                missing_info: (input.missing_info as string) ?? null,
                supplier_questions_en: (input.supplier_questions_en as string) ?? null,
                supplier_questions_zh: (input.supplier_questions_zh as string) ?? null,
                mechanic_questions: (input.mechanic_questions as string) ?? null,
                buyer_avatar: (input.buyer_avatar as string) ?? null,
                selling_angle: (input.selling_angle as string) ?? null,
                marketplace_title: (input.marketplace_title as string) ?? null,
                marketplace_description:
                  (input.marketplace_description as string) ?? null,
                marketplace_price_range:
                  (input.marketplace_price_range as string) ?? null,
                negotiation_floor: (input.negotiation_floor as number) ?? null,
                negotiation_message: (input.negotiation_message as string) ?? null,
                next_action: (input.next_action as string) ?? null,
                raw_notes: JSON.stringify(input)
              });
              touchConversation(conversationId!, saved.title);
              send({
                type: 'opportunity',
                id: saved.id,
                title: saved.title,
                decision: saved.decision,
                opportunity_score: saved.opportunity_score,
                risk_level: saved.risk_level,
                expected_profit_usd: saved.expected_profit_usd,
                roi_pct: saved.roi_pct
              });
            }
          }

          send({
            type: 'done',
            usage: {
              input_tokens: finalMessage.usage.input_tokens,
              output_tokens: finalMessage.usage.output_tokens,
              cache_read_input_tokens:
                finalMessage.usage.cache_read_input_tokens ?? 0,
              cache_creation_input_tokens:
                finalMessage.usage.cache_creation_input_tokens ?? 0
            }
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          send({ type: 'error', message });
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no'
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
