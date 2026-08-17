import { describe, expect, it } from "vitest";
import { engagementNoun, formatCount, getModalCopy, truncateAssetTitle } from "../lib/copy";
import type { PrototypeScenario } from "../types";

const linkScenario: PrototypeScenario = {
  id: "link-14",
  label: "Link · 14 clicks",
  assetType: "link",
  assetTitle: "Summer campaign",
  engagementCount: 14,
  trialDays: 7,
};

const qrScenario: PrototypeScenario = {
  ...linkScenario,
  id: "qr-9",
  assetType: "qr_code",
  assetTitle: "Farmers market flyer",
  engagementCount: 9,
};

describe("engagementNoun", () => {
  it("uses singular click for a single link engagement", () => {
    expect(engagementNoun("link", 1)).toBe("click");
  });

  it("uses plural clicks for a link", () => {
    expect(engagementNoun("link", 47)).toBe("clicks");
  });

  it("uses singular scan for a single QR engagement", () => {
    expect(engagementNoun("qr_code", 1)).toBe("scan");
  });

  it("uses plural scans for a QR code", () => {
    expect(engagementNoun("qr_code", 9)).toBe("scans");
  });
});

describe("formatCount", () => {
  it("formats large numbers with locale separators", () => {
    expect(formatCount(1250)).toBe((1250).toLocaleString());
  });
});

describe("truncateAssetTitle", () => {
  it("leaves short titles untouched", () => {
    expect(truncateAssetTitle("Summer campaign")).toBe("Summer campaign");
  });

  it("truncates long titles with an ellipsis", () => {
    const long = "A very long asset title that should not fit inline";
    const result = truncateAssetTitle(long, 20);
    expect(result.length).toBeLessThanOrEqual(20);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("getModalCopy", () => {
  it("builds performance-first copy for a link", () => {
    const copy = getModalCopy("performance-first", linkScenario);
    expect(copy.eyebrow).toBe("Your 7-day Analytics trial is ready");
    expect(copy.headline).toBe("Your link is getting attention");
    expect(copy.body).toContain("14 clicks");
    expect(copy.assetContext).toBe("Activity for: Summer campaign");
    expect(copy.primaryCta).toBe("Explore my analytics");
    expect(copy.secondaryAction).toBe("Maybe later");
  });

  it("builds performance-first copy for a QR code", () => {
    const copy = getModalCopy("performance-first", qrScenario);
    expect(copy.headline).toBe("Your QR Code is getting scanned");
    expect(copy.body).toContain("9 scans");
  });

  it("builds trial-first copy for a link", () => {
    const copy = getModalCopy("trial-first", linkScenario);
    expect(copy.eyebrow).toBe("Limited-time access");
    expect(copy.headline).toBe("Try Bitly Analytics free for 7 days");
    expect(copy.body).toContain("14 clicks");
    expect(copy.assetContext).toBe("Based on activity for: Summer campaign");
    expect(copy.primaryCta).toBe("Start exploring");
    expect(copy.secondaryAction).toBe("Not now");
  });

  it("falls back to generic engagement copy when asset info is missing", () => {
    const missingAsset: PrototypeScenario = { ...linkScenario, assetTitle: "" };
    const copy = getModalCopy("performance-first", missingAsset);
    expect(copy.headline).toBe("People are engaging with your content");
    expect(copy.assetContext).toBeNull();
  });
});
