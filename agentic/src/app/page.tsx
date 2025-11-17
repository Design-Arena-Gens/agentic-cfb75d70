'use client';

import { useMemo, useState } from "react";
import { AgentInput, AgentOutput, generateAgentOutput } from "../lib/agent";

type Preset = {
  label: string;
  topic: string;
  audience: string;
  tone: AgentInput["tone"];
  goal: AgentInput["goal"];
  energy: number;
  duration: number;
};

const toneOptions: { value: AgentInput["tone"]; label: string }[] = [
  { value: "hype", label: "High Energy Hype" },
  { value: "authority", label: "Authority Builder" },
  { value: "friendly", label: "Friendly Relatable" },
  { value: "edgy", label: "Edgy Contrarian" },
];

const goalOptions: { value: AgentInput["goal"]; label: string }[] = [
  { value: "grow", label: "Explode Reach" },
  { value: "sell", label: "Drive Sales" },
  { value: "educate", label: "Teach Fast" },
  { value: "inspire", label: "Inspire Action" },
];

const presets: Preset[] = [
  {
    label: "AI Monetization Blueprint",
    topic: "AI side hustles that print cash",
    audience: "busy solo creators",
    tone: "authority",
    goal: "sell",
    energy: 78,
    duration: 38,
  },
  {
    label: "MrBeast-Style Hook",
    topic: "extreme challenge storytelling",
    audience: "aspiring viral YouTubers",
    tone: "hype",
    goal: "grow",
    energy: 92,
    duration: 47,
  },
  {
    label: "B2B Demand Spark",
    topic: "LinkedIn content that actually converts",
    audience: "B2B founders",
    tone: "friendly",
    goal: "educate",
    energy: 64,
    duration: 32,
  },
];

const baseInput: AgentInput = {
  topic: "micro-story hooks that trigger replays",
  audience: "ambitious creators",
  tone: "hype",
  goal: "grow",
  energy: 82,
  duration: 42,
};

