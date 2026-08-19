import { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { NotificationFeed } from "./NotificationFeed";

export function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="relative flex h-16 flex-none items-center justify-between border-b border-bitly-line bg-white px-6">
      <div className="hidden items-center gap-2 rounded-pill border border-bitly-line bg-bitly-surface px-3 py-1.5 text-sm text-bitly-slate-light md:flex">
        <Search className="h-4 w-4" aria-hidden="true" />
        <span>Search...</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications: 1 unread"
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            onClick={() => setNotificationsOpen((open) => !open)}
            className="relative rounded-full p-2 text-bitly-slate hover:bg-bitly-surface"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bitly-danger text-[10px] font-semibold text-white"
              aria-hidden="true"
            >
              1
            </span>
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-[448px] max-w-[90vw]">
              <NotificationFeed />
            </div>
          )}
        </div>
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
