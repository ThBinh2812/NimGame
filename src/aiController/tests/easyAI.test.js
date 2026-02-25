import { describe, it, expect } from "vitest";
import { getEasyMove } from "../easyAI.js";
import { isValidMove } from "../../gameController/validator.js";

describe("Easy AI", () => {
  it("Luôn trả về nước đi hợp lệ", () => {
    const heaps = [3, 4, 5];
    const move = getEasyMove(heaps);

    expect(isValidMove(heaps, move.heapIndex, move.removeCount)).toBe(true);
  });
});
