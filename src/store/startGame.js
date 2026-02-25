import { isValidMove } from "@/gameController/validator.js";
import getEasyMove from "@/aiController/easyAI.js";
// import { getHardMoveNormal } from "@/aiController/hardAI.js";

import { applyMove, checkWinnerNormal } from "@/gameController/normalNim.js";
import { applyMoveMisere, checkWinnerMisere } from "@/gameController/misereNim.js";

// Player Turn
export function playerEndTurnNormal(heaps, selectedMove, currentPlayer) {
  if (!selectedMove) return null;

  const newHeaps = [...heaps];

  const { heapIndex, removeCount } = selectedMove;

  if (removeCount <= 0 || removeCount > newHeaps[heapIndex]) return null;

  newHeaps[heapIndex] -= removeCount;

  // remove pile = 0
  const filteredHeaps = newHeaps.filter((h) => h > 0);

  // check win
  if (filteredHeaps.length === 0) {
    return {
      heaps: [],
      winner: currentPlayer,
      currentPlayer: null,
    };
  }

  return {
    heaps: filteredHeaps,

    winner: null,

    currentPlayer: currentPlayer === "PLAYER" ? "AI" : "PLAYER",
  };
}

// AI Turn - Easy
export function aiMoveTurnNormal(heaps) {
  const move = getEasyMove(heaps);

  if (!move) return null;

  const newHeaps = applyMove(heaps, move.heapIndex, move.removeCount);

  const w = checkWinnerNormal(newHeaps, "AI");

  return {
    heaps: newHeaps.filter(h=>h>0),

    currentPlayer: w ? "END" : "PLAYER",

    winner: w,
  };
}