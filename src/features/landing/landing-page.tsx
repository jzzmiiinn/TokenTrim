import { useState } from "react";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/lib/next-compat";
import { toast } from "sonner";
import { HeroSection } from "./components/hero-section";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Preset scenarios for the Before/After Playground
interface Scenario {
  id: string;
  name: string;
  description: string;
  rawTokens: number;
  rawLatencyMs: number;
  rawCostPer1k: number;
  rawSnippet: string;
  manageEffect: { tokens: number; summary: string };
  compressEffect: { tokens: number; summary: string };
  replaceEffect: { tokens: number; summary: string };
  eliminateEffect: { tokens: number; summary: string };
  optimizedSnippet: string;
}

const scenarios: Scenario[] = [
  {
    id: "research",
    name: "Multi-turn Research Agent",
    description:
      "Agent accumulating multiple web search dumps, full HTML scrapes, and intermediate reasoning steps.",
    rawTokens: 18450,
    rawLatencyMs: 940,
    rawCostPer1k: 0.092,
    rawSnippet: `[System Prompt: Senior Market Analyst AI]
[User Turn 1]: Analyze recent Q3 AI infrastructure cloud revenue trends.
[Tool Call 1: web_search("cloud AI capex Q3 2026")]:
  Returned 24,000 chars raw HTML & search snippets across 8 domains...
[Agent Scratchpad: Turn 1]:
  "Let me think... Amazon reported $18B, Microsoft reported $19B, Google reported $13B. I need more historical context from 2024 to compare 2-year CAGR..."
[Tool Call 2: query_sec_filings("MSFT 10-Q Q3 2026")]:
  Full text of Item 2 Management Discussion (14 pages, uncompressed table dumps)...
[Agent Scratchpad: Turn 2]:
  "Calculating depreciation ratios... Capex up 48% YoY. Now scraping news articles..."
[Tool Call 3: scrape_url("https://tech-news-stream.com/cloud-ai-infrastructure")]:
  Raw DOM tree with header ads, cookie banners, tracking scripts, navigation menus...
[User Turn 2]: Summarize just the hyperscaler capex comparison table.`,
    manageEffect: {
      tokens: -2800,
      summary:
        "Partitioned context into structured schema; isolated user query",
    },
    compressEffect: {
      tokens: -4200,
      summary:
        "Semantic distillation of 14-page SEC discussion into bullet takeaways",
    },
    replaceEffect: {
      tokens: -4900,
      summary: "Replaced raw DOM HTML tree with typed 4-row tabular summary",
    },
    eliminateEffect: {
      tokens: -3600,
      summary: "Purged intermediate scratchpad turns & superseded search dumps",
    },
    optimizedSnippet: `[System Prompt: Senior Market Analyst AI (Budget: 3,000 tokens)]
[User Intent]: Hyperscaler Q3 2026 AI capex comparison.
[Preserved Entities & Facts]:
  - Microsoft Q3 Capex: $19.0B (+48% YoY) [Source: SEC 10-Q]
  - Alphabet Q3 Capex: $13.0B (+62% YoY) [Source: SEC 10-Q]
  - AWS/Amazon Capex: $18.2B (+51% YoY) [Source: Q3 Earnings]
[Active Context Constraints]:
  - Output format: Markdown comparison table with YoY growth metrics.
[User Prompt]: Summarize just the hyperscaler capex comparison table.`,
  },
  {
    id: "sql",
    name: "Database Query & Code Agent",
    description:
      "Agent querying relational databases, receiving 500-row JSON results and repeated error stack traces.",
    rawTokens: 24600,
    rawLatencyMs: 1280,
    rawCostPer1k: 0.123,
    rawSnippet: `[System Prompt: PostgreSQL Optimization Expert]
[User Turn 1]: Find all users who subscribed to Pro plan in August and haven't active sessions in 14 days.
[Tool Call 1: db_query("SELECT * FROM users JOIN subscriptions... JOIN user_events...")]:
  [ { id: 104, name: "Acme Corp", email: "...", billing_zip: "...", raw_logs: [{...}], ... },
    { id: 105, name: "Beta LLC", email: "...", billing_zip: "...", raw_logs: [{...}], ... },
    ... 498 more full row objects with telemetry fields ... ]
[Tool Call 2: db_query("EXPLAIN ANALYZE SELECT...")]:
  Execution Plan: Seq Scan on user_events (cost=0.00..18420.40 rows=482000 width=128)
  Planning Time: 1.48 ms | Execution Time: 482.10 ms
[Agent Scratchpad: Turn 1]:
  "The seq scan on user_events is taking 482ms. Let me inspect table definitions..."
[User Turn 2]: Give me the migration script to add missing indexes for these users.`,
    manageEffect: {
      tokens: -3800,
      summary: "Enforced query result budget and structured schema bounds",
    },
    compressEffect: {
      tokens: -5400,
      summary:
        "Synthesized 500-row user array into schema pattern + count metrics",
    },
    replaceEffect: {
      tokens: -7800,
      summary:
        "Replaced full row dumps with column stats (affected_rows: 500, scan_type: Seq Scan)",
    },
    eliminateEffect: {
      tokens: -4200,
      summary:
        "Removed obsolete raw telemetry logs and previous explain query buffers",
    },
    optimizedSnippet: `[System Prompt: PostgreSQL Optimization Expert]
[Active Schema Context]:
  - Table 'user_events': 482k rows, missing index on (user_id, event_timestamp)
  - Target Audience: 500 inactive Pro users identified (filtered by Aug subscriptions)
[Performance Bottleneck]:
  - Query bottleneck: Seq Scan on user_events (482ms execution time)
[User Prompt]: Give me the migration script to add missing indexes for these users.`,
  },
  {
    id: "support",
    name: "Customer Support AI Workflow",
    description:
      "Long-running multi-turn support conversation with customer records, policy PDF dumps, and agent state.",
    rawTokens: 14200,
    rawLatencyMs: 760,
    rawCostPer1k: 0.071,
    rawSnippet: `[System Prompt: Enterprise Helpdesk AI]
[Policy Document: 40-page Master Service Agreement attached in full...]
[Customer Account Profile: 80 historical tickets, billing history, payment tokens...]
[Turn 1-12 Conversation History]:
  User: "Hi, I have a question about my invoice #9842"
  Assistant: "Hello! I can help with that. What seems to be the issue?"
  User: "It charged $490 instead of $390"
  Assistant: "Let me check... Your plan renewed on Sept 1st..."
  User: "Can I get a credit for the difference?"
  ... 8 intermediate pleasantry exchanges ...
[User Turn 13]: Please issue the $100 credit to my original payment card.`,
    manageEffect: {
      tokens: -2400,
      summary: "Structured user state with persistent intent tracking",
    },
    compressEffect: {
      tokens: -3800,
      summary: "Extracted only relevant refund policy clause from 40-page MSA",
    },
    replaceEffect: {
      tokens: -2900,
      summary:
        "Replaced 80-ticket profile with single active customer summary object",
    },
    eliminateEffect: {
      tokens: -2600,
      summary:
        "Condensed 12 conversation turns into single resolved-state ledger",
    },
    optimizedSnippet: `[System Prompt: Enterprise Helpdesk AI]
[Active State]:
  - Customer: Enterprise Tier (ID: #4921)
  - Issue: Overcharge on Invoice #9842 ($490 charged vs $390 expected)
  - Policy Rule: Section 4.2 allows automatic credit up to $250 for billing discrepancy.
[User Request]: Please issue the $100 credit to my original payment card.`,
  },
];

