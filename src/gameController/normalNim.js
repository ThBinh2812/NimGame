/**
 * Áp dụng một nước đi và trả về trạng thái mới
 */
export function applyMove(heaps, heapIndex, removeCount) {
  const newHeaps = [...heaps];
  newHeaps[heapIndex] -= removeCount;
  return newHeaps;
}

/**
 * Kiểm tra game đã kết thúc chưa
 */
export function isGameOver(heaps) {
  return heaps.every((h) => h === 0);
}

/**
 * Kiểm tra người vừa đi có thắng không (Nim thường)
 */
export function checkWinnerNormal(heaps, currentPlayer) {
  if (isGameOver(heaps)) {
    return currentPlayer; // người vừa đi thắng
  }
  return null;
}
