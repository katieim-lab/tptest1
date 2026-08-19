import { useState } from "react";
import type { PrototypeScenario } from "../../types";
import { formatCount } from "../../lib/copy";

const CHART_POINTS = [
  { x: 0, y: 20 },
  { x: 40, y: 70 },
  { x: 80, y: 24 },
  { x: 120, y: 66 },
  { x: 400, y: 66 },
];
const CHART_D = `M${CHART_POINTS.map((p) => `${p.x},${p.y}`).join(" L")}`;
const CHART_FILL_D = `${CHART_D} L400,80 L0,80 Z`;
const X_LABELS = ["Jul 21", "Jul 25", "Jul 29", "Aug 03", "Aug 07", "Aug 11", "Aug 15", "Aug 19"];

const RANGES = ["1d", "7d", "30d"] as const;
type Range = (typeof RANGES)[number];

export function EngagementSummary({ scenario }: { scenario: PrototypeScenario }) {
  const [range, setRange] = useState<Range>("30d");
  const isQr = scenario.assetType === "qr_code";

  const stats = [
    {
      label: "Link clicks",
      value: isQr ? 1 : scenario.engagementCount,
      delta: isQr ? "no data" : null,
    },
    {
      label: "QR Code scans",
      value: isQr ? scenario.engagementCount : 0,
      delta: isQr ? null : "no data",
    },
    { label: "Page clicks", value: 1, delta: "↓ 50%" },
  ];

  return (
    <section
      aria-label="Engagement summary"
      className="rounded-card border border-bitly-line bg-white p-4 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-bitly-slate-light">Total engagements this month</p>
        <div className="inline-flex gap-0.5 rounded-pill bg-bitly-surface p-0.5">
          {RANGES.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={range === value}
              onClick={() => setRange(value)}
              className={
                "rounded-pill px-3 py-1 text-xs font-medium transition-colors " +
                (range === value
                  ? "bg-white text-bitly-ink shadow-card"
                  : "text-bitly-slate-light hover:text-bitly-ink")
              }
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-1 text-2xl font-semibold text-bitly-ink">
        {formatCount(scenario.engagementCount)}{" "}
        <span className="text-sm font-normal text-bitly-slate-light">
          — 0% vs {formatCount(scenario.engagementCount)} last month
        </span>
      </p>

      <svg viewBox="0 0 400 80" className="mt-3 h-24 w-full" role="img" aria-hidden="true">
        <path d={CHART_FILL_D} fill="#EDF2FF" stroke="none" />
        <path
          d={CHART_D}
          fill="none"
          stroke="#2A5BD7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex justify-between text-[11px] text-bitly-slate-light">
        {X_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 border-t border-bitly-line pt-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
              {stat.label}
            </p>
            <p className="mt-1 text-xl font-semibold text-bitly-ink">
              {formatCount(stat.value)}{" "}
              <span
                className={
                  "text-sm font-normal " +
                  (stat.delta === "no data" ? "text-bitly-slate-light" : "text-bitly-danger")
                }
              >
                {stat.delta ? `— ${stat.delta}` : null}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
