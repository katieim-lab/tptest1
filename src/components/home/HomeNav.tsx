import { Bell, ChevronDown, Search } from "lucide-react";
import { BitlyLogo } from "./BitlyLogo";

const NAV_ITEMS = ["Home", "Links", "QR Codes", "Analytics", "Campaigns"];

export function HomeNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-bitly-line bg-white px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <BitlyLogo />
          <span className="text-lg font-semibold tracking-tight text-bitly-ink">bitly</span>
        </div>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              type="button"
              className={
                "rounded-card px-3 py-2 text-sm font-medium transition-colors " +
                (index === 0
                  ? "bg-bitly-primary-tint text-bitly-primary"
                  : "text-bitly-slate hover:bg-bitly-surface hover:text-bitly-ink")
              }
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-pill border border-bitly-line bg-bitly-surface px-3 py-1.5 text-sm text-bitly-slate-light md:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Search links</span>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-bitly-slate hover:bg-bitly-surface"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-bitly-primary"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-pill border border-bitly-line py-1 pl-1 pr-2 hover:bg-bitly-surface"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bitly-teal text-xs font-semibold text-white">
            JR
          </span>
          <ChevronDown className="h-4 w-4 text-bitly-slate-light" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