export default function Home() {
  const [form, setForm] = useState<AgentInput>(baseInput);
  const [output, setOutput] = useState<AgentOutput | null>(null);
  const [history, setHistory] = useState<AgentOutput[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const scoreGauge = useMemo(() => {
    if (!output) return null;
    return [
      { label: "Virality", score: output.metrics.viralityScore, accent: "bg-purple-500" },
      { label: "Retention", score: output.metrics.retentionScore, accent: "bg-sky-500" },
      { label: "Energy", score: output.metrics.energyScore, accent: "bg-emerald-500" },
    ];
  }, [output]);

  const handleGenerate = () => {
    setIsGenerating(true);
    requestAnimationFrame(() => {
      const generated = generateAgentOutput(form);
      setOutput(generated);
      setHistory((prev) => [generated, ...prev].slice(0, 3));
      setIsGenerating(false);
    });
  };

  const handlePreset = (preset: Preset) => {
    setForm({
      topic: preset.topic,
      audience: preset.audience,
      tone: preset.tone,
      goal: preset.goal,
      energy: preset.energy,
      duration: preset.duration,
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="bg-gradient-to-br from-[#050505] via-[#101828] to-[#020205] text-white min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[480px] h-[480px] bg-purple-500/30 blur-3xl rounded-full -top-32 -left-32" />
        <div className="absolute w-[380px] h-[380px] bg-sky-500/25 blur-3xl rounded-full top-1/3 right-[-120px]" />
      </div>
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-16">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white/70">
              Viral Shorts Agent
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Engineer shorts that crack the algorithm in under 60 seconds.
            </h1>
            <p className="max-w-xl text-pretty text-base text-white/70 sm:text-lg">
              Drop a topic and let the agent craft hooks, scripts, edit notes, and
              metadata tuned for explosive retention. Built for creators who want
              fast viral loops on YouTube Shorts.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="rounded-full border border-white/10 px-4 py-2">Beat-by-beat scripts</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Retention science</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Instant metadata</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-20px_rgba(59,130,246,0.35)]">
            <h2 className="text-lg font-semibold">Blow up your next drop</h2>
            <p className="mt-2 text-sm text-white/70">
              Swap between these presets to see tailored virality recipes instantly.
            </p>
            <div className="mt-5 grid gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePreset(preset)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/30 hover:bg-white/10"
                >
                  <div>
                    <p className="text-sm font-medium">{preset.label}</p>
                    <p className="text-xs text-white/60">{preset.topic}</p>
                  </div>
                  <span className="text-xs text-white/60">Apply</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Tune the brief</h2>
            <div className="grid gap-5 text-sm">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest text-white/50">Topic</span>
                <input
                  className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                  value={form.topic}
                  onChange={(event) => setForm((prev) => ({ ...prev, topic: event.target.value }))}
                  placeholder="Example: hooks that triple watch time"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest text-white/50">Audience</span>
                <input
                  className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                  value={form.audience}
                  onChange={(event) => setForm((prev) => ({ ...prev, audience: event.target.value }))}
                  placeholder="Example: exhausted YouTube creators"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-widest text-white/50">Tone style</span>
                  <select
                    className="appearance-none rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                    value={form.tone}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, tone: event.target.value as AgentInput["tone"] }))
                    }
                  >
                    {toneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-widest text-white/50">Primary goal</span>
                  <select
                    className="appearance-none rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                    value={form.goal}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, goal: event.target.value as AgentInput["goal"] }))
                    }
                  >
                    {goalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Rhythm + pacing</h2>
            <div className="grid gap-5 text-sm">
              <label className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/50">
                  <span>Energy</span>
                  <span className="text-white">{form.energy}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={100}
                  value={form.energy}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, energy: Number(event.target.value) }))
                  }
                />
                <p className="text-xs text-white/60">
                  Controls pacing and delivery cues. 100 = jump cuts + aggressive zooms.
                </p>
              </label>

              <label className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/50">
                  <span>Target duration (seconds)</span>
                  <span className="text-white">{form.duration}</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={58}
                  value={form.duration}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, duration: Number(event.target.value) }))
                  }
                />
                <p className="text-xs text-white/60">
                  Agent will map beats + transitions to hit Shorts sweet spot under 60s.
                </p>
              </label>

              <button
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? "Rendering intel..." : "Generate viral system"}
              </button>
            </div>
          </div>
        </section>

        {output ? (
          <section className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-8">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Hook system</h2>
                    <p className="mt-1 text-sm text-white/60">
                      Launch with pattern break + payoff promise inside 2s.
                    </p>
                  </div>
                  <button
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
                    onClick={() => handleCopy(output.hook)}
                  >
                    Copy hook
                  </button>
                </div>
                <p className="mt-4 text-lg font-medium text-white/90">{output.hook}</p>
                <p className="mt-3 text-sm text-white/60">{output.intro}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Beat map</h2>
                    <p className="mt-1 text-sm text-white/60">
                      Time-coded script with retention spikes baked in.
                    </p>
                  </div>
                  <button
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
                    onClick={() =>
                      handleCopy(
                        output.scriptBeats.map((beat) => `${beat.timestamp} ${beat.label}: ${beat.line}`).join("\n"),
                      )
                    }
                  >
                    Copy beats
                  </button>
                </div>
                <div className="mt-5 space-y-4">
                  {output.scriptBeats.map((beat) => (
                    <div
                      key={beat.label}
                      className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                          {beat.timestamp}
                        </p>
                        <p className="text-sm font-medium text-white">{beat.label}</p>
                      </div>
                      <p className="text-sm text-white/70 md:max-w-xl">{beat.line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <h2 className="text-xl font-semibold">Metadata stack</h2>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">Title</p>
                      <p className="mt-1 text-base text-white/90">{output.metadata.title}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">Description</p>
                      <pre className="mt-1 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-[13px] leading-relaxed text-white/80">
                        {output.metadata.description}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">Hashtags</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {output.metadata.hashtags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <h2 className="text-xl font-semibold">Editing directives</h2>
                  <ul className="mt-4 space-y-3 text-sm text-white/70">
                    {output.editNotes.map((note) => (
                      <li key={note.focus} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{note.focus}</p>
                        <p className="mt-2 text-white/80">{note.note}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
                    <p className="text-xs uppercase tracking-widest text-white/50">Call to action</p>
                    <p className="mt-2 text-white">{output.callToAction}</p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="grid gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-lg font-semibold">Performance forecast</h2>
                <div className="mt-4 space-y-4">
                  {scoreGauge?.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                        <span>{item.label}</span>
                        <span className="text-white text-sm font-semibold">{item.score}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${item.accent}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-xs text-white/60">
                  Powered by retention heuristics + creator trend data patterns.
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-lg font-semibold">Production kit</h2>
                <div className="mt-4 space-y-4 text-sm text-white/70">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">Shots</p>
                    <ul className="mt-2 space-y-2">
                      {output.productionKit.shots.map((shot) => (
                        <li key={shot.label} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                          <span className="font-semibold text-white">{shot.label}</span>
                          <p className="text-xs text-white/60">{shot.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">Overlays</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {output.productionKit.overlays.map((overlay) => (
                        <span
                          key={overlay}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white"
                        >
                          {overlay}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Color palette</p>
                    <p className="mt-2 text-white">{output.productionKit.colorPalette}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Sound hook</p>
                    <p className="mt-2 text-white">{output.productionKit.sound}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Performance signal</p>
                    <p className="mt-2 text-white">{output.productionKit.performanceSignal}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-lg font-semibold">Strategy notes</h2>
                <div className="mt-3 space-y-4 text-sm text-white/70">
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Framework</p>
                    <p className="mt-2 text-white">{output.strategy.framework}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Driver</p>
                    <p className="mt-2 text-white">{output.strategy.driver}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Proof</p>
                    <p className="mt-2 text-white">{output.strategy.proof}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-white/50">Micro callouts</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-white/80">
                      {output.strategy.microCallouts.map((callout) => (
                        <li key={callout}>{callout}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {history.length > 1 ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h2 className="text-lg font-semibold">Recent recipes</h2>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    {history.slice(1).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setOutput(item)}
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-left transition hover:border-white/30 hover:text-white"
                      >
                        <p className="text-xs uppercase tracking-widest text-white/50">Hook</p>
                        <p className="mt-1 text-white/80">{item.hook}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </section>
        ) : (
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-white/60">
            <p className="text-base sm:text-lg">
              Craft your brief and hit <span className="text-white font-medium">Generate viral system</span> to get hook lines,
              beat maps, metadata and edit directives tuned for YouTube Shorts.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
