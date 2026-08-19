import type { PrototypeScenario } from "../../types";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { QuickCreate } from "./QuickCreate";
import { EngagementSummary } from "./EngagementSummary";

export function HomeScreen({ scenario }: { scenario: PrototypeScenario }) {
  return (
    <div className="flex min-h-full bg-bitly-surface">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar scenario={scenario} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
          <QuickCreate />

          <div className="mt-6">
            <EngagementSummary scenario={scenario} />
          </div>
        </main>
      </div>
    </div>
  );
}
