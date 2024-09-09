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
