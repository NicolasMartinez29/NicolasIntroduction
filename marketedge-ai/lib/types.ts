export type Decision = 'PASS' | 'WATCH' | 'TEST' | 'BUY';
export type Risk = 'low' | 'medium' | 'high';

export type Opportunity = {
  id: string;
  conversation_id: string | null;
  created_at: number;
  updated_at: number;

  // Product
  title: string;
  category: string | null;
  source_platform: string | null;
  source_url: string | null;

  // Financials (USD)
  source_price_usd: number | null;
  quantity: number;
  shipping_cost_usd: number | null;
  repair_cost_usd: number | null;
  other_costs_usd: number | null;
  landed_cost_usd: number | null;
  resale_price_usd: number | null;
  expected_profit_usd: number | null;
  roi_pct: number | null;
  margin_pct: number | null;
  break_even_usd: number | null;
  min_acceptable_usd: number | null;

  // Context
  vehicle_fitment: string | null;
  specs: string | null;

  // Analysis
  risk_level: Risk | null;
  decision: Decision;
  opportunity_score: number | null;

  // Signals
  supplier_trust: string | null;
  demand_evidence: string | null;
  risk_notes: string | null;
  missing_info: string | null;

  // Generated (JSON strings)
  supplier_questions_en: string | null;
  supplier_questions_zh: string | null;
  mechanic_questions: string | null;
  buyer_avatar: string | null;
  selling_angle: string | null;
  marketplace_title: string | null;
  marketplace_description: string | null;
  marketplace_price_range: string | null;
  negotiation_floor: number | null;
  negotiation_message: string | null;
  next_action: string | null;
  raw_notes: string | null;
};

export type Conversation = {
  id: string;
  title: string | null;
  created_at: number;
  updated_at: number;
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: number;
};