// Analytics telemetry data
const tokenReductionData = [
  {
    time: "00:00",
    rawTokens: 145000,
    optimizedTokens: 29000,
    reductionPct: 80.0,
  },
  {
    time: "04:00",
    rawTokens: 182000,
    optimizedTokens: 35000,
    reductionPct: 80.7,
  },
  {
    time: "08:00",
    rawTokens: 320000,
    optimizedTokens: 64000,
    reductionPct: 80.0,
  },
  {
    time: "12:00",
    rawTokens: 580000,
    optimizedTokens: 112000,
    reductionPct: 80.6,
  },
  {
    time: "16:00",
    rawTokens: 640000,
    optimizedTokens: 124000,
    reductionPct: 80.6,
  },
  {
    time: "20:00",
    rawTokens: 410000,
    optimizedTokens: 79000,
    reductionPct: 80.7,
  },
];

const strategyDistributionData = [
  { name: "Eliminate", value: 42, color: "#38bdf8" },
  { name: "Compress", value: 28, color: "#60a5fa" },
  { name: "Replace", value: 20, color: "#818cf8" },
  { name: "Manage", value: 10, color: "#a78bfa" },
];

const latencyBenchmarks = [
  { model: "GPT-4o", rawMs: 820, optimizedMs: 240, savedMs: 580 },
  { model: "Claude 3.5 Sonnet", rawMs: 960, optimizedMs: 290, savedMs: 670 },
  { model: "Gemini 2.5 Pro", rawMs: 780, optimizedMs: 220, savedMs: 560 },
  { model: "DeepSeek V3", rawMs: 710, optimizedMs: 190, savedMs: 520 },
];

