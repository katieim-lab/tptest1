import type { PrototypeScenario } from "../../types";
import { formatCount } from "../../lib/copy";

export function PerformanceSummary({ scenario }: { scenario: PrototypeScenario }) {
  const stats = [
    { label: "Total clicks this month", value: "3,482" },
    { label: "Active links", value: "12" },
    { label: "Top performing", value: scenario.assetTitle },
  ];

  return (
    <section aria-label="Performance summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-card border border-bitly-line bg-white p-4 shadow-card"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
            {stat.label}
          </p>
          <p className="mt-1 truncate text-xl font-semibold text-bitly-ink">{stat.value}</p>
        </div>
      ))}
      <div className="col-span-full rounded-card border border-bitly-line bg-white p-4 shadow-card">
        <p className="text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
          {scenario.assetTitle} engagement
        </p>
        <p className="mt-1 text-xl font-semibold text-bitly-ink">
          {formatCount(scenario.engagementCount)}{" "}
          {scenario.assetType === "qr_code" ? "scans" : "clicks"}
        </p>
      </div>
    </section>
  );
}
