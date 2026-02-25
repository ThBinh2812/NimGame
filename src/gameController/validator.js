/**
 * Kiểm tra một nước đi có hợp lệ hay không
 * @param {number[]} heaps - Mảng các đống sỏi
 * @param {number} heapIndex - Chỉ số đống được chọn
 * @param {number} removeCount - Số sỏi muốn lấy
 * @returns {boolean}
 */
export function isValidMove(heaps, heapIndex, removeCount) {
  // Kiểm tra tính hợp lệ của tham số đầu vào
  if (!Array.isArray(heaps)) return false;
  if (!heaps.every((h) => Number.isInteger(h) && h >= 0)) return false;

  // Kiểm tra tính hợp lệ của heapIndex và removeCount
  if (!Number.isInteger(heapIndex)) return false;
  if (!Number.isInteger(removeCount)) return false;

  // Kiểm tra giới hạn của heapIndex và removeCount
  if (heapIndex < 0 || heapIndex >= heaps.length) return false;
  if (removeCount <= 0 || removeCount > heaps[heapIndex]) return false;

  return true;
}
