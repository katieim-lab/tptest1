import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { AnalyticsTrialModalProps } from "../../types";
import { getModalCopy, truncateAssetTitle } from "../../lib/copy";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EngagementChart } from "./EngagementChart";
import { InsightTiles } from "./InsightTiles";

export function AnalyticsTrialModal({
  concept,
  scenario,
  isOpen,
  animationKey,
  onClose,
  onPrimaryAction,
  container,
}: AnalyticsTrialModalProps) {
  const reduceMotion = usePrefersReducedMotion();
  const copy = getModalCopy(concept, scenario);
  const visualKey = `${concept}-${scenario.id}-${animationKey}`;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="absolute inset-0 z-40 rounded-[inherit] bg-bitly-ink/50" />
        <Dialog.Content
          className="absolute left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-modal bg-white p-6 shadow-modal focus:outline-none sm:p-8"
          onInteractOutside={(event) => {
            const target = event.target;
            if (target instanceof Element && target.closest("[data-prototype-toolbar]")) {
              event.preventDefault();
            }
          }}
        >
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-bitly-slate-light hover:bg-bitly-surface hover:text-bitly-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-orange"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </Dialog.Close>

          <p className="pr-8 text-xs font-semibold uppercase tracking-wide text-bitly-orange-dark">
            {copy.eyebrow}
          </p>
          <Dialog.Title className="mt-1 pr-8 text-xl font-semibold text-bitly-ink sm:text-2xl">
            {copy.headline}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-bitly-slate">
            {copy.body}
          </Dialog.Description>

          {copy.assetContext && (
            <p className="mt-2 text-sm text-bitly-slate-light">
              {copy.assetContext.split(":")[0]}:{" "}
              <span
                title={scenario.assetTitle}
                aria-label={scenario.assetTitle}
                className="font-medium text-bitly-ink"
              >
                {truncateAssetTitle(scenario.assetTitle)}
              </span>
            </p>
          )}

          <div key={visualKey} className="mt-4">
            {concept === "performance-first" ? (
              <EngagementChart
                assetType={scenario.assetType}
                engagementCount={scenario.engagementCount}
                reduceMotion={reduceMotion}
              />
            ) : (
              <InsightTiles
                assetType={scenario.assetType}
                assetTitle={scenario.assetTitle}
                engagementCount={scenario.engagementCount}
                trialDays={scenario.trialDays}
                reduceMotion={reduceMotion}
              />
            )}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-sm font-medium text-bitly-slate hover:text-bitly-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-orange"
              >
                {copy.secondaryAction}
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={onPrimaryAction}
              className="w-full rounded-pill bg-bitly-orange px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-bitly-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitly-orange-dark sm:w-auto"
            >
              {copy.primaryCta}
            </button>
          </div>

          <p className="mt-4 text-xs text-bitly-slate-light">{copy.supportingNote}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
