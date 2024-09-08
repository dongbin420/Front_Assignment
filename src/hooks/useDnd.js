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
  const [impossibleCol, setImpossibleCol] = useState(null);

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
      setImpossibleCol(null);
      const { destination, source, draggableId } = update;

      if (!destination) {
        setInvalidItem(null);

        return;
      }

      const startColumnIdx = dndData.columnOrder.indexOf(source.droppableId);
      const finishColumnIdx = dndData.columnOrder.indexOf(destination.droppableId);
      const startColumn = dndData.columns[source.droppableId];
      const finishColumn = dndData.columns[destination.droppableId];
      const itemIds = startColumn.itemIds;
      let isIntercept = false;
      let isInFrontEven = false;

      if (selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId)) {
        if (startColumn === finishColumn) {
          const adjacentGroups = findAdjacentGroups(selectedItems, itemIds);

          for (let group of adjacentGroups) {
            const minIndex = group[0];
            const maxIndex = group[group.length - 1];
            if (destination.index >= minIndex && destination.index <= maxIndex) {
              isIntercept = true;

              break;
            }
          }

          // 다중 드래그에서, 같은 컬럼일 때, 짝수 확인 로직
          const newItemIds = Array.from(startColumn.itemIds);
          const sortedSelectedItems = selectedItems
            .map((item) => ({ id: item.id, idx: newItemIds.indexOf(item.id) }))
            .sort((a, b) => a.idx - b.idx);

          sortedSelectedItems.forEach((item) => {
            const idx = newItemIds.indexOf(item.id);

            if (idx > -1) {
              newItemIds.splice(idx, 1);
            }
          });

          let adjustedFinishIndex = destination.index;

          sortedSelectedItems.forEach((item) => {
            if (item.idx < destination.index) {
              adjustedFinishIndex -= 1;
            }
          });

          if (source.index < destination.index) {
            adjustedFinishIndex += 1;
          }

          const lastItemNum = Number(
            sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1],
          );
          const targetIdxNum = Number(newItemIds[adjustedFinishIndex]?.split('-')[1]);

          if (lastItemNum % 2 === 0 && targetIdxNum % 2 === 0) {
            isInFrontEven = true;
          }
        } else {
          // 다중 드래그에서, 다른 컬럼일 때, 짝수 확인 로직
          const newItemIds = Array.from(startColumn.itemIds);
          const sortedSelectedItems = selectedItems
            .map((item) => ({ id: item.id, idx: newItemIds.indexOf(item.id) }))
            .sort((a, b) => a.idx - b.idx);

          const lastItemNum = Number(
            sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1],
          );
          const targetIdxNum = Number(finishColumn.itemIds[destination.index]?.split('-')[1]);

          if (lastItemNum % 2 === 0 && targetIdxNum % 2 === 0) {
            isInFrontEven = true;
          }
        }
      } else {
        if (finishColumnIdx === startColumnIdx) {
          const columnWithoutDraggedItem = Array.from(startColumn.itemIds);
          columnWithoutDraggedItem.splice(source.index, 1);
          const nextItem = columnWithoutDraggedItem[destination.index];

          if (
            Number(draggableId.split('-')[1]) % 2 === 0 &&
            Number(nextItem?.split('-')[1]) % 2 === 0
          ) {
            isInFrontEven = true;
          }
        } else {
          if (
            Number(draggableId.split('-')[1]) % 2 === 0 &&
            Number(finishColumn.itemIds[destination.index]?.split('-')[1]) % 2 === 0
          ) {
            isInFrontEven = true;
          }
        }
      }

      if (
        (finishColumnIdx === 2 && startColumnIdx === 0) ||
        (isIntercept && selectedItems.map((item) => item.id).includes(draggableId)) ||
        isInFrontEven
      ) {
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
        setImpossibleCol(destination.droppableId);

        return;
      }

      const startColumn = dndData.columns[source.droppableId];
      const finishColumn = dndData.columns[destination.droppableId];
      const itemIds = startColumn.itemIds;

      if (selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId)) {
        if (startColumn === finishColumn) {
          // 다중 드래그에서, 같은 컬럼일 때, 짝수 확인 로직 들어갈 자리
          const newItemIds = Array.from(startColumn.itemIds);
          const sortedSelectedItems = selectedItems
            .map((item) => ({ id: item.id, idx: newItemIds.indexOf(item.id) }))
            .sort((a, b) => a.idx - b.idx);

          sortedSelectedItems.forEach((item) => {
            const idx = newItemIds.indexOf(item.id);

            if (idx > -1) {
              newItemIds.splice(idx, 1);
            }
          });

          let adjustedFinishIndex = destination.index;

          sortedSelectedItems.forEach((item) => {
            if (item.idx < destination.index) {
              adjustedFinishIndex -= 1;
            }
          });

          if (source.index < destination.index) {
            adjustedFinishIndex += 1;
          }

          const lastItemNum = Number(
            sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1],
          );
          const targetIdxNum = Number(newItemIds[adjustedFinishIndex]?.split('-')[1]);

          if (lastItemNum % 2 === 0 && targetIdxNum % 2 === 0) {
            setImpossibleCol(destination.droppableId);

            return;
          }

          const adjacentGroups = findAdjacentGroups(selectedItems, itemIds);

          for (let group of adjacentGroups) {
            const minIndex = group[0];
            const maxIndex = group[group.length - 1];
            if (destination.index >= minIndex && destination.index <= maxIndex) {
              setImpossibleCol(destination.droppableId);

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
          // 다중 드래그에서, 다른 컬럼일 때, 짝수 확인 로직 들어갈 자리
          const newItemIds = Array.from(startColumn.itemIds);
          const sortedSelectedItems = selectedItems
            .map((item) => ({ id: item.id, idx: newItemIds.indexOf(item.id) }))
            .sort((a, b) => a.idx - b.idx);

          const lastItemNum = Number(
            sortedSelectedItems[sortedSelectedItems.length - 1].id.split('-')[1],
          );
          const targetIdxNum = Number(finishColumn.itemIds[destination.index]?.split('-')[1]);

          if (lastItemNum % 2 === 0 && targetIdxNum % 2 === 0) {
            setImpossibleCol(destination.droppableId);

            return;
          }

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
          const columnWithoutDraggedItem = Array.from(startColumn.itemIds);
          columnWithoutDraggedItem.splice(source.index, 1);
          const nextItem = columnWithoutDraggedItem[destination.index];

          if (
            Number(draggableId.split('-')[1]) % 2 === 0 &&
            Number(nextItem?.split('-')[1]) % 2 === 0
          ) {
            setImpossibleCol(destination.droppableId);

            return;
          }

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

        if (
          Number(draggableId.split('-')[1]) % 2 === 0 &&
          Number(finishColumn.itemIds[destination.index]?.split('-')[1]) % 2 === 0
        ) {
          setImpossibleCol(destination.droppableId);

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
    impossibleCol,
  };
};
