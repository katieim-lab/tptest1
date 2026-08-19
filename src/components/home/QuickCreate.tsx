import { useState } from "react";
import { Link2, QrCode, HelpCircle } from "lucide-react";

type QuickCreateTab = "short-link" | "qr-code";

export function QuickCreate() {
  const [tab, setTab] = useState<QuickCreateTab>("short-link");

  return (
    <section aria-label="Quick create">
      <div className="flex justify-center">
        <div className="inline-flex gap-1 rounded-pill bg-bitly-surface p-1">
          {(
            [
              { value: "short-link", label: "Short link", icon: Link2 },
              { value: "qr-code", label: "QR Code", icon: QrCode },
            ] as const
          ).map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={tab === value}
              onClick={() => setTab(value)}
              className={
                "flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm font-medium transition-colors " +
                (tab === value
                  ? "bg-white text-bitly-ink shadow-card"
                  : "text-bitly-slate hover:text-bitly-ink")
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="-mt-4 rounded-card border border-bitly-line bg-white p-6 pt-8 shadow-card">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-bitly-ink">
            Quick create: {tab === "short-link" ? "Short link" : "QR Code"}
          </h2>
          <p className="flex items-center gap-1.5 text-sm text-bitly-slate-light">
            You can create <span className="font-semibold text-bitly-ink">9,999</span> more{" "}
            {tab === "short-link" ? "links" : "codes"} this month.
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="font-medium text-bitly-ink">Domain:</span>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md border border-bitly-line px-2 py-1 font-semibold text-bitly-ink hover:bg-bitly-surface"
          >
            bit.ly
          </button>
        </div>

        <label className="mt-4 block text-sm font-medium text-bitly-ink" htmlFor="quick-create-url">
          Enter your destination URL
        </label>
        <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
          <input
            id="quick-create-url"
            type="url"
            placeholder="https://example.com/my-long-url"
            className="flex-1 rounded-lg border border-bitly-line px-3 py-2.5 text-sm text-bitly-ink placeholder:text-bitly-slate-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-primary"
          />
          <button
            type="button"
            className="rounded-lg bg-bitly-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bitly-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-primary-dark"
          >
            Create your Bitly link
          </button>
        </div>

        <label className="mt-3 flex items-center gap-2 text-sm text-bitly-slate">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-bitly-line text-bitly-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-primary"
          />
          Also create a QR Code for this link
        </label>
      </div>
    </section>
  );
}
