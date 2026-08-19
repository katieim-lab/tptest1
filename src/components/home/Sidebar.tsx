import {
  Home,
  Link2,
  QrCode,
  FileText,
  BarChart3,
  Megaphone,
  Globe,
  Blocks,
  Settings,
} from "lucide-react";
import { BitlyLogo } from "./BitlyLogo";

const NAV_ITEMS = [
  { label: "Home", icon: Home, active: true },
  { label: "Links", icon: Link2 },
  { label: "QR Codes", icon: QrCode },
  { label: "Pages", icon: FileText },
  { label: "Analytics", icon: BarChart3 },
  { label: "Campaigns", icon: Megaphone },
  { label: "Custom domains", icon: Globe },
  { label: "Integrations", icon: Blocks },
];

export function Sidebar() {
  return (
    <aside className="hidden w-60 flex-none flex-col gap-4 border-r border-bitly-line bg-white p-4 md:flex">
      <BitlyLogo />

      <button
        type="button"
        className="rounded-lg bg-bitly-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bitly-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-primary"
      >
        Create new
      </button>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            aria-current={active ? "page" : undefined}
            className={
              "flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-2 text-sm font-medium transition-colors " +
              (active
                ? "border-bitly-primary bg-bitly-primary-tint text-bitly-primary"
                : "border-transparent text-bitly-ink hover:bg-bitly-surface")
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="flex items-center gap-3 rounded-lg border-l-[3px] border-transparent px-3 py-2 text-sm font-medium text-bitly-ink hover:bg-bitly-surface"
      >
        <Settings className="h-4 w-4" aria-hidden="true" />
        Settings
      </button>
    </aside>
  );
}
