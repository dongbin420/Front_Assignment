export const findAdjacentGroups = (selectedItems, itemIds) => {
  const indices = selectedItems.map((item) => itemIds.indexOf(item.id)).sort((a, b) => a - b);
  let adjacentGroups = [];
  let currentGroup = [indices[0]];

  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === indices[i - 1] + 1) {
      currentGroup.push(indices[i]);
    } else {
      if (currentGroup.length >= 2) {
        adjacentGroups.push([...currentGroup]);
      }
      currentGroup = [indices[i]];
    }
  }

  if (currentGroup.length >= 2) {
    adjacentGroups.push([...currentGroup]);
  }

  return adjacentGroups;
};

export const getNewStartColAndSortedSelectedItems = (startColumn, selectedItems) => {
  const newColItemIds = Array.from(startColumn.itemIds);
  const sortedSelectedItems = selectedItems
    .map((item) => ({ id: item.id, idx: newColItemIds.indexOf(item.id) }))
    .sort((a, b) => a.idx - b.idx);

  sortedSelectedItems.forEach((item) => {
    const idx = newColItemIds.indexOf(item.id);

    if (idx > -1) {
      newColItemIds.splice(idx, 1);
    }
  });

  return { newColItemIds, sortedSelectedItems };
};

export const getAdjustedFinishIndex = (finishIndex, startIndex, sortedSelectedItems) => {
  let adjustedFinishIndex = finishIndex;

  sortedSelectedItems.forEach((item) => {
    if (item.idx < finishIndex) {
      adjustedFinishIndex -= 1;
    }
  });

  if (startIndex < finishIndex) {
    adjustedFinishIndex += 1;
  }

  return adjustedFinishIndex;
};
