import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function freshIsRateLimited() {
  vi.resetModules();
  const mod = await import("@/lib/rateLimit");
  return mod.isRateLimited;
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isRateLimited", () => {
  it("allows the first 3 requests in a window, blocks the 4th", async () => {
    const isRateLimited = await freshIsRateLimited();

    expect(isRateLimited("1.2.3.4")).toBe(false);
    expect(isRateLimited("1.2.3.4")).toBe(false);
    expect(isRateLimited("1.2.3.4")).toBe(false);
    expect(isRateLimited("1.2.3.4")).toBe(true);
  });

  it("tracks keys independently", async () => {
    const isRateLimited = await freshIsRateLimited();

    for (let i = 0; i < 4; i++) isRateLimited("1.2.3.4");

    expect(isRateLimited("5.6.7.8")).toBe(false);
  });

  it("resets after the window passes", async () => {
    const isRateLimited = await freshIsRateLimited();

    for (let i = 0; i < 4; i++) isRateLimited("1.2.3.4");
    vi.advanceTimersByTime(61 * 1000);

    expect(isRateLimited("1.2.3.4")).toBe(false);
  });
});
