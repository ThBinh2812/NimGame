import { describe, it, expect } from "vitest";
import { isValidMove } from "../validator.js";

describe("Validator - isValidMove", () => {
  it("Nước đi hợp lệ", () => {
    const heaps = [3, 4, 5];
    expect(isValidMove(heaps, 1, 2)).toBe(true);
  });

  it("Heap index không hợp lệ", () => {
    const heaps = [3, 4, 5];
    expect(isValidMove(heaps, 5, 1)).toBe(false);
  });

  it("Lấy quá số sỏi trong heap", () => {
    const heaps = [3, 4, 5];
    expect(isValidMove(heaps, 0, 10)).toBe(false);
  });

  it("Số sỏi lấy <= 0", () => {
    const heaps = [3, 4, 5];
    expect(isValidMove(heaps, 2, 0)).toBe(false);
  });
});
