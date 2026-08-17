import { useState } from "react";
import type { AppView, ModalConcept, ViewportPreview } from "./types";
import { DEFAULT_SCENARIO_ID, getScenarioById } from "./lib/scenarios";
import { HomeScreen } from "./components/home/HomeScreen";
import { AnalyticsPreviewPage } from "./components/analytics/AnalyticsPreviewPage";
import { AnalyticsTrialModal } from "./components/modal/AnalyticsTrialModal";
import { PrototypeToolbar } from "./components/toolbar/PrototypeToolbar";

export default function App() {
  const [concept, setConcept] = useState<ModalConcept>("performance-first");
  const [scenarioId, setScenarioId] = useState(DEFAULT_SCENARIO_ID);
  const [isOpen, setIsOpen] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [viewport, setViewport] = useState<ViewportPreview>("desktop");
  const [view, setView] = useState<AppView>("home");
  const [stageNode, setStageNode] = useState<HTMLDivElement | null>(null);

  const scenario = getScenarioById(scenarioId);

  function handleConceptChange(next: ModalConcept) {
    setConcept(next);
    setAnimationKey((key) => key + 1);
  }

  function handleScenarioChange(id: string) {
    setScenarioId(id);
    setAnimationKey((key) => key + 1);
  }

  function handleReplay() {
    setAnimationKey((key) => key + 1);
  }

  function handleToggleModal() {
    setIsOpen((prev) => !prev);
    setAnimationKey((key) => key + 1);
  }

  function handlePrimaryAction() {
    setIsOpen(false);
    setView("analytics");
  }

  function handleBackToHome() {
    setView("home");
  }

  const stageClassName =
    viewport === "mobile"
      ? "relative mx-auto my-8 h-[780px] w-[390px] overflow-y-auto rounded-[2rem] border-[10px] border-bitly-ink bg-white shadow-modal"
      : "relative min-h-screen w-full overflow-y-auto";

  return (
    <div className="min-h-screen bg-bitly-surface">
      <div className="pr-72">
        <div ref={setStageNode} className={stageClassName}>
          {view === "home" ? (
            <HomeScreen scenario={scenario} />
          ) : (
            <AnalyticsPreviewPage scenario={scenario} onBack={handleBackToHome} />
          )}
          {stageNode && (
            <AnalyticsTrialModal
              concept={concept}
              scenario={scenario}
              isOpen={isOpen}
              animationKey={animationKey}
              onClose={() => setIsOpen(false)}
              onPrimaryAction={handlePrimaryAction}
              container={stageNode}
            />
          )}
        </div>
      </div>
      <PrototypeToolbar
        concept={concept}
        onConceptChange={handleConceptChange}
        scenarioId={scenarioId}
        onScenarioChange={handleScenarioChange}
        isModalOpen={isOpen}
        onToggleModal={handleToggleModal}
        onReplay={handleReplay}
        viewport={viewport}
        onViewportChange={setViewport}
      />
    </div>
  );
}
