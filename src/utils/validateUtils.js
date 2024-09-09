import {
  findAdjacentGroups,
  getNewStartColAndSortedSelectedItems,
  getAdjustedFinishIndex,
} from './commonUtils';

export const checkIsTwoItemsEven = (draggableId, nextItemId) => {
  const draggableItem = Number(draggableId.split('-')[1]);
  const nextItem = Number(nextItemId?.split('-')[1]);

  return draggableItem % 2 === 0 && nextItem % 2 === 0;
};

export const checkIsEvenForReorderingSameCol = (column, startIndex, finishIndex, draggableId) => {
  const columnWithoutDraggedItem = Array.from(column.itemIds);
  columnWithoutDraggedItem.splice(startIndex, 1);
  const nextItem = columnWithoutDraggedItem[finishIndex];
  const isEven = checkIsTwoItemsEven(draggableId, nextItem);

  return isEven;
};

export const checkIsEvenForMultiReorderingSameCol = (
  column,
  selectedItems,
  startIndex,
  finishIndex,
) => {
  const { newColItemIds, sortedSelectedItems } = getNewStartColAndSortedSelectedItems(
    column,
    selectedItems,
  );

  const newFinishIndex = getAdjustedFinishIndex(finishIndex, startIndex, sortedSelectedItems);
  const isEven = checkIsTwoItemsEven(
    sortedSelectedItems[sortedSelectedItems.length - 1].id,
    newColItemIds[newFinishIndex],
  );

  return isEven;
};

export const checkIsEvenForMultiReorderingDifferentCol = (
  startColumn,
  finishColumn,
  selectedItems,
  finishIndex,
) => {
  const newColItemIds = Array.from(startColumn.itemIds);
  const sortedSelectedItems = selectedItems
    .map((item) => ({ id: item.id, idx: newColItemIds.indexOf(item.id) }))
    .sort((a, b) => a.idx - b.idx);

  const isEven = checkIsTwoItemsEven(
    sortedSelectedItems[sortedSelectedItems.length - 1].id,
    finishColumn.itemIds[finishIndex],
  );

  return isEven;
};

export const checkIsItemIntercepting = (selectedItems, itemIds, finishIndex) => {
  const adjacentGroups = findAdjacentGroups(selectedItems, itemIds);

  const isInterCepting = adjacentGroups.some((group) => {
    const minIndex = group[0];
    const maxIndex = group[group.length - 1];

    return finishIndex >= minIndex && finishIndex <= maxIndex;
  });

  return isInterCepting;
};
