import { describe, it, expect } from "vitest";
import { checkWinner } from "../misereNim.js";

describe("Misère Nim", () => {
  it("Người bốc cuối sẽ thua", () => {
    const heaps = [0, 0, 0];
    const winner = checkWinner(heaps, "AI", "Player");
    expect(winner).toBe("Player");
  });
});
