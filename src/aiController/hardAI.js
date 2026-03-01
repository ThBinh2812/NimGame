/**
 * Tính nim-sum
 */
function nimSum(heaps) {
  return heaps.reduce((sum, h) => sum ^ h, 0);
}

/**
 * AI khó: chọn nước đi tối ưu
 */
export function getHardMoveNormal(heaps) {
  const xor = nimSum(heaps);

  // Nếu đang ở thế thua -> đi random
  if (xor === 0) {
    const nonEmpty = heaps.map((h, i) => ({ h, i })).filter((x) => x.h > 0);

    const heap = nonEmpty[Math.floor(Math.random() * nonEmpty.length)];
    return {
      heapIndex: heap.i,
      removeCount: 1,
    };
  }

  // Tìm nước đi tối ưu
  for (let i = 0; i < heaps.length; i++) {
    const target = heaps[i] ^ xor;
    if (target < heaps[i]) {
      return {
        heapIndex: i,
        removeCount: heaps[i] - target,
      };
    }
  }

  // fallback (không nên xảy ra)
  return {
    heapIndex: 0,
    removeCount: 1,
  };
}

// AI khó: MisereMode
export function getHardMoveMisere(heaps) {
  const nonOnes = heaps.filter((h) => h > 1).length;
  if(nonOnes === 1) {
    const oneHeap = heaps.filter((h) => h === 1).length;
    if(oneHeap % 2 === 0) {
      // Chuyển tất cả về 1
      const heapIndex = heaps.findIndex((h) => h > 1);
      return {
        heapIndex,
        removeCount: heaps[heapIndex] - 1,
      };
    } else {
      // Chuyển tất cả về 0
      const heapIndex = heaps.findIndex((h) => h > 1);
      return {
        heapIndex,
        removeCount: heaps[heapIndex],
      };
    }
  }  

  if(nonOnes > 1) {
    return getHardMoveNormal(heaps);
  }

  return {
    heapIndex: heaps.findIndex((h) => h === 1),
    removeCount: 1,
  }
}
