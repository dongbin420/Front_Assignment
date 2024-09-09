import { getNewStartColAndSortedSelectedItems } from './commonUtils';

export const reorderSameColumn = (column, startIndex, finishIndex) => {
  const newItemIds = Array.from(column.itemIds);
  const [removed] = newItemIds.splice(startIndex, 1);
  newItemIds.splice(finishIndex, 0, removed);

  const newColumn = {
    ...column,
    itemIds: newItemIds,
  };

  return newColumn;
};

export const reorderDifferentColumn = (startColumn, finishColumn, startIndex, finishIndex) => {
  const startColumnItemIds = Array.from(startColumn.itemIds);
  const [removed] = startColumnItemIds.splice(startIndex, 1);

  const newStartColumn = {
    ...startColumn,
    itemIds: startColumnItemIds,
  };

  const finishColumnItemIds = Array.from(finishColumn.itemIds);
  finishColumnItemIds.splice(finishIndex, 0, removed);

  const newFinishColumn = {
    ...finishColumn,
    itemIds: finishColumnItemIds,
  };

  return { newStartColumn, newFinishColumn };
};

export const multiReorderSameColumn = (column, selectedItems, finishIndex, startIndex) => {
  const { newColItemIds, sortedSelectedItems } = getNewStartColAndSortedSelectedItems(
    column,
    selectedItems,
  );

  let adjustedFinishIndex = finishIndex;

  sortedSelectedItems.forEach((item) => {
    if (item.idx < finishIndex) {
      adjustedFinishIndex -= 1;
    }
  });

  if (startIndex < finishIndex) {
    adjustedFinishIndex += 1;
  }

  newColItemIds.splice(adjustedFinishIndex, 0, ...sortedSelectedItems.map((item) => item.id));

  const newColumn = {
    ...column,
    itemIds: newColItemIds,
  };

  return newColumn;
};

export const multiReorderDifferentColumn = (
  startColumn,
  finishColumn,
  selectedItems,
  finishIndex,
) => {
  const { newColItemIds: startColumnItemIds, sortedSelectedItems } =
    getNewStartColAndSortedSelectedItems(startColumn, selectedItems);

  const newStartColumn = {
    ...startColumn,
    itemIds: startColumnItemIds,
  };

  const finishColumnItemIds = Array.from(finishColumn.itemIds);
  finishColumnItemIds.splice(finishIndex, 0, ...sortedSelectedItems.map((item) => item.id));

  const newFinishColumn = {
    ...finishColumn,
    itemIds: finishColumnItemIds,
  };

  return { newStartColumn, newFinishColumn };
};
