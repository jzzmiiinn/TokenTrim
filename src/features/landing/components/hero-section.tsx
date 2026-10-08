import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/next-compat";

interface ContextRow {
  id: string;
  name: string;
  rawTokens: string;
  operation: "manage" | "compress" | "replace" | "eliminate";
}

const CONTEXT_ROWS: ContextRow[] = [
  {
    id: "conversation",
    name: "Conversation",
    rawTokens: "3.2k",
    operation: "manage",
  },
  {
    id: "tool_outputs",
    name: "Tool outputs",
    rawTokens: "5.8k",
    operation: "replace",
  },
  {
    id: "documents",
    name: "Documents",
    rawTokens: "3.1k",
    operation: "compress",
  },
  {
    id: "agent_state",
    name: "Agent state",
    rawTokens: "1.4k",
    operation: "manage",
  },
  {
    id: "retrieved_data",
    name: "Retrieved data",
    rawTokens: "2.6k",
    operation: "eliminate",
  },
];

export function HeroSection() {
  // Animation lifecycle: 'raw' -> 'optimizing' -> 'optimized'
  const [pipelineState, setPipelineState] = useState<
    "raw" | "optimizing" | "optimized"
  >("optimized");
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Subtle auto-run once on mount for demonstration, then user-driven
  useEffect(() => {
    const timer = setTimeout(() => {
      setPipelineState("optimizing");
      setTimeout(() => setPipelineState("optimized"), 1200);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleReplay = () => {
    setPipelineState("raw");
    setTimeout(() => setPipelineState("optimizing"), 400);
    setTimeout(() => setPipelineState("optimized"), 1400);
  };

  const isOptimized = pipelineState === "optimized";
  const isOptimizing = pipelineState === "optimizing";

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#030712] py-14 sm:py-20 lg:py-24">
      {/* Subtle background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[450px] w-[90%] max-w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Hero Text & CTAs */}
          <div className="flex flex-col items-start text-left lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Developer Context Optimization Layer
            </div>

            {/* Main headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
              Trim the context.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Keep what matters.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Automatically manage, compress, replace, and eliminate unnecessary
              AI context to reduce inference latency and token overhead while
              preserving essential facts.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a href="#developers" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all"
                >
                  Get Started
                  <Icons.arrowRight className="h-4 w-4" />
                </Button>
              </a>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-5 transition-colors"
                >
                  Explore Playground
                </Button>
              </a>

              <a
                href="https://github.com/jzzmiiinn/TokenTrim"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors group"
              >
                <Icons.github className="h-4 w-4" />
                <span>GitHub</span>
                <span className="transition-transform group-hover:translate-x-0.5 text-slate-500 group-hover:text-cyan-400">
                  →
                </span>
              </a>
            </div>

            {/* Pipeline Step Breadcrumb */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 w-full">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="text-slate-500">INPUT CONTEXT</span>
                <span className="text-cyan-500">→</span>
                <span className="text-cyan-400">ANALYZE</span>
                <span className="text-cyan-500">→</span>
                <span className="text-cyan-300 font-semibold">OPTIMIZE</span>
                <span className="text-cyan-500">→</span>
                <span className="text-emerald-400">MODEL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Visualization */}
          <div className="w-full lg:col-span-6">
            <div className="relative mx-auto w-full max-w-lg rounded-xl border border-slate-800 bg-[#080d1a] shadow-2xl backdrop-blur-md overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800/90 bg-slate-950/90 px-3.5 sm:px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="ml-2 font-mono text-xs text-slate-300 flex items-center gap-1.5 truncate">
                    <Icons.terminal className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    context.optimize()
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${isOptimized
                      ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-400"
                      : isOptimizing
                        ? "border-cyan-500/40 bg-cyan-950/40 text-cyan-300 animate-pulse"
                        : "border-slate-700 bg-slate-900 text-slate-400"
                      }`}
                  >
                    {isOptimized
                      ? "● Optimized"
                      : isOptimizing
                        ? "⚡ Optimizing"
                        : "○ Raw Context"}
                  </Badge>

                  <button
                    type="button"
                    onClick={handleReplay}
                    aria-label="Replay optimization simulation"
                    title="Replay optimization simulation"
                    className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <Icons.refresh className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Technical Token Metric Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-3.5 sm:px-4 py-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-slate-500">TOKENS:</span>
                  <span className="text-slate-200">
                    {pipelineState === "raw" ? (
                      <span className="text-rose-300 font-semibold">16.1k</span>
                    ) : (
                      <span>
                        <span className="text-slate-500 line-through mr-1 sm:mr-1.5">
                          16.1k
                        </span>
                        <span className="text-cyan-400">→</span>
                        <span className="text-emerald-400 font-bold ml-1 sm:ml-1.5">
                          4.2k
                        </span>
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">REDUCTION: </span>
                  <span
                    className={
                      isOptimized
                        ? "text-emerald-400 font-bold"
                        : "text-slate-400"
                    }
                  >
                    {isOptimized
                      ? "-73.9%"
                      : isOptimizing
                        ? "calculating..."
                        : "0%"}
                  </span>
                </div>
              </div>

              {/* Diagram Body */}
              <div className="p-3.5 sm:p-5 space-y-3 font-mono text-xs">
                {/* 1. Raw Context Box */}
                <div className="rounded-lg border border-slate-800/90 bg-slate-950/70 p-2.5 sm:p-3 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-2 pb-1.5 border-b border-slate-800/60">
                    <span className="text-[11px] font-semibold tracking-wider text-slate-400 flex items-center gap-1.5 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      CONTEXT
                    </span>
                    <span className="text-[10px] text-slate-500">
                      5 categories
                    </span>
                  </div>

                  <div className="space-y-1">
                    {CONTEXT_ROWS.map((row) => {
                      const isHovered = activeHoverId === row.id;
                      return (
                        <div
                          key={row.id}
                          onMouseEnter={() => setActiveHoverId(row.id)}
                          onMouseLeave={() => setActiveHoverId(null)}
                          className={`flex items-center justify-between rounded px-2 py-1 transition-all duration-300 ${isOptimized
                            ? "bg-slate-900/30 text-slate-400 opacity-75 hover:opacity-100 hover:bg-slate-900/80"
                            : isOptimizing
                              ? "bg-cyan-950/20 text-cyan-200"
                              : "bg-slate-900/50 text-slate-300"
                            } ${isHovered ? "ring-1 ring-cyan-500/40" : ""}`}
                        >
                          <span className="text-slate-300 truncate text-[11px] sm:text-xs">
                            {row.name}
                          </span>

                          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            {isOptimized && (
                              <span
                                className={`text-[9px] uppercase px-1.5 py-0.5 rounded border ${row.operation === "eliminate"
                                  ? "border-rose-500/30 text-rose-300 bg-rose-950/30"
                                  : row.operation === "compress"
                                    ? "border-blue-500/30 text-blue-300 bg-blue-950/30"
                                    : row.operation === "replace"
                                      ? "border-indigo-500/30 text-indigo-300 bg-indigo-950/30"
                                      : "border-cyan-500/30 text-cyan-300 bg-cyan-950/30"
                                  }`}
                              >
                                {row.operation}
                              </span>
                            )}
                            <span
                              className={`font-mono text-right min-w-7 text-[11px] sm:text-xs ${isOptimized
                                ? "text-slate-500 line-through"
                                : "text-slate-400"
                                }`}
                            >
                              {row.rawTokens}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Middle Processing Node: ↓ TokenTrim */}
                <div
                  className={`flex items-center justify-between rounded-lg border px-3 sm:px-3.5 py-2 transition-all duration-500 ${isOptimizing
                    ? "border-cyan-400 bg-cyan-950/70 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.01]"
                    : isOptimized
                      ? "border-cyan-500/40 bg-cyan-950/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                      : "border-slate-800 bg-slate-900/50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                      <Icons.trim className="h-3 w-3" />
                    </div>
                    <span className="font-semibold text-cyan-300 text-xs">
                      ↓ TokenTrim
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      manage • compress • replace • eliminate
                    </span>
                    <span className="rounded bg-cyan-900/50 px-1.5 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/30 font-mono">
                      {isOptimizing ? "optimizing..." : "-11.9k trimmed"}
                    </span>
                  </div>
                </div>

                {/* 3. Lower Section: OPTIMIZED CONTEXT */}
                <div
                  className={`rounded-lg border p-2.5 sm:p-3 transition-all duration-500 ${isOptimized
                    ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_16px_rgba(16,185,129,0.1)]"
                    : "border-slate-800/80 bg-slate-950/40 opacity-50"
                    }`}
                >
                  <div className="flex items-center justify-between text-slate-400 mb-2 pb-1.5 border-b border-slate-800/60">
                    <span className="text-[11px] font-semibold tracking-wider text-emerald-400 flex items-center gap-1.5 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      OPTIMIZED CONTEXT
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold">
                      4.2k tokens
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1.5 sm:py-2">
                    <div className="flex items-center gap-2">
                      <Icons.check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 text-xs font-medium truncate">
                        High-Signal Payload
                      </span>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs font-mono">4.2k</span>
                  </div>
                </div>

                {/* 4. Model Output Target */}
                <div className="flex items-center justify-end pt-1 px-1 text-[11px] font-mono text-cyan-300">
                  <div className="flex items-center gap-1.5">
                    <span>→ Lean LLM Dispatch</span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

