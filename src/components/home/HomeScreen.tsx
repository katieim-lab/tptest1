import type { PrototypeScenario } from "../../types";
import { HomeNav } from "./HomeNav";
import { QuickCreate } from "./QuickCreate";
import { RecentActivity } from "./RecentActivity";
import { PerformanceSummary } from "./PerformanceSummary";

export function HomeScreen({ scenario }: { scenario: PrototypeScenario }) {
  return (
    <div className="min-h-full bg-bitly-surface">
      <HomeNav />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-bitly-ink">Good afternoon, Jordan</h1>
        <p className="mt-1 text-sm text-bitly-slate-light">
          Here&rsquo;s what&rsquo;s happening with your links today.
        </p>

        <div className="mt-6">
          <QuickCreate />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <RecentActivity scenario={scenario} />
          <PerformanceSummary scenario={scenario} />
        </div>
      </main>
    </div>
  );
}
