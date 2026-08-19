import type { AssetType } from "../../types";
import { engagementPhrase } from "../../lib/copy";

const SPARK_D = "M2,20 L14,15 L26,17 L38,9 L50,11 L62,3";

type InsightTilesProps = {
  assetType: AssetType;
  assetTitle: string;
  engagementCount: number;
  trialDays: number;
  reduceMotion: boolean;
};

export function InsightTiles({
  assetType,
  assetTitle,
  engagementCount,
  trialDays,
  reduceMotion,
}: InsightTilesProps) {
  const both = "[animation-fill-mode:both]";

  const tiles = [
    { label: "Top content", value: assetTitle },
    { label: "Top location", value: "Austin, TX" },
    { label: "Top referrer", value: "Instagram" },
  ];

  return (
    <div
      className={
        "rounded-card border border-bitly-line bg-bitly-surface p-4 " +
        (reduceMotion ? "" : `animate-fade-up ${both}`)
      }
    >
      <div className="flex items-center justify-between">
        <div className={reduceMotion ? "" : `animate-count-in ${both}`}>
          <p className="text-2xl font-semibold text-bitly-ink">
            {engagementPhrase(assetType, engagementCount)}
          </p>
        </div>
        <span className="flex-none rounded-pill bg-bitly-teal-tint px-2.5 py-1 text-xs font-semibold text-bitly-teal">
          {trialDays} days free
        </span>
      </div>

      <svg
        viewBox="0 0 64 24"
        className="mt-2 h-6 w-16 overflow-visible"
        role="img"
        aria-label="Engagement trending upward over time"
      >
        <path
          d={SPARK_D}
          fill="none"
          stroke="#00A2B4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={
            reduceMotion
              ? { strokeDasharray: 1, strokeDashoffset: 0 }
              : { strokeDasharray: 1, strokeDashoffset: 1, animationDelay: "150ms" }
          }
          className={reduceMotion ? "" : `animate-chart-draw ${both}`}
          aria-hidden="true"
        />
      </svg>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {tiles.map((tile, index) => (
          <div
            key={tile.label}
            className={
              "rounded-card border border-bitly-line bg-white px-3 py-2 " +
              (reduceMotion ? "" : `animate-fade-up ${both}`)
            }
            style={reduceMotion ? undefined : { animationDelay: `${500 + index * 150}ms` }}
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-bitly-slate-light">
              {tile.label}
            </p>
            <p className="truncate text-sm font-semibold text-bitly-ink" title={tile.value}>
              {tile.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
