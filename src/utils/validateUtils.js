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

export const checkIsItemIntercepting = (selectedItems, itemIds, finishIndex) => {
  const adjacentGroups = findAdjacentGroups(selectedItems, itemIds);

  for (let group of adjacentGroups) {
    const minIndex = group[0];
    const maxIndex = group[group.length - 1];

    if (finishIndex >= minIndex && finishIndex <= maxIndex) {
      return true;
    }
  }

  return false;
};

export const checkIsEvenForMultiReorderingSameCol = (
  column,
  selectedItems,
  startIndex,
  finishIndex,
) => {
  const newItemIds = Array.from(column.itemIds);
  const sortedSelectedItems = selectedItems
    .map((item) => ({ id: item.id, idx: newItemIds.indexOf(item.id) }))
    .sort((a, b) => a.idx - b.idx);

  sortedSelectedItems.forEach((item) => {
    const idx = newItemIds.indexOf(item.id);

    if (idx > -1) {
      newItemIds.splice(idx, 1);
    }
  });

  let adjustedFinishIndex = finishIndex;

  sortedSelectedItems.forEach((item) => {
    if (item.idx < finishIndex) {
      adjustedFinishIndex -= 1;
    }
  });

  if (startIndex < finishIndex) {
    adjustedFinishIndex += 1;
  }

  const lastItemNum = Number(sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1]);
  const targetIdxNum = Number(newItemIds[adjustedFinishIndex]?.split('-')[1]);

  if (lastItemNum % 2 === 0 && targetIdxNum % 2 === 0) {
    return true;
  }

  return false;
};
