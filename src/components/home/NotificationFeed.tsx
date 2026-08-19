import { ArrowRight, Lightbulb, MoreHorizontal, Trophy, type LucideIcon } from "lucide-react";

type Notification = {
  icon: LucideIcon;
  title: string;
  time: string;
  unread: boolean;
  description: string;
  actionLabel: string;
};

const NEW_NOTIFICATIONS: Notification[] = [
  {
    icon: Trophy,
    title: "Your link just hit 100 clicks.",
    time: "1h",
    unread: true,
    description: "See who's clicking and where they're coming from.",
    actionLabel: "See your stats",
  },
  {
    icon: Lightbulb,
    title: "Claim your free custom domain.",
    time: "2d",
    unread: true,
    description:
      "Your plan includes a custom domain — and links with one get 2.3x more clicks. Pick yours and make every link yours.",
    actionLabel: "Claim your domain",
  },
];

const EARLIER_NOTIFICATIONS: Notification[] = [
  {
    icon: Lightbulb,
    title: "Shorten anything, anywhere.",
    time: "2d",
    unread: false,
    description: "Add the Bitly Chrome extension and shorten links from any page in one click.",
    actionLabel: "Add to Chrome",
  },
];

function NotificationRow({ notification }: { notification: Notification }) {
  const Icon = notification.icon;
  return (
    <div className="flex w-full flex-col gap-2 border-b border-bitly-line p-4">
      <div className="flex w-full items-start gap-2">
        <Icon className="h-6 w-6 flex-none text-bitly-ink" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-semibold text-bitly-ink">{notification.title}</p>
            <p className="flex-none whitespace-nowrap text-xs text-bitly-slate">
              {notification.time}
            </p>
          </div>
          <p className="text-bitly-body">{notification.description}</p>
        </div>
        <div className="flex flex-none self-stretch pt-2.5">
          {notification.unread && (
            <span
              className="h-2 w-2 rounded-full bg-bitly-primary"
              aria-label="Unread"
              role="status"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="flex items-center gap-1 pl-8 text-sm font-medium text-bitly-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-primary"
      >
        {notification.actionLabel}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function NotificationFeed() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-bitly-line bg-white shadow-modal">
      <div className="flex items-start justify-between px-6 pb-4 pt-6">
        <h2 className="text-xl font-semibold text-bitly-ink">Notifications</h2>
        <button
          type="button"
          aria-label="Notification options"
          className="rounded-full p-1 text-bitly-primary hover:bg-bitly-surface"
        >
          <MoreHorizontal className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="border-t border-bitly-line" />

      <div className="max-h-[420px] overflow-y-auto">
        <p className="px-6 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-bitly-slate">
          New ({NEW_NOTIFICATIONS.length})
        </p>
        {NEW_NOTIFICATIONS.map((notification) => (
          <NotificationRow key={notification.title} notification={notification} />
        ))}

        <p className="px-6 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-bitly-slate">
          Earlier ({EARLIER_NOTIFICATIONS.length})
        </p>
        {EARLIER_NOTIFICATIONS.map((notification) => (
          <NotificationRow key={notification.title} notification={notification} />
        ))}
      </div>
    </div>
  );
}
