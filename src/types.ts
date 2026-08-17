export type ModalConcept = "performance-first" | "trial-first";

export type AssetType = "link" | "qr_code";

export type PrototypeScenario = {
  id: string;
  label: string;
  assetType: AssetType;
  assetTitle: string;
  engagementCount: number;
  trialDays: number;
};

export type AnalyticsTrialModalProps = {
  concept: ModalConcept;
  scenario: PrototypeScenario;
  isOpen: boolean;
  animationKey: number;
  onClose: () => void;
  onPrimaryAction: () => void;
  /** Confines the modal portal to the simulated viewport frame instead of document.body. */
  container?: HTMLElement | null;
};

export type ViewportPreview = "desktop" | "mobile";

export type AppView = "home" | "analytics";