const sdkCode = {
  ts: `import { TokenTrim } from 'tokentrim';

// Initialize the TokenTrim context optimization client
const trimmer = new TokenTrim({
  apiKey: process.env.TOKENTRIM_API_KEY,
  defaultStrategy: 'auto', // manage | compress | replace | eliminate
  maxTokenBudget: 4000
});

// Intercept your agent's outgoing context before the LLM call
const optimizedContext = await trimmer.optimize({
  context: agentState.messages,
  operations: ['manage', 'compress', 'replace', 'eliminate'],
  preserveKeys: ['user_intent', 'final_answer', 'active_tools'],
  telemetry: {
    agentId: 'research-agent-prod',
    model: 'gpt-4o'
  }
});

// Send lean, high-signal context to your LLM provider
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: optimizedContext.messages
});`,
  py: `from tokentrim import TokenTrim
import os

# Initialize TokenTrim context trimmer
trimmer = TokenTrim(
    api_key=os.getenv("TOKENTRIM_API_KEY"),
    default_strategy="auto",
    max_token_budget=4000
)

# Optimize agent state and tool history
optimized_context = trimmer.optimize(
    context=agent_state["messages"],
    operations=["manage", "compress", "replace", "eliminate"],
    preserve_keys=["user_intent", "final_answer"],
    telemetry={"agent_id": "sql-agent-01", "model": "claude-3-5-sonnet"}
)

# Forward to model provider with 75%+ lower context load
response = anthropic.messages.create(
    model="claude-3-5-sonnet-20241022",
    messages=optimized_context.messages
)`,
  curl: `curl -X POST https://api.tokentrim.dev/v1/optimize \\
  -H "Authorization: Bearer $TOKENTRIM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "strategy": "auto",
    "operations": ["manage", "compress", "replace", "eliminate"],
    "max_tokens": 4000,
    "context": [
      { "role": "system", "content": "You are a database analyzer..." },
      { "role": "user", "content": "Explain recent slow queries." },
      { "role": "tool", "content": "..." }
    ]
  }'`,
};

function copyToClipboard(text: string) {
  void navigator.clipboard.writeText(text);
  toast.success("Code copied to clipboard!");
}

