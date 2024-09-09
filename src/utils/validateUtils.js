import {
  findAdjacentGroups,
  getNewStartColAndSortedSelectedItems,
  getAdjustedFinishIndex,
} from './commonUtils';

export const checkIsEvenForReorderingSameCol = (column, startIndex, finishIndex, draggableId) => {
  const columnWithoutDraggedItem = Array.from(column.itemIds);
  columnWithoutDraggedItem.splice(startIndex, 1);
  const nextItem = columnWithoutDraggedItem[finishIndex];
  const isEven =
    Number(draggableId.split('-')[1]) % 2 === 0 && Number(nextItem?.split('-')[1]) % 2 === 0;

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
  const lastItemNum = Number(sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1]);
  const targetIdxNum = Number(newColItemIds[newFinishIndex]?.split('-')[1]);
  const isEven = lastItemNum % 2 === 0 && targetIdxNum % 2 === 0;

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

  const lastItemNum = Number(sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1]);
  const targetIdxNum = Number(finishColumn.itemIds[finishIndex]?.split('-')[1]);
  const isEven = lastItemNum % 2 === 0 && targetIdxNum % 2 === 0;

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
