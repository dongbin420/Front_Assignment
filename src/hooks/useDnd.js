import { useState, useCallback } from 'react';
import {
  getDndData,
  reorderSameColumn,
  reorderDifferentColumn,
  multiReorderSameColumn,
  multiReorderDifferentColumn,
} from '@/utils/dndUtils';

export const useDnd = (initialItems, initialColumns) => {
  const initialDnd = getDndData(initialItems, initialColumns);
  const [dndData, setDndData] = useState(getDndData(initialItems, initialColumns));
  const [invalidItem, setInvalidItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = useCallback(
    (itemId, columnId, event) => {
      if (event.ctrlKey) {
        setSelectedItems((prevSelected) => {
          if (selectedItems.some((item) => item.id === itemId)) {
            return prevSelected.filter((item) => item.id !== itemId);
          }

          if (selectedItems.length === 0 || selectedItems[0].columnId === columnId) {
            return [...prevSelected, { id: itemId, columnId }];
          }

          return prevSelected;
        });
      }
    },
    [selectedItems],
  );

  const findAdjacentGroups = (selectedItems, itemIds) => {
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

  const onDragUpdate = useCallback(
    (update) => {
      const { destination, source, draggableId } = update;

      if (!destination) {
        setInvalidItem(null);

        return;
      }

      const startColumnIdx = dndData.columnOrder.indexOf(source.droppableId);
      const finishColumnIdx = dndData.columnOrder.indexOf(destination.droppableId);
      const startColumn = dndData.columns[source.droppableId];
      const itemIds = startColumn.itemIds;
      let isIntercept = false;

      if (finishColumnIdx === startColumnIdx) {
        const adjacentGroups = findAdjacentGroups(selectedItems, itemIds);

        for (let group of adjacentGroups) {
          const minIndex = group[0];
          const maxIndex = group[group.length - 1];
          if (destination.index >= minIndex && destination.index <= maxIndex) {
            isIntercept = true;
          }
        }
      }

      if ((finishColumnIdx === 2 && startColumnIdx === 0) || isIntercept) {
        setInvalidItem(draggableId);
      } else {
        setInvalidItem(null);
      }
    },
    [dndData.columnOrder, dndData.columns, selectedItems],
  );

  const onDragEnd = useCallback(
    (result) => {
      setInvalidItem(null);
      const { destination, source, draggableId } = result;

      if (!destination) return;

      if (source.droppableId === 'column-1' && destination.droppableId === 'column-3') {
        return;
      }

      const startColumn = dndData.columns[source.droppableId];
      const finishColumn = dndData.columns[destination.droppableId];
      const itemIds = startColumn.itemIds;

      if (selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId)) {
        if (startColumn === finishColumn) {
          const adjacentGroups = findAdjacentGroups(selectedItems, itemIds);

          for (let group of adjacentGroups) {
            const minIndex = group[0];
            const maxIndex = group[group.length - 1];
            if (destination.index >= minIndex && destination.index <= maxIndex) {
              return;
            }
          }

          const newColumn = multiReorderSameColumn(
            startColumn,
            selectedItems.map((item) => item.id),
            destination.index,
            source.index,
          );

          setDndData((prevDatas) => ({
            ...prevDatas,
            columns: {
              ...prevDatas.columns,
              [newColumn.id]: newColumn,
            },
          }));
        } else {
          const { newStartColumn, newFinishColumn } = multiReorderDifferentColumn(
            startColumn,
            finishColumn,
            selectedItems.map((item) => item.id),
            destination.index,
          );

          setDndData((prevDatas) => ({
            ...prevDatas,
            columns: {
              ...prevDatas.columns,
              [newStartColumn.id]: newStartColumn,
              [newFinishColumn.id]: newFinishColumn,
            },
          }));
        }

        setSelectedItems([]);
      } else {
        if (startColumn === finishColumn) {
          const newColumn = reorderSameColumn(startColumn, source.index, destination.index);

          setDndData((prevDatas) => ({
            ...prevDatas,
            columns: {
              ...prevDatas.columns,
              [newColumn.id]: newColumn,
            },
          }));

          return;
        }

        const { newStartColumn, newFinishColumn } = reorderDifferentColumn(
          startColumn,
          finishColumn,
          source.index,
          destination.index,
        );

        setDndData((prevDatas) => ({
          ...prevDatas,
          columns: {
            ...prevDatas.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        }));
      }
    },
    [dndData.columns, selectedItems],
  );

  const resetBoard = useCallback(() => {
    setDndData(initialDnd);
    setSelectedItems([]);
  }, [initialDnd]);

  return {
    dndData,
    invalidItem,
    selectedItems,
    handleSelectItem,
    onDragUpdate,
    onDragEnd,
    resetBoard,
  };
};
