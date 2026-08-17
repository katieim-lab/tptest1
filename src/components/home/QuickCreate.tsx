import { Link2, QrCode, LayoutTemplate } from "lucide-react";

const ACTIONS = [
  { label: "Shorten a link", description: "Paste a long URL to get started", icon: Link2 },
  { label: "Create a QR Code", description: "Generate a scannable code", icon: QrCode },
  { label: "Build a landing page", description: "Combine links in one page", icon: LayoutTemplate },
];

export function QuickCreate() {
  return (
    <section aria-label="Quick create actions" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {ACTIONS.map(({ label, description, icon: Icon }) => (
        <button
          key={label}
          type="button"
          className="flex items-start gap-3 rounded-card border border-bitly-line bg-white p-4 text-left shadow-card transition-shadow hover:shadow-modal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-orange"
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-card bg-bitly-orange-tint text-bitly-orange-dark">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-bitly-ink">{label}</span>
            <span className="block text-sm text-bitly-slate-light">{description}</span>
          </span>
        </button>
      ))}
    </section>
  );
}
