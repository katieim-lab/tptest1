import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

afterEach(() => {
  cleanup();
});

/**
 * The modal is a true Radix dialog (focus-trapped, background hidden from
 * assistive tech) so while it's open Radix marks the toolbar aria-hidden —
 * matching how the real product modal would behave. A sighted reviewer can
 * still click it with a mouse, which `{ hidden: true }` button queries below
 * simulate. Once the modal closes, the toolbar is fully reachable through
 * normal (non-hidden) queries and real keyboard navigation.
 */
function getToolbar() {
  return screen.getByTestId("prototype-toolbar");
}

describe("App", () => {
  it("opens the modal automatically on load with the default scenario", () => {
    render(<App />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Your link is getting attention")).toBeInTheDocument();
    expect(within(dialog).getByText("14 clicks")).toBeInTheDocument();
  });

  it("hides the toolbar from assistive tech while the modal is open", () => {
    render(<App />);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(getToolbar()).toHaveAttribute("aria-hidden", "true");
  });

  it("switches concepts instantly via the toolbar while the modal is open", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toolbar = getToolbar();

    await user.click(
      within(toolbar).getByRole("button", { name: "Option B: Trial first", hidden: true }),
    );

    expect(screen.getByText("Try Bitly Analytics free for 7 days")).toBeInTheDocument();
  });

  it("switches scenarios instantly via the toolbar while the modal is open", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toolbar = getToolbar();

    await user.click(
      within(toolbar).getByRole("button", { name: "QR Code · 9 scans", hidden: true }),
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Your QR Code is getting scanned")).toBeInTheDocument();
    expect(within(dialog).getByText("9 scans")).toBeInTheDocument();
  });

  it("closes the modal from the toolbar, then reopens it with full keyboard access", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toolbar = getToolbar();

    await user.click(within(toolbar).getByRole("button", { name: "Close modal", hidden: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getToolbar()).not.toHaveAttribute("aria-hidden", "true");

    const reopenButton = screen.getByRole("button", { name: "Reopen modal" });
    reopenButton.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("disables replay while the modal is closed", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toolbar = getToolbar();

    await user.click(within(toolbar).getByRole("button", { name: "Close modal", hidden: true }));

    expect(screen.getByRole("button", { name: "Replay animation" })).toBeDisabled();
  });

  it("navigates to the mock Analytics destination via the primary CTA", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Explore my analytics" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText("Analytics overview (prototype data)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to home" })).toBeInTheDocument();
  });

  it("toggles the mobile viewport preview via the toolbar", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toolbar = getToolbar();

    const mobileButton = within(toolbar).getByRole("button", { name: "Mobile", hidden: true });
    await user.click(mobileButton);
    expect(mobileButton).toHaveAttribute("aria-pressed", "true");
  });
});
