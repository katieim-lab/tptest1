import { Monitor, RotateCcw, Smartphone } from "lucide-react";
import type { ModalConcept, ViewportPreview } from "../../types";
import { SCENARIOS } from "../../lib/scenarios";

type PrototypeToolbarProps = {
  concept: ModalConcept;
  onConceptChange: (concept: ModalConcept) => void;
  scenarioId: string;
  onScenarioChange: (id: string) => void;
  isModalOpen: boolean;
  onToggleModal: () => void;
  onReplay: () => void;
  viewport: ViewportPreview;
  onViewportChange: (viewport: ViewportPreview) => void;
};

export function PrototypeToolbar({
  concept,
  onConceptChange,
  scenarioId,
  onScenarioChange,
  isModalOpen,
  onToggleModal,
  onReplay,
  viewport,
  onViewportChange,
}: PrototypeToolbarProps) {
  return (
    <aside
      aria-label="Prototype review controls"
      data-testid="prototype-toolbar"
      data-prototype-toolbar="true"
      className="pointer-events-auto fixed inset-y-0 right-0 z-[60] flex w-72 flex-col gap-5 overflow-y-auto border-l border-black/20 bg-[#14151f] p-4 font-sans text-white shadow-toolbar"
      style={{ pointerEvents: "auto" }}
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
          Prototype controls
        </p>
        <p className="mt-0.5 text-xs text-white/40">Not part of the Bitly product UI</p>
      </div>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-white/60">
          Concept
        </legend>
        <div className="mt-2 flex flex-col gap-1.5">
          {(
            [
              { value: "performance-first", label: "Option A: Performance first" },
              { value: "trial-first", label: "Option B: Trial first" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={concept === option.value}
              onClick={() => onConceptChange(option.value)}
              className={
                "rounded-card border px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
                (concept === option.value
                  ? "border-white bg-white text-[#14151f]"
                  : "border-white/20 bg-transparent text-white hover:bg-white/10")
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-white/60">
          Scenario
        </legend>
        <div className="mt-2 flex flex-col gap-1.5">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={scenarioId === scenario.id}
              onClick={() => onScenarioChange(scenario.id)}
              className={
                "rounded-card border px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
                (scenarioId === scenario.id
                  ? "border-white bg-white text-[#14151f]"
                  : "border-white/20 bg-transparent text-white hover:bg-white/10")
              }
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={onReplay}
          disabled={!isModalOpen}
          className="flex items-center justify-center gap-2 rounded-card border border-white/20 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Replay animation
        </button>
        <button
          type="button"
          onClick={onToggleModal}
          className="rounded-card border border-white/20 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isModalOpen ? "Close modal" : "Reopen modal"}
        </button>
      </div>

      <fieldset className="border-t border-white/10 pt-4">
        <legend className="text-xs font-semibold uppercase tracking-wide text-white/60">
          Preview viewport
        </legend>
        <div className="mt-2 flex gap-1.5">
          <button
            type="button"
            aria-pressed={viewport === "desktop"}
            onClick={() => onViewportChange("desktop")}
            className={
              "flex flex-1 items-center justify-center gap-1.5 rounded-card border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
              (viewport === "desktop"
                ? "border-white bg-white text-[#14151f]"
                : "border-white/20 bg-transparent text-white hover:bg-white/10")
            }
          >
            <Monitor className="h-4 w-4" aria-hidden="true" />
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={viewport === "mobile"}
            onClick={() => onViewportChange("mobile")}
            className={
              "flex flex-1 items-center justify-center gap-1.5 rounded-card border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
              (viewport === "mobile"
                ? "border-white bg-white text-[#14151f]"
                : "border-white/20 bg-transparent text-white hover:bg-white/10")
            }
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Mobile
          </button>
        </div>
      </fieldset>
    </aside>
  );
}
