import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnalyticsTrialModal } from "../components/modal/AnalyticsTrialModal";
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

function renderModal(overrides: Partial<React.ComponentProps<typeof AnalyticsTrialModal>> = {}) {
  const onClose = vi.fn();
  const onPrimaryAction = vi.fn();
  const props = {
    concept: "performance-first" as const,
    scenario: linkScenario,
    isOpen: true,
    animationKey: 0,
    onClose,
    onPrimaryAction,
    ...overrides,
  };
  const result = render(<AnalyticsTrialModal {...props} />);
  return { onClose, onPrimaryAction, ...result };
}

afterEach(() => {
  cleanup();
});

describe("AnalyticsTrialModal", () => {
  it("does not render dialog content when closed", () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the performance-first headline for a link", () => {
    renderModal({ concept: "performance-first", scenario: linkScenario });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Your link is getting attention")).toBeInTheDocument();
    expect(screen.getByText("Activity for:", { exact: false })).toBeInTheDocument();
  });

  it("shows the performance-first headline for a QR code", () => {
    renderModal({ concept: "performance-first", scenario: qrScenario });
    expect(screen.getByText("Your QR Code is getting scanned")).toBeInTheDocument();
  });

  it("shows the trial-first headline and copy", () => {
    renderModal({ concept: "trial-first", scenario: linkScenario });
    expect(screen.getByText("Try Bitly Analytics free for 7 days")).toBeInTheDocument();
    expect(screen.getByText("Based on activity for:", { exact: false })).toBeInTheDocument();
  });

  it("calls onPrimaryAction when the primary CTA is clicked", async () => {
    const user = userEvent.setup();
    const { onPrimaryAction } = renderModal({ concept: "performance-first" });
    await user.click(screen.getByRole("button", { name: "Explore my analytics" }));
    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the secondary action is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal({ concept: "performance-first" });
    await user.click(screen.getByRole("button", { name: "Maybe later" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("presents a complete, understandable end state when reduced motion is preferred", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;

    const { container } = renderModal({ concept: "performance-first", scenario: linkScenario });

    expect(screen.getByText("14 clicks")).toBeInTheDocument();
    expect(container.innerHTML).not.toContain("animate-chart-draw");

    window.matchMedia = original;
  });
});
