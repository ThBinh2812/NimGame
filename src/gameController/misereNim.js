/**
 * Áp dụng nước đi (giống Nim thường)
 */
export function applyMoveMisere(heaps, heapIndex, removeCount) {
  const newHeaps = [...heaps];
  newHeaps[heapIndex] -= removeCount;
  return newHeaps;
}

/**
 * Kiểm tra game kết thúc
 */
export function isGameOver(heaps) {
  return heaps.every((h) => h === 0);
}

/**
 * Kiểm tra thắng/thua trong Misère Nim
 * @param {number[]} heaps
 * @param {string} currentPlayer - người vừa đi
 * @param {string} otherPlayer - người còn lại
 */
export function checkWinnerMisere(heaps, currentPlayer, otherPlayer) {
  if (isGameOver(heaps)) {
    return otherPlayer; // người vừa đi thua
  }
  return null;
}
