import { Clock, MapPin, Share2 } from "lucide-react";
import type { AssetType } from "../../types";
import { engagementPhrase } from "../../lib/copy";

const POINTS = [
  { x: 10, y: 58 },
  { x: 50, y: 50 },
  { x: 90, y: 42 },
  { x: 130, y: 36 },
  { x: 170, y: 22 },
  { x: 210, y: 12 },
];

const PATH_D = `M${POINTS.map((point) => `${point.x},${point.y}`).join(" L")}`;
const FINAL_POINT = POINTS[POINTS.length - 1];

type EngagementChartProps = {
  assetType: AssetType;
  engagementCount: number;
  reduceMotion: boolean;
};

export function EngagementChart({
  assetType,
  engagementCount,
  reduceMotion,
}: EngagementChartProps) {
  const both = "[animation-fill-mode:both]";

  return (
    <div className="rounded-card border border-bitly-line bg-bitly-surface p-4">
      <div className="relative">
        <svg
          viewBox="0 0 220 72"
          className="h-24 w-full overflow-visible"
          role="img"
          aria-label={`Chart showing ${engagementPhrase(assetType, engagementCount)} trending upward`}
        >
          <path
            d={PATH_D}
            fill="none"
            stroke="#2A5BD7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={
              reduceMotion
                ? { strokeDasharray: 1, strokeDashoffset: 0 }
                : { strokeDasharray: 1, strokeDashoffset: 1 }
            }
            className={reduceMotion ? "" : `animate-chart-draw ${both}`}
            aria-hidden="true"
          />
          {POINTS.map((point, index) => {
            const isFinal = index === POINTS.length - 1;
            const delayMs = 250 + index * 130;
            return (
              <circle
                key={`${point.x}-${point.y}`}
                cx={point.x}
                cy={point.y}
                r={isFinal ? 5 : 3.5}
                fill={isFinal ? "#2A5BD7" : "#9DB8F8"}
                aria-hidden="true"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        animationDelay: `${delayMs}ms`,
                        transformOrigin: `${point.x}px ${point.y}px`,
                      }
                }
                className={reduceMotion ? "" : `animate-pop-in ${both}`}
              />
            );
          })}
          {!reduceMotion && (
            <circle
              cx={FINAL_POINT.x}
              cy={FINAL_POINT.y}
              r={5}
              fill="none"
              stroke="#2A5BD7"
              strokeWidth="2"
              aria-hidden="true"
              style={{
                animationDelay: "950ms",
                transformOrigin: `${FINAL_POINT.x}px ${FINAL_POINT.y}px`,
              }}
              className={`animate-pulse-ring ${both}`}
            />
          )}
        </svg>
      </div>

      <div
        className={reduceMotion ? "" : `animate-count-in ${both}`}
        style={reduceMotion ? undefined : { animationDelay: "900ms" }}
      >
        <p className="text-2xl font-semibold text-bitly-ink">
          {engagementPhrase(assetType, engagementCount)}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {[
          { icon: Share2, label: "Top referrer", value: "Instagram" },
          { icon: MapPin, label: "Location", value: "Austin, TX" },
          { icon: Clock, label: "Peak time", value: "6–8pm" },
        ].map(({ icon: Icon, label, value }, index) => (
          <div
            key={label}
            className={
              "flex items-center gap-1.5 text-xs text-bitly-slate " +
              (reduceMotion ? "" : `animate-fade-up ${both}`)
            }
            style={reduceMotion ? undefined : { animationDelay: `${1150 + index * 100}ms` }}
          >
            <Icon className="h-3.5 w-3.5 text-bitly-slate-light" aria-hidden="true" />
            <span className="font-medium text-bitly-ink">{value}</span>
            <span className="sr-only">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
