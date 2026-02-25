/**
 * AI dễ: chọn nước đi ngẫu nhiên hợp lệ
 */
export default function getEasyMove(heaps) {
  const nonEmptyHeaps = heaps.map((h, i) => ({ h, i })).filter((x) => x.h > 0);

  const chosenHeap =
    nonEmptyHeaps[Math.floor(Math.random() * nonEmptyHeaps.length)];

  const removeCount = Math.floor(Math.random() * chosenHeap.h) + 1;

  return {
    heapIndex: chosenHeap.i,
    removeCount,
  };
}
