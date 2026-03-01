import getEasyMove from "@/aiController/easyAI.js";
import { applyMove, checkWinnerNormal } from "@/gameController/normalNim.js";
import {
  applyMoveMisere,
  checkWinnerMisere,
} from "@/gameController/misereNim.js";
import { getHardMoveNormal, getHardMoveMisere } from "@/aiController/hardAI.js";

/* Rule - Normal Nim */
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

    currentPlayer: currentPlayer === 1 ? 2 : 1,
  };
}

// AI Turn - Easy
export function aiMoveTurnNormalEasy(heaps) {
  const move = getEasyMove(heaps);

  if (!move) return null;

  const newHeaps = applyMove(heaps, move.heapIndex, move.removeCount);

  const w = checkWinnerNormal(newHeaps, 2);

  return {
    heaps: newHeaps.filter((h) => h > 0),

    currentPlayer: w ? null : 1,

    winner: w,
  };
}

// AI Turn - Hard
export function aiMoveTurnNormalHard(heaps) {
  const move = getHardMoveNormal(heaps);

  if (!move) return null;

  const newHeaps = applyMove(heaps, move.heapIndex, move.removeCount);

  const w = checkWinnerNormal(newHeaps, 2);

  return {
    heaps: newHeaps.filter((h) => h > 0),

    currentPlayer: w ? null : 1,

    winner: w,
  };
}

/* Rule - Misere Nim */
// Player Turn
export function playerEndTurnMisere(heaps, selectedMove, currentPlayer) {
  if (!selectedMove) return null;

  const newHeaps = [...heaps];

  const { heapIndex, removeCount } = selectedMove;

  if (removeCount <= 0 || removeCount > newHeaps[heapIndex]) return null;

  newHeaps[heapIndex] -= removeCount;

  const filteredHeaps = newHeaps.filter((h) => h > 0);

  const otherPlayer = currentPlayer === 1 ? 2 : 1;

  const w = checkWinnerMisere(filteredHeaps, currentPlayer, otherPlayer);

  return {
    heaps: filteredHeaps,

    winner: w,

    currentPlayer: w ? null : otherPlayer,
  };
}
// AI Turn - Easy
export function aiMoveTurnMisereEasy(heaps) {
  const move = getEasyMove(heaps);

  if (!move) return null;

  const newHeaps = applyMoveMisere(heaps, move.heapIndex, move.removeCount);

  const w = checkWinnerMisere(newHeaps, 2, 1);

  return {
    heaps: newHeaps.filter((h) => h > 0),

    currentPlayer: w ? null : 1,

    winner: w,
  };
}
// AI Turn - Hard
export function aiMoveTurnMisereHard(heaps) {
  const move = getHardMoveMisere(heaps);

  if (!move) return null;

  const newHeaps = applyMoveMisere(heaps, move.heapIndex, move.removeCount);

  const w = checkWinnerMisere(newHeaps, 2, 1);

  return {
    heaps: newHeaps.filter((h) => h > 0),

    currentPlayer: w ? null : 1,

    winner: w,
  };
}