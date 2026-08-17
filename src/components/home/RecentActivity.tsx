import { Link2, QrCode } from "lucide-react";
import type { PrototypeScenario } from "../../types";
import { formatCount, truncateAssetTitle } from "../../lib/copy";

const STATIC_ITEMS = [
  { title: "Product launch teaser", assetType: "link" as const, count: 132, when: "2 days ago" },
  { title: "Newsletter signup", assetType: "link" as const, count: 58, when: "5 days ago" },
  { title: "Store locator", assetType: "qr_code" as const, count: 21, when: "1 week ago" },
];

export function RecentActivity({ scenario }: { scenario: PrototypeScenario }) {
  return (
    <section
      aria-label="Recent activity"
      className="rounded-card border border-bitly-line bg-white shadow-card"
    >
      <div className="flex items-center justify-between border-b border-bitly-line px-4 py-3">
        <h2 className="text-sm font-semibold text-bitly-ink">Recent activity</h2>
        <span className="text-xs text-bitly-slate-light">Last 7 days</span>
      </div>
      <ul>
        <li className="flex items-center gap-3 border-b border-bitly-line px-4 py-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-card bg-bitly-teal-tint text-bitly-teal">
            {scenario.assetType === "qr_code" ? (
              <QrCode className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Link2 className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span
                className="truncate text-sm font-medium text-bitly-ink"
                title={scenario.assetTitle}
                aria-label={scenario.assetTitle}
              >
                {truncateAssetTitle(scenario.assetTitle)}
              </span>
              <span className="flex-none rounded-pill bg-bitly-orange-tint px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-bitly-orange-dark">
                Trial ready
              </span>
            </span>
            <span className="block text-xs text-bitly-slate-light">Just now</span>
          </span>
          <span className="flex-none text-sm font-semibold text-bitly-ink">
            {formatCount(scenario.engagementCount)}{" "}
            {scenario.assetType === "qr_code" ? "scans" : "clicks"}
          </span>
        </li>
        {STATIC_ITEMS.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-3 border-b border-bitly-line px-4 py-3 last:border-b-0"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-card bg-bitly-surface text-bitly-slate">
              {item.assetType === "qr_code" ? (
                <QrCode className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Link2 className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-bitly-ink">
                {item.title}
              </span>
              <span className="block text-xs text-bitly-slate-light">{item.when}</span>
            </span>
            <span className="flex-none text-sm font-semibold text-bitly-ink">
              {formatCount(item.count)} {item.assetType === "qr_code" ? "scans" : "clicks"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
