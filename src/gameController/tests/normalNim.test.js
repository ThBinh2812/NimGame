import { describe, it, expect } from "vitest";
import { applyMove, isGameOver } from "../normalNim.js";

describe("Normal Nim Logic", () => {
  it("Áp dụng nước đi đúng", () => {
    const heaps = [3, 4, 5];
    const newHeaps = applyMove(heaps, 1, 2);
    expect(newHeaps).toEqual([3, 2, 5]);
  });

  it("Game chưa kết thúc", () => {
    expect(isGameOver([0, 1, 0])).toBe(false);
  });

  it("Game kết thúc khi mọi heap = 0", () => {
    expect(isGameOver([0, 0, 0])).toBe(true);
  });
});