export default function LandingPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("research");
  const [activeStrategies, setActiveStrategies] = useState({
    manage: true,
    compress: true,
    replace: true,
    eliminate: true,
  });
  const [activeLanguage, setActiveLanguage] = useState<"ts" | "py" | "curl">(
    "ts"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentScenario =
    scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  // Calculate dynamic tokens based on enabled strategies
  let tokenReduction = 0;
  if (activeStrategies.manage)
    tokenReduction += Math.abs(currentScenario.manageEffect.tokens);
  if (activeStrategies.compress)
    tokenReduction += Math.abs(currentScenario.compressEffect.tokens);
  if (activeStrategies.replace)
    tokenReduction += Math.abs(currentScenario.replaceEffect.tokens);
  if (activeStrategies.eliminate)
    tokenReduction += Math.abs(currentScenario.eliminateEffect.tokens);

  const dynamicOptimizedTokens = Math.max(
    800,
    currentScenario.rawTokens - tokenReduction
  );
  const reductionPercentage = Math.round(
    ((currentScenario.rawTokens - dynamicOptimizedTokens) /
      currentScenario.rawTokens) *
    100
  );
  const dynamicLatencyMs = Math.round(
    currentScenario.rawLatencyMs *
    (dynamicOptimizedTokens / currentScenario.rawTokens + 0.18)
  );
  const dynamicCostPer1k = Number(
    (
      currentScenario.rawCostPer1k *
      (dynamicOptimizedTokens / currentScenario.rawTokens)
    ).toFixed(3)
  );

  const toggleStrategy = (key: keyof typeof activeStrategies) => {
    setActiveStrategies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Icons.trim className="h-3.5 w-3.5" />
              </div>
              <span className="text-base font-bold">
                Token<span className="text-cyan-400">Trim</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a
              href="#product"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
            >
              How It Works
            </a>
            <a
              href="#developers"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
            >
              Developers
            </a>
            <a
              href="#faq"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
            >
              FAQ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://github.com/jzzmiiinn/TokenTrim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
              >
                <Icons.github className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <a href="#developers">
                <Button
                  size="sm"
                  className="h-8 gap-1.5 rounded-md bg-cyan-600 px-3.5 text-sm font-medium text-white shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:bg-cyan-500"
                >
                  Get Started
                  <Icons.arrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <Icons.close className="h-5 w-5" />
              ) : (
                <Icons.menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="border-t border-slate-800/80 bg-[#030712]/95 backdrop-blur-md md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {[
                { label: "Product", href: "#product" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Developers", href: "#developers" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800/80 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                >
                  {item.label}
                </a>

              ))}

              <div className="my-2 border-t border-slate-800/80" />

              <a
                href="https://github.com/tokentrim/tokentrim"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800/80 hover:text-white"
              >
                <Icons.github className="h-4 w-4" />
                GitHub
              </a>

              <a href="#developers" onClick={() => setMobileOpen(false)}>
                <Button className="mt-2 w-full justify-center gap-1.5 rounded-md bg-cyan-600 text-sm font-medium text-white hover:bg-cyan-500">
                  Get Started
                </Button>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Problem Section */}
      <section
        id="problem"
        className="py-20 border-b border-slate-800/60 bg-slate-950/40"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Your agents accumulate context. Every request carries it forward.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              AI agents continuously accumulate conversation history, tool
              outputs, documents, retrieved information, intermediate reasoning,
              and agent state. As context grows, requests become heavier,
              slower, and significantly more expensive.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Conversation History",
                desc: "Repetitive pleasantries, stale back-and-forth turns, and superseded instructions that crowd out actual user intent.",
                icon: Icons.history,
                badge: "Conversational",
              },
              {
                title: "Tool Outputs",
                desc: "Massive raw JSON structures, 500-row SQL dumps, and unparsed HTML scraping payloads injected verbatim.",
                icon: Icons.terminal,
                badge: "Tool Bloat",
              },
              {
                title: "Documents",
                desc: "Heavy 50-page PDFs, markdown files, and raw codebase dumps containing mostly irrelevant filler sections.",
                icon: Icons.page,
                badge: "Document RAG",
              },
              {
                title: "Retrieved Information",
                desc: "Redundant vector RAG search chunks, noisy embedding matches, and duplicate semantic paragraphs.",
                icon: Icons.database,
                badge: "Retrieval",
              },
              {
                title: "Intermediate Reasoning",
                desc: "Verbose scratchpads, speculative chain-of-thought steps, and abandoned reasoning dead-ends.",
                icon: Icons.brain,
                badge: "Scratchpads",
              },
              {
                title: "Agent State",
                desc: "Bloated nested state schemas, redundant execution logs, and serializations carried across every loop.",
                icon: Icons.cpu,
                badge: "State Vectors",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="border-slate-800 bg-slate-900/40 backdrop-blur-xs"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-cyan-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant="outline"
                        className="border-slate-700 font-mono text-[10px] text-slate-400"
                      >
                        {item.badge}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg font-semibold text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Context Accumulation Timeline Bar */}
          <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  Agent Context Explosion Over 6 Turns
                </h3>
                <p className="text-xs text-slate-400">
                  Visualizing how dead weight grows exponentially without
                  TokenTrim
                </p>
              </div>
              <span className="font-mono text-xs text-rose-400 font-semibold">
                +1,800% Bloat by Turn 6
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  turn: "Turn 1: Initial user intent",
                  tokens: "1,200",
                  pct: 6,
                  deadPct: 5,
                },
                {
                  turn: "Turn 2: Search tool + HTML scrape",
                  tokens: "6,400",
                  pct: 28,
                  deadPct: 45,
                },
                {
                  turn: "Turn 3: SQL query + DB row dump",
                  tokens: "14,200",
                  pct: 62,
                  deadPct: 68,
                },
                {
                  turn: "Turn 4: PDF retrieval + RAG excerpts",
                  tokens: "21,500",
                  pct: 85,
                  deadPct: 75,
                },
                {
                  turn: "Turn 5: Multi-agent scratchpads",
                  tokens: "28,400",
                  pct: 95,
                  deadPct: 81,
                },
                {
                  turn: "Turn 6: Final summary prompt",
                  tokens: "34,200",
                  pct: 100,
                  deadPct: 83,
                },
              ].map((step, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{step.turn}</span>
                    <span className="text-slate-400">
                      {step.tokens} tokens ({step.deadPct}% dead weight)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: `${step.pct * (1 - step.deadPct / 100)}%`,
                      }}
                      title="Useful Context"
                    />
                    <div
                      className="h-full bg-rose-500/80"
                      style={{ width: `${step.pct * (step.deadPct / 100)}%` }}
                      title="Bloat / Unnecessary Tokens"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-end gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                <span className="text-slate-400">Essential Agent Signal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-rose-500/80" />
                <span className="text-slate-400">Prunable Context Bloat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Solution Section: The 4 Core Operations */}
      <section id="product" className="py-20 border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Four operations. Total context efficiency.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              TokenTrim replaces crude window truncations with intelligent
              semantic operations specifically designed for multi-turn agent
              systems.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                op: "Manage",
                title: "Manage",
                icon: Icons.manage,
                tagline: "Organize and partition context",
                desc: "Enforces strict token budgets per component, prioritizes critical system directives, and structures message history into addressable semantic tiers.",
                badgeColor:
                  "border-purple-500/30 text-purple-300 bg-purple-950/20",
              },
              {
                op: "Compress",
                title: "Compress",
                icon: Icons.compress,
                tagline: "Reduce size while keeping facts",
                desc: "Applies dense semantic summarization and key-fact distillation to bulky documents and conversation turns, preserving vital entities.",
                badgeColor: "border-blue-500/30 text-blue-300 bg-blue-950/20",
              },
              {
                op: "Replace",
                title: "Replace",
                icon: Icons.replace,
                tagline: "Substitute raw data with compact schemas",
                desc: "Replaces massive 500-row SQL dumps, HTML pages, and raw JSON payloads with typed schema summaries and representative item statistics.",
                badgeColor: "border-cyan-500/30 text-cyan-300 bg-cyan-950/20",
              },
              {
                op: "Eliminate",
                title: "Eliminate",
                icon: Icons.eliminate,
                tagline: "Purge obsolete & dead context",
                desc: "Safely removes intermediate reasoning scratchpads, superseded tool call attempts, expired temporal states, and duplicate RAG chunks.",
                badgeColor:
                  "border-emerald-500/30 text-emerald-300 bg-emerald-950/20",
              },
            ].map((op) => {
              const Icon = op.icon;
              return (
                <Card
                  key={op.op}
                  className="border-slate-800 bg-slate-900/50 backdrop-blur-xs flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-cyan-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`font-mono text-[10px] ${op.badgeColor}`}
                      >
                        {op.op}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl font-bold text-white">
                      {op.title}
                    </CardTitle>
                    <CardDescription className="text-cyan-400 text-xs font-mono">
                      {op.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {op.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. How It Works Pipeline Architecture */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              How TokenTrim intercepts & optimizes agent context
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              TokenTrim acts as an in-memory optimization filter before your
              requests reach model providers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Intercept Context",
                desc: "Captures full agent history, tool payloads, system prompts, and memory buffers before model invocation.",
                icon: Icons.terminal,
              },
              {
                step: "02",
                title: "Semantic Analysis",
                desc: "Evaluates token density, entity importance, tool obsolescence, and relevance to current user query.",
                icon: Icons.brain,
              },
              {
                step: "03",
                title: "Apply 4 Operations",
                desc: "Executes Manage, Compress, Replace, and Eliminate rules in parallel based on configured token budgets.",
                icon: Icons.trim,
              },
              {
                step: "04",
                title: "Lean LLM Dispatch",
                desc: "Dispatches the streamlined high-signal payload to OpenAI, Anthropic, Gemini, or self-hosted models.",
                icon: Icons.bolt,
              },
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        STEP {st.step}
                      </span>
                      <Icon className="h-4 w-4 text-slate-400" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {st.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Before / After Interactive Playground */}
      <section
        id="how-it-works"
        className="py-20 border-b border-slate-800/60 bg-slate-950/60"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Raw agent context → TokenTrim → Optimized context
              </h2>
              <p className="mt-2 text-base text-slate-400 max-w-2xl">
                Select an agent workload and toggle operations in real time to
                observe the exact token reduction, latency improvements, and
                preserved information.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                Workload:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {scenarios.map((s) => (
                  <Button
                    key={s.id}
                    variant={
                      selectedScenarioId === s.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedScenarioId(s.id)}
                    className={
                      selectedScenarioId === s.id
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono"
                        : "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 text-xs font-mono"
                    }
                  >
                    {s.name.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Strategy Toggles */}
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase mr-2">
              Active Operations:
            </span>
            {[
              { key: "manage" as const, label: "Manage", icon: Icons.manage },
              {
                key: "compress" as const,
                label: "Compress",
                icon: Icons.compress,
              },
              {
                key: "replace" as const,
                label: "Replace",
                icon: Icons.replace,
              },
              {
                key: "eliminate" as const,
                label: "Eliminate",
                icon: Icons.eliminate,
              },
            ].map((strat) => {
              const active = activeStrategies[strat.key];
              const Icon = strat.icon;
              return (
                <button
                  key={strat.key}
                  type="button"
                  onClick={() => toggleStrategy(strat.key)}
                  className={`flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-mono font-medium transition-all ${active
                    ? "border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                    : "border-slate-800 bg-slate-950/60 text-slate-500 hover:text-slate-300"
                    }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{strat.label}</span>
                  <span
                    className={`text-[10px] ${active ? "text-emerald-400 font-bold" : "text-slate-600"}`}
                  >
                    {active ? "ON" : "OFF"}
                  </span>
                </button>
              );
            })}
            <div className="ml-auto text-[11px] font-mono text-slate-400 italic">
              *Interactive simulation workbench
            </div>
          </div>

          {/* Metrics summary bar */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="text-xs text-slate-400 font-mono">RAW TOKENS</div>
              <div className="mt-1 text-2xl font-bold font-mono text-rose-400">
                {currentScenario.rawTokens.toLocaleString()}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Pre-optimization context
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
              <div className="text-xs text-cyan-300 font-mono">
                OPTIMIZED TOKENS
              </div>
              <div className="mt-1 text-2xl font-bold font-mono text-cyan-400">
                {dynamicOptimizedTokens.toLocaleString()}
              </div>
              <p className="mt-1 text-xs text-emerald-400 font-mono">
                -{reductionPercentage}% Context Reduction
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="text-xs text-slate-400 font-mono">
                EST. TIME TO FIRST TOKEN (TTFT)
              </div>
              <div className="mt-1 text-2xl font-bold font-mono text-white">
                {dynamicLatencyMs}ms
              </div>
              <p className="mt-1 text-xs text-emerald-400 font-mono">
                -{currentScenario.rawLatencyMs - dynamicLatencyMs}ms faster
                response
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="text-xs text-slate-400 font-mono">
                EST. COST PER 1K CALLS
              </div>
              <div className="mt-1 text-2xl font-bold font-mono text-emerald-400">
                ${dynamicCostPer1k.toFixed(2)}
              </div>
              <p className="mt-1 text-xs text-slate-400 font-mono">
                Saved $
                {(currentScenario.rawCostPer1k - dynamicCostPer1k).toFixed(2)} /
                1k
              </p>
            </div>
          </div>

          {/* Side-by-side Context Comparison Viewer */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Raw Context Box */}
            <div className="rounded-xl border border-rose-900/30 bg-slate-950 p-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="font-mono text-xs font-semibold text-rose-300 uppercase">
                    Raw Agent Context (
                    {currentScenario.rawTokens.toLocaleString()} tokens)
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="border-rose-800/40 text-rose-400 text-[10px] font-mono"
                >
                  UNOPTIMIZED
                </Badge>
              </div>
              <div className="mt-4 flex-1 overflow-x-auto rounded-lg bg-slate-900/70 p-3.5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto">
                {currentScenario.rawSnippet}
              </div>
            </div>

            {/* Optimized TokenTrim Context Box */}
            <div className="rounded-xl border border-cyan-500/40 bg-slate-950 p-4 flex flex-col shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  <span className="font-mono text-xs font-semibold text-cyan-300 uppercase">
                    TokenTrim Optimized Context (
                    {dynamicOptimizedTokens.toLocaleString()} tokens)
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="border-cyan-500/40 text-cyan-300 text-[10px] font-mono bg-cyan-950/40"
                >
                  TRIMMED (-{reductionPercentage}%)
                </Badge>
              </div>
              <div className="mt-4 flex-1 overflow-x-auto rounded-lg bg-slate-900/70 p-3.5 font-mono text-xs text-cyan-100 leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto border border-cyan-500/20">
                {currentScenario.optimizedSnippet}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Developer Integration Section */}
      <section id="developers" className="py-20 border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Two lines of code. Immediate context savings.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Integrate directly into your LangChain, LlamaIndex, or custom
              agent loop. TokenTrim acts as an in-memory optimization filter
              before outgoing LLM requests.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-800 bg-slate-950 p-6">
            {/* Install CLI */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3">
              <div className="flex items-center gap-3 font-mono text-sm">
                <span className="text-cyan-400">$</span>
                <span className="text-slate-200">npm install tokentrim</span>
                <span className="text-slate-500 text-xs hidden md:inline">
                  # or pip install tokentrim
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard("npm install tokentrim")}
                className="gap-2 text-xs text-slate-300 hover:text-white"
              >
                <Icons.copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>

            {/* Code snippets tabs */}
            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  {(["ts", "py", "curl"] as const).map((lang) => (
                    <Button
                      key={lang}
                      variant={activeLanguage === lang ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveLanguage(lang)}
                      className={
                        activeLanguage === lang
                          ? "bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono"
                          : "text-slate-400 hover:text-white text-xs font-mono"
                      }
                    >
                      {lang === "ts"
                        ? "TypeScript"
                        : lang === "py"
                          ? "Python"
                          : "cURL / REST"}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sdkCode[activeLanguage])}
                  className="gap-2 text-xs border-slate-800 bg-slate-900/50 text-slate-300"
                >
                  <Icons.copy className="h-3.5 w-3.5" />
                  Copy Snippet
                </Button>
              </div>

              <div className="mt-4 overflow-x-auto rounded-lg bg-slate-900/80 p-4 font-mono text-xs text-slate-200 leading-relaxed">
                <pre>{sdkCode[activeLanguage]}</pre>
              </div>
            </div>

            <p className="mt-4 text-xs font-mono text-slate-500 italic">
              *Conceptual developer SDK demonstration. Compatible with OpenAI,
              Anthropic, Gemini, Mistral, and local vLLM/Ollama engines.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Analytics & Observability Section */}
      <section
        id="analytics"
        className="py-20 border-b border-slate-800/60 bg-slate-950/40"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Full visibility into your agent context pipelines.
              </h2>
              <p className="mt-2 text-base text-slate-400 max-w-2xl">
                Monitor token reduction rates, latency savings, and cost
                optimization across all connected agent clusters in real time.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-7">
            {/* Main Token Reduction Area Chart */}
            <Card className="lg:col-span-4 border-slate-800 bg-slate-900/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold text-white">
                      Token Throughput (24h)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400">
                      Raw tokens vs TokenTrim optimized tokens
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-400 font-mono text-xs"
                  >
                    Avg. 80.4% Saved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={tokenReductionData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRaw"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f43f5e"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f43f5e"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorOptimized"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#06b6d4"
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="95%"
                            stopColor="#06b6d4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1e293b"
                        vertical={false}
                      />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                      <YAxis
                        stroke="#64748b"
                        fontSize={11}
                        tickFormatter={(val) => `${val / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#090d16",
                          borderColor: "#334155",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="rawTokens"
                        name="Raw Tokens"
                        stroke="#f43f5e"
                        fillOpacity={1}
                        fill="url(#colorRaw)"
                      />
                      <Area
                        type="monotone"
                        dataKey="optimizedTokens"
                        name="Optimized Tokens"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorOptimized)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Strategy Breakdown Chart */}
            <Card className="lg:col-span-3 border-slate-800 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-white">
                  Operation Distribution
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Breakdown of applied trimming operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={strategyDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {strategyDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#090d16",
                          borderColor: "#334155",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                  {strategyDistributionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-300">{item.name}:</span>
                      <span className="text-white font-bold">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Model Latency Benchmark Bar */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-3">
              TTFT Latency Reduction Across Upstream Models
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {latencyBenchmarks.map((b) => (
                <div
                  key={b.model}
                  className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3"
                >
                  <div className="text-xs font-mono font-semibold text-white">
                    {b.model}
                  </div>
                  <div className="mt-1 flex items-baseline justify-between font-mono">
                    <span className="text-xs text-slate-500 line-through">
                      {b.rawMs}ms
                    </span>
                    <span className="text-sm font-bold text-emerald-400">
                      {b.optimizedMs}ms
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-cyan-400">
                    -{b.savedMs}ms faster response
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Integrations Section */}
      <section
        id="integrations"
        className="py-20 border-b border-slate-800/60"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Works seamlessly with your entire AI stack
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              TokenTrim intercepts standard message payload arrays across major
              orchestration frameworks, model providers, and local inference
              engines.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                category: "Agent Frameworks",
                items: ["LangChain", "LlamaIndex", "CrewAI", "AutoGen"],
                desc: "Drop-in middleware wrapper for agent state loops",
              },
              {
                category: "Cloud LLM Providers",
                items: ["OpenAI (GPT-4o)", "Anthropic (Claude)", "Google Gemini", "Mistral AI"],
                desc: "Compatible with standard chat completions schemas",
              },
              {
                category: "Self-Hosted Inference",
                items: ["vLLM Server", "Ollama", "TGI", "LocalAI"],
                desc: "Zero external latency overhead on local clusters",
              },
              {
                category: "Data & Tool Ingestion",
                items: ["PostgreSQL / SQL", "Web Scraping DOM", "PDF / RAG Embeddings", "REST JSON Dumps"],
                desc: "Pre-built parsers for heavy raw telemetry formats",
              },
            ].map((int) => (
              <Card
                key={int.category}
                className="border-slate-800 bg-slate-900/40"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-white">
                    {int.category}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    {int.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {int.items.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="border-slate-700 bg-slate-950 font-mono text-[11px] text-slate-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Use Cases Section */}
      <section
        id="use-cases"
        className="py-20 border-b border-slate-800/60 bg-slate-950/40"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Engineered for high-volume agent architectures
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              From continuous data pipelines to multi-agent coding swarms,
              TokenTrim ensures cost and latency remain predictable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Multi-turn Autonomous Research Agents",
                desc: "Search dumps, raw HTML scrapes, and superseded reasoning steps accumulate quickly. TokenTrim preserves extracted facts while discarding ephemeral scratchpads.",
                metrics: "-82% Context Bloat • 580ms Faster TTFT",
                icon: Icons.brain,
              },
              {
                title: "SQL & Relational Diagnostic Bots",
                desc: "Replaces heavy 500-row JSON query results with compact schema structures and distribution summaries, keeping model queries within token budgets.",
                metrics: "-84% Token Overhead • Zero Lost Schema Info",
                icon: Icons.database,
              },
              {
                title: "Long-Running Customer Support Workflows",
                desc: "Compresses multi-ticket history and 40-page policy manuals into active customer intent states, eliminating pleasantry overhead.",
                metrics: "-75% History Size • Instant Turn Routing",
                icon: Icons.chat,
              },
              {
                title: "Code Review & Repository Analysis Agents",
                desc: "Filters out boilerplate files, generated bundles, and duplicate diff chunks so LLMs focus exclusively on core logic changes.",
                metrics: "-79% Code Context • High Precision Signal",
                icon: Icons.fileCode,
              },
            ].map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-cyan-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {uc.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-xs text-emerald-400">
                    {uc.metrics}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section id="faq" className="py-20 border-b border-slate-800/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is TokenTrim?",
                a: "TokenTrim is an intelligent context optimization layer that sits between your AI agent and the upstream LLM. It analyzes the full context (conversation history, tool outputs, documents, agent state) and applies Manage, Compress, Replace, and Eliminate operations so only high-signal information reaches the model.",
              },
              {
                q: "Why does context size matter for AI agents?",
                a: "Larger contexts increase latency (time to first token), raise inference costs exponentially across multiple turns, and degrade model attention on key instructions. TokenTrim keeps the signal and purges the noise so agents stay fast and cost-effective.",
              },
              {
                q: "What types of context can TokenTrim optimize?",
                a: "Conversation history, tool outputs (JSON, SQL row dumps, HTML scrapes), retrieved documents / RAG chunks, intermediate reasoning / scratchpads, and agent state schema serializations.",
              },
              {
                q: "Does TokenTrim simply delete context?",
                a: "No. The four operations are deliberate: Manage partitions and prioritizes, Compress distills while preserving critical facts, Replace swaps expensive raw data for compact schema summaries, and Eliminate safely removes content that is obsolete or superseded. Task-relevant information is protected.",
              },
              {
                q: "Does it work with existing agent frameworks?",
                a: "Yes. TokenTrim is framework-agnostic. You can integrate via the TypeScript/Python SDK, standard REST endpoint, or reverse proxy wrapper with LangChain, LlamaIndex, CrewAI, AutoGen, or custom agent loops.",
              },
              {
                q: "Can I customize the optimization rules and token budgets?",
                a: "Yes. You can configure global token budgets, enable/disable specific operations, protect critical entity keys via whitelists, and configure retention thresholds.",
              },
              {
                q: "Does TokenTrim store or train on my agent's prompt data?",
                a: "No. TokenTrim operates with a strict zero-retention ephemeral processing model. Payloads are processed in-memory and immediately discarded after optimization.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4"
              >
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#030712] to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white max-w-3xl mx-auto">
            Give your agents less to process.{" "}
            <span className="text-cyan-400">Keep what they need.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Build responsive, cost-efficient AI applications with context
            optimization at the foundation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#developers">
              <Button
                size="lg"
                className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20 px-8"
              >
                Get Started
                <Icons.arrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-6"
              >
                <Icons.trim className="h-5 w-5 text-cyan-400" />
                Explore Playground
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="border-t border-slate-800/80 bg-[#030712]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">
                  <Icons.trim className="h-3.5 w-3.5" />
                </div>
                <span className="text-base font-semibold text-white">
                  Token<span className="text-cyan-400">Trim</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                AI context optimization layer for agentic applications.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a
                    href="#problem"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Problem Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#product"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Core Operations
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Interactive Playground
                  </a>
                </li>
                <li>
                  <a
                    href="#analytics"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Observability
                  </a>
                </li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
                Developers
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a
                    href="#developers"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    SDK Quick Start
                  </a>
                </li>
                <li>
                  <a
                    href="#integrations"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Framework Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#use-cases"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Production Use Cases
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jzzmiiinn/TokenTrim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a
                    href="#developers"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    SDK Quick Start
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Interactive Playground
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Architecture FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jzzmiiinn/TokenTrim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <span>© 2026 TokenTrim — Developer AI Context Optimization</span>
            <div className="flex items-center gap-6">
              <a href="#faq" className="hover:text-slate-300 transition-colors">
                Privacy
              </a>
              <a
                href="#developers"
                className="hover:text-slate-300 transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}