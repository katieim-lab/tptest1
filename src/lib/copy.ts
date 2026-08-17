import type { AssetType, ModalConcept, PrototypeScenario } from "../types";

export function engagementNoun(assetType: AssetType, count: number): string {
  const singular = assetType === "qr_code" ? "scan" : "click";
  return count === 1 ? singular : `${singular}s`;
}

export function displayAssetType(assetType: AssetType): string {
  return assetType === "qr_code" ? "QR Code" : "link";
}

export function formatCount(count: number): string {
  return count.toLocaleString();
}

export function engagementPhrase(assetType: AssetType, count: number): string {
  return `${formatCount(count)} ${engagementNoun(assetType, count)}`;
}

export function truncateAssetTitle(title: string, maxLength = 28): string {
  if (title.length <= maxLength) return title;
  return `${title.slice(0, maxLength - 1).trimEnd()}…`;
}

export type ModalCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  assetContext: string | null;
  primaryCta: string;
  secondaryAction: string;
  supportingNote: string;
};

export function getModalCopy(concept: ModalConcept, scenario: PrototypeScenario): ModalCopy {
  const hasAsset = Boolean(scenario.assetTitle) && scenario.engagementCount != null;
  const phrase = engagementPhrase(scenario.assetType, scenario.engagementCount);

  if (!hasAsset) {
    return {
      eyebrow:
        concept === "performance-first"
          ? "Your 7-day Analytics trial is ready"
          : "Limited-time access",
      headline: "People are engaging with your content",
      body: `You've received ${formatCount(scenario.engagementCount)} engagements. Explore where they came from and see how your performance is trending.`,
      assetContext: null,
      primaryCta: concept === "performance-first" ? "Explore my analytics" : "Start exploring",
      secondaryAction: concept === "performance-first" ? "Maybe later" : "Not now",
      supportingNote:
        concept === "performance-first"
          ? "Free for 7 days. No payment information required."
          : "No payment information required. Your trial has already been activated.",
    };
  }

  if (concept === "performance-first") {
    return {
      eyebrow: "Your 7-day Analytics trial is ready",
      headline:
        scenario.assetType === "qr_code"
          ? "Your QR Code is getting scanned"
          : "Your link is getting attention",
      body: `Your ${displayAssetType(scenario.assetType)} has received ${phrase}. See where your audience came from, when they engaged, and how your performance is trending.`,
      assetContext: `Activity for: ${scenario.assetTitle}`,
      primaryCta: "Explore my analytics",
      secondaryAction: "Maybe later",
      supportingNote: "Free for 7 days. No payment information required.",
    };
  }

  return {
    eyebrow: "Limited-time access",
    headline: "Try Bitly Analytics free for 7 days",
    body: `You've already received ${phrase}. Your free trial lets you see which content is performing, where your audience came from, and how engagement changes over time.`,
    assetContext: `Based on activity for: ${scenario.assetTitle}`,
    primaryCta: "Start exploring",
    secondaryAction: "Not now",
    supportingNote: "No payment information required. Your trial has already been activated.",
  };
}
