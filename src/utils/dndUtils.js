export const getDndData = (itemCnt, columnCnt) => {
  const dndData = {
    items: {},
    columns: {},
    columnOrder: [],
  };

  for (let i = 1; i <= itemCnt; i++) {
    const itemId = `item-${i}`;
    dndData.items[itemId] = {
      id: itemId,
      content: `item ${i}`,
    };
  }

  const halfItemCount = Math.ceil(itemCnt / 2);

  for (let j = 1; j <= columnCnt; j++) {
    const columnId = `column-${j}`;
    let itemIds = [];
    if (j === 1) {
      itemIds = Object.keys(dndData.items).slice(0, halfItemCount);
    } else if (j === 2) {
      itemIds = Object.keys(dndData.items).slice(halfItemCount);
    }

    dndData.columns[columnId] = {
      id: columnId,
      title: `Column ${j}`,
      itemIds: itemIds,
    };

    dndData.columnOrder.push(columnId);
  }

  return dndData;
};

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
  const newItemIds = Array.from(column.itemIds);
  const sortedSelectedItems = selectedItems
    .map((itemId) => ({ id: itemId, idx: newItemIds.indexOf(itemId) }))
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

  newItemIds.splice(adjustedFinishIndex, 0, ...sortedSelectedItems.map((item) => item.id));

  const newColumn = {
    ...column,
    itemIds: newItemIds,
  };

  return newColumn;
};

export const multiReorderDifferentColumn = (
  startColumn,
  finishColumn,
  selectedItems,
  finishIndex,
) => {
  const startColumnItemIds = Array.from(startColumn.itemIds);
  const sortedSelectedItems = selectedItems
    .map((itemId) => ({ id: itemId, idx: startColumnItemIds.indexOf(itemId) }))
    .sort((a, b) => a.idx - b.idx);

  sortedSelectedItems.forEach((item) => {
    const idx = startColumnItemIds.indexOf(item.id);

    if (idx > -1) {
      startColumnItemIds.splice(idx, 1);
    }
  });

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
