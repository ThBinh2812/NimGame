import { describe, it, expect } from "vitest";
import { getHardMove } from "../hardAI.js";

describe("Hard AI", () => {
  it("Tạo thế Nim-sum = 0 sau nước đi", () => {
    const heaps = [3, 4, 5];
    const move = getHardMove(heaps);

    const newHeaps = [...heaps];
    newHeaps[move.heapIndex] -= move.removeCount;

    const nimSum = newHeaps.reduce((a, b) => a ^ b, 0);
    expect(nimSum).toBe(0);
  });
});
