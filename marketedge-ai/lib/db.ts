import Database from 'better-sqlite3';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { ChatMessage, Conversation, Opportunity } from './types';

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'marketedge.db');

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(dbPath);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  init(_db);
  return _db;
}

function init(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      title TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user','assistant')),
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id, created_at);

    CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      conversation_id TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,

      title TEXT NOT NULL,
      category TEXT,
      source_platform TEXT,
      source_url TEXT,

      source_price_usd REAL,
      quantity INTEGER DEFAULT 1,
      shipping_cost_usd REAL,
      repair_cost_usd REAL,
      other_costs_usd REAL,
      landed_cost_usd REAL,
      resale_price_usd REAL,
      expected_profit_usd REAL,
      roi_pct REAL,
      margin_pct REAL,
      break_even_usd REAL,
      min_acceptable_usd REAL,

      vehicle_fitment TEXT,
      specs TEXT,

      risk_level TEXT,
      decision TEXT NOT NULL,
      opportunity_score INTEGER,

      supplier_trust TEXT,
      demand_evidence TEXT,
      risk_notes TEXT,
      missing_info TEXT,

      supplier_questions_en TEXT,
      supplier_questions_zh TEXT,
      mechanic_questions TEXT,
      buyer_avatar TEXT,
      selling_angle TEXT,
      marketplace_title TEXT,
      marketplace_description TEXT,
      marketplace_price_range TEXT,
      negotiation_floor REAL,
      negotiation_message TEXT,
      next_action TEXT,
      raw_notes TEXT,

      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_opps_created ON opportunities(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_opps_decision ON opportunities(decision);
  `);
}

// --- Conversations ---

export function createConversation(title?: string): Conversation {
  const db = getDb();
  const id = randomUUID();
  const now = Date.now();
  db.prepare(
    'INSERT INTO conversations (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)'
  ).run(id, title ?? null, now, now);
  return { id, title: title ?? null, created_at: now, updated_at: now };
}

export function listConversations(): Conversation[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM conversations ORDER BY updated_at DESC LIMIT 50')
    .all() as Conversation[];
}

export function getConversation(id: string): Conversation | null {
  const db = getDb();
  return (db
    .prepare('SELECT * FROM conversations WHERE id = ?')
    .get(id) as Conversation | undefined) ?? null;
}

export function touchConversation(id: string, title?: string) {
  const db = getDb();
  if (title) {
    db.prepare('UPDATE conversations SET updated_at = ?, title = ? WHERE id = ?').run(
      Date.now(),
      title,
      id
    );
  } else {
    db.prepare('UPDATE conversations SET updated_at = ? WHERE id = ?').run(Date.now(), id);
  }
}

// --- Messages ---

export function addMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string
): ChatMessage {
  const db = getDb();
  const id = randomUUID();
  const now = Date.now();
  db.prepare(
    'INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(id, conversationId, role, content, now);
  touchConversation(conversationId);
  return { id, conversation_id: conversationId, role, content, created_at: now };
}

export function listMessages(conversationId: string): ChatMessage[] {
  const db = getDb();
  return db
    .prepare(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC'
    )
    .all(conversationId) as ChatMessage[];
}

// --- Opportunities ---

type NewOpportunityInput = Partial<Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>> & {
  title: string;
  decision: Opportunity['decision'];
};

export function insertOpportunity(input: NewOpportunityInput): Opportunity {
  const db = getDb();
  const id = randomUUID();
  const now = Date.now();
  const row: Opportunity = {
    id,
    created_at: now,
    updated_at: now,
    conversation_id: input.conversation_id ?? null,
    title: input.title,
    category: input.category ?? null,
    source_platform: input.source_platform ?? null,
    source_url: input.source_url ?? null,
    source_price_usd: input.source_price_usd ?? null,
    quantity: input.quantity ?? 1,
    shipping_cost_usd: input.shipping_cost_usd ?? null,
    repair_cost_usd: input.repair_cost_usd ?? null,
    other_costs_usd: input.other_costs_usd ?? null,
    landed_cost_usd: input.landed_cost_usd ?? null,
    resale_price_usd: input.resale_price_usd ?? null,
    expected_profit_usd: input.expected_profit_usd ?? null,
    roi_pct: input.roi_pct ?? null,
    margin_pct: input.margin_pct ?? null,
    break_even_usd: input.break_even_usd ?? null,
    min_acceptable_usd: input.min_acceptable_usd ?? null,
    vehicle_fitment: input.vehicle_fitment ?? null,
    specs: input.specs ?? null,
    risk_level: input.risk_level ?? null,
    decision: input.decision,
    opportunity_score: input.opportunity_score ?? null,
    supplier_trust: input.supplier_trust ?? null,
    demand_evidence: input.demand_evidence ?? null,
    risk_notes: input.risk_notes ?? null,
    missing_info: input.missing_info ?? null,
    supplier_questions_en: input.supplier_questions_en ?? null,
    supplier_questions_zh: input.supplier_questions_zh ?? null,
    mechanic_questions: input.mechanic_questions ?? null,
    buyer_avatar: input.buyer_avatar ?? null,
    selling_angle: input.selling_angle ?? null,
    marketplace_title: input.marketplace_title ?? null,
    marketplace_description: input.marketplace_description ?? null,
    marketplace_price_range: input.marketplace_price_range ?? null,
    negotiation_floor: input.negotiation_floor ?? null,
    negotiation_message: input.negotiation_message ?? null,
    next_action: input.next_action ?? null,
    raw_notes: input.raw_notes ?? null
  };

  db.prepare(
    `INSERT INTO opportunities (
      id, conversation_id, created_at, updated_at,
      title, category, source_platform, source_url,
      source_price_usd, quantity, shipping_cost_usd, repair_cost_usd, other_costs_usd,
      landed_cost_usd, resale_price_usd, expected_profit_usd, roi_pct, margin_pct,
      break_even_usd, min_acceptable_usd,
      vehicle_fitment, specs,
      risk_level, decision, opportunity_score,
      supplier_trust, demand_evidence, risk_notes, missing_info,
      supplier_questions_en, supplier_questions_zh, mechanic_questions,
      buyer_avatar, selling_angle,
      marketplace_title, marketplace_description, marketplace_price_range,
      negotiation_floor, negotiation_message, next_action, raw_notes
    ) VALUES (
      @id, @conversation_id, @created_at, @updated_at,
      @title, @category, @source_platform, @source_url,
      @source_price_usd, @quantity, @shipping_cost_usd, @repair_cost_usd, @other_costs_usd,
      @landed_cost_usd, @resale_price_usd, @expected_profit_usd, @roi_pct, @margin_pct,
      @break_even_usd, @min_acceptable_usd,
      @vehicle_fitment, @specs,
      @risk_level, @decision, @opportunity_score,
      @supplier_trust, @demand_evidence, @risk_notes, @missing_info,
      @supplier_questions_en, @supplier_questions_zh, @mechanic_questions,
      @buyer_avatar, @selling_angle,
      @marketplace_title, @marketplace_description, @marketplace_price_range,
      @negotiation_floor, @negotiation_message, @next_action, @raw_notes
    )`
  ).run(row);

  return row;
}

export function listOpportunities(): Opportunity[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM opportunities ORDER BY created_at DESC')
    .all() as Opportunity[];
}

export function getOpportunity(id: string): Opportunity | null {
  const db = getDb();
  return (db
    .prepare('SELECT * FROM opportunities WHERE id = ?')
    .get(id) as Opportunity | undefined) ?? null;
}

export function deleteOpportunity(id: string) {
  const db = getDb();
  db.prepare('DELETE FROM opportunities WHERE id = ?').run(id);
}

export { getDb };
