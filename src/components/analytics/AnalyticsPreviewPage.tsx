import { ArrowLeft, Clock, MapPin, Share2 } from "lucide-react";
import type { PrototypeScenario } from "../../types";
import { formatCount, truncateAssetTitle } from "../../lib/copy";
import { HomeNav } from "../home/HomeNav";

export function AnalyticsPreviewPage({
  scenario,
  onBack,
}: {
  scenario: PrototypeScenario;
  onBack: () => void;
}) {
  const noun = scenario.assetType === "qr_code" ? "scans" : "clicks";

  return (
    <div className="min-h-full bg-bitly-surface">
      <HomeNav />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-bitly-slate hover:text-bitly-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                className="truncate text-2xl font-semibold text-bitly-ink"
                title={scenario.assetTitle}
              >
                {truncateAssetTitle(scenario.assetTitle, 40)}
              </h1>
              <span className="flex-none rounded-pill bg-bitly-teal-tint px-2.5 py-1 text-xs font-semibold text-bitly-teal">
                {scenario.trialDays}-day trial active
              </span>
            </div>
            <p className="mt-1 text-sm text-bitly-slate-light">
              Analytics overview (prototype data)
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-card border border-bitly-line bg-white p-4 shadow-card">
            <p className="text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
              Total {noun}
            </p>
            <p className="mt-1 text-2xl font-semibold text-bitly-ink">
              {formatCount(scenario.engagementCount)}
            </p>
          </div>
          <div className="rounded-card border border-bitly-line bg-white p-4 shadow-card">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              Top referrer
            </div>
            <p className="mt-1 text-2xl font-semibold text-bitly-ink">Instagram</p>
          </div>
          <div className="rounded-card border border-bitly-line bg-white p-4 shadow-card">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Top location
            </div>
            <p className="mt-1 text-2xl font-semibold text-bitly-ink">Austin, TX</p>
          </div>
        </div>

        <div className="mt-4 rounded-card border border-bitly-line bg-white p-4 shadow-card">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-bitly-slate-light">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Engagement over time
          </div>
          <svg
            viewBox="0 0 400 120"
            className="mt-3 h-32 w-full"
            role="img"
            aria-label="Engagement trending upward over the last 7 days"
          >
            <polyline
              points="10,100 70,88 130,80 190,60 250,48 310,28 390,10"
              fill="none"
              stroke="#2A5BD7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
