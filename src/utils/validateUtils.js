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
