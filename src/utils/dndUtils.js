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
