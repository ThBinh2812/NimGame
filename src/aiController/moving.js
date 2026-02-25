import { getEasyMove } from "./easyAI.js";
import { getHardMoveNormal, getHardMoveMisere } from "./hardAI.js";

/**
 * Lấy nước đi của AI
 * @param {'easy' | 'hard'} level
 * @param {number[]} heaps
 */
export function getAIMove(level, mode, heaps) {
  switch (level) {

    case "easy":
      return getEasyMove(heaps);

    case "hard":
      if(mode === "normal") return getHardMoveNormal(heaps);
      if(mode === "misere") return getHardMoveMisere(heaps);
      throw new Error("Mode không hợp lệ");

    default:
      throw new Error("AI không hợp lệ");
  }
}
