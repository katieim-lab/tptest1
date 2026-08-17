import type { PrototypeScenario } from "../types";

export const SCENARIOS: PrototypeScenario[] = [
  {
    id: "link-14",
    label: "Link · 14 clicks (default)",
    assetType: "link",
    assetTitle: "Summer campaign",
    engagementCount: 14,
    trialDays: 7,
  },
  {
    id: "qr-9",
    label: "QR Code · 9 scans",
    assetType: "qr_code",
    assetTitle: "Farmers market flyer",
    engagementCount: 9,
    trialDays: 7,
  },
  {
    id: "link-47",
    label: "Link · 47 clicks",
    assetType: "link",
    assetTitle: "Summer campaign",
    engagementCount: 47,
    trialDays: 7,
  },
  {
    id: "link-1250",
    label: "Link · 1,250 clicks",
    assetType: "link",
    assetTitle: "Summer campaign",
    engagementCount: 1250,
    trialDays: 7,
  },
];

export const DEFAULT_SCENARIO_ID = SCENARIOS[0].id;

export function getScenarioById(id: string): PrototypeScenario {
  return SCENARIOS.find((scenario) => scenario.id === id) ?? SCENARIOS[0];
}
