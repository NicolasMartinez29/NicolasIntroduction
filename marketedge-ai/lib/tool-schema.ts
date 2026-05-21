import type Anthropic from '@anthropic-ai/sdk';

/**
 * Tool definition for structured opportunity extraction.
 * Claude calls this at the end of every meaningful analysis so the dashboard
 * always reflects the latest take. Partial data is OK — fill what's known,
 * leave the rest null.
 */
export const RECORD_OPPORTUNITY_TOOL: Anthropic.Tool = {
  name: 'record_opportunity',
  description:
    'Record or update an opportunity in the user\'s private dashboard. Call this at the end of every analysis where you have enough info to make a meaningful decision (PASS / WATCH / TEST / BUY). Partial info is acceptable — fill what you know, set the rest to null. Always think in USD. Always include shipping and repair in landed_cost_usd.',
  input_schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description:
          'Short product title — e.g., "Forged 20x10 wheels, 5x114.3, ET25" or "F-150 OEM grille assembly".'
      },
      category: {
        type: 'string',
        description:
          'Product category — e.g., wheels, grille, headlights, taillights, body kit, tonneau cover, infotainment, etc.'
      },
      source_platform: {
        type: 'string',
        enum: [
          '1688',
          'alibaba',
          'ebay',
          'facebook_marketplace',
          'junkyard',
          'local_seller',
          'other'
        ]
      },
      source_url: { type: 'string' },
      source_price_usd: {
        type: 'number',
        description: 'Source price in USD (already converted from CNY/EUR/etc if needed).'
      },
      quantity: { type: 'integer' },
      shipping_cost_usd: { type: 'number' },
      repair_cost_usd: {
        type: 'number',
        description: 'Estimated repair, refurb, or customization cost in USD.'
      },
      other_costs_usd: {
        type: 'number',
        description: 'Customs, fees, storage, listing fees, etc.'
      },
      landed_cost_usd: {
        type: 'number',
        description: 'Total landed cost in USD = source + shipping + repair + other.'
      },
      resale_price_usd: {
        type: 'number',
        description: 'Realistic expected resale price (midpoint of comps).'
      },
      expected_profit_usd: { type: 'number' },
      roi_pct: { type: 'number', description: 'profit / landed_cost × 100' },
      margin_pct: { type: 'number', description: 'profit / resale × 100' },
      break_even_usd: { type: 'number' },
      min_acceptable_usd: {
        type: 'number',
        description: '30% floor — landed × 1.30.'
      },
      vehicle_fitment: {
        type: 'string',
        description:
          'Specific vehicles or fitment notes (e.g., "Toyota Tacoma 2016-2023, double cab"). "unknown" if unclear.'
      },
      specs: { type: 'string', description: 'Key specs as plain text.' },
      risk_level: { type: 'string', enum: ['low', 'medium', 'high'] },
      decision: { type: 'string', enum: ['PASS', 'WATCH', 'TEST', 'BUY'] },
      opportunity_score: {
        type: 'integer',
        description: '0-100 confidence score for this opportunity.'
      },
      supplier_trust: {
        type: 'string',
        description: 'Signals or lack thereof — reviews, real photos, video, history, etc.'
      },
      demand_evidence: {
        type: 'string',
        description:
          'What proves demand — sold comps, local group asks, search interest. "none" if unproven.'
      },
      risk_notes: { type: 'string' },
      missing_info: {
        type: 'string',
        description: 'Bullet-style list (one per line) of what is still unknown.'
      },
      supplier_questions_en: {
        type: 'string',
        description: 'Newline-separated list of questions in English to send the supplier.'
      },
      supplier_questions_zh: {
        type: 'string',
        description: 'Same questions in 简体中文 for 1688/Alibaba sellers.'
      },
      mechanic_questions: {
        type: 'string',
        description: 'Newline-separated questions for a trusted mechanic (when relevant).'
      },
      buyer_avatar: { type: 'string' },
      selling_angle: { type: 'string' },
      marketplace_title: { type: 'string' },
      marketplace_description: { type: 'string' },
      marketplace_price_range: { type: 'string' },
      negotiation_floor: { type: 'number' },
      negotiation_message: { type: 'string' },
      next_action: {
        type: 'string',
        description: 'One sentence — the exact next step the user should take.'
      }
    },
    required: ['title', 'decision']
  }
};
