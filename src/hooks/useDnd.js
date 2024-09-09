import { useState, useCallback } from 'react';
import { getDndData } from '@/utils/dndUtils';
import {
  reorderSameColumn,
  reorderDifferentColumn,
  multiReorderSameColumn,
  multiReorderDifferentColumn,
} from '@/utils/reorderUtils';
import {
  checkIsItemIntercepting,
  checkIsEvenForMultiReorderingSameCol,
  checkIsEvenForMultiReorderingDifferentCol,
  checkIsEvenForReorderingSameCol,
} from '@/utils/validateUtils';

export const useDnd = (initialItems, initialColumns) => {
  const initialDnd = getDndData(initialItems, initialColumns);
  const [dndData, setDndData] = useState(getDndData(initialItems, initialColumns));
  const [selectedItems, setSelectedItems] = useState([]);
  const [invalidLayout, setInvalidLayout] = useState({});
  const [invalidCol, setInvalidCol] = useState(null);

  const onDragUpdate = useCallback(
    (update) => {
      setInvalidCol(null);

      const { destination, source, draggableId } = update;

      if (!destination) {
        setInvalidLayout({});

        return;
      }

      const startColumnIdx = dndData.columnOrder.indexOf(source.droppableId);
      const finishColumnIdx = dndData.columnOrder.indexOf(destination.droppableId);
      const startColumn = dndData.columns[source.droppableId];
      const finishColumn = dndData.columns[destination.droppableId];
      const itemIds = startColumn.itemIds;

      const isMultiDrag =
        selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId);
      const isSameCol = startColumn === finishColumn;
      let isIntercept = false;
      let isInFrontEven = false;

      if (isMultiDrag) {
        if (isSameCol) {
          const isItemInterCepting = checkIsItemIntercepting(
            selectedItems,
            itemIds,
            destination.index,
          );

          if (isItemInterCepting) {
            isIntercept = true;
          }

          const isEven = checkIsEvenForMultiReorderingSameCol(
            startColumn,
            selectedItems,
            source.index,
            destination.index,
          );

          if (isEven) {
            isInFrontEven = true;
          }
        } else {
          const isEven = checkIsEvenForMultiReorderingDifferentCol(
            startColumn,
            finishColumn,
            selectedItems,
            destination.index,
          );

          if (isEven) {
            isInFrontEven = true;
          }
        }
      } else {
        if (isSameCol) {
          const isEven = checkIsEvenForReorderingSameCol(
            startColumn,
            source.index,
            destination.index,
            draggableId,
          );

          if (isEven) {
            isInFrontEven = true;
          }
        } else {
          const isEven =
            Number(draggableId.split('-')[1]) % 2 === 0 &&
            Number(finishColumn.itemIds[destination.index]?.split('-')[1]) % 2 === 0;

          if (isEven) {
            isInFrontEven = true;
          }
        }
      }

      const isFromFirstColToThirdCol = startColumnIdx === 0 && finishColumnIdx === 2;
      const isDraggableIntercepting =
        isIntercept && selectedItems.map((item) => item.id).includes(draggableId);

      if (isFromFirstColToThirdCol || isDraggableIntercepting || isInFrontEven) {
        setInvalidLayout({ draggableId, droppableId: destination.droppableId });
      } else {
        setInvalidLayout({});
      }
    },
    [dndData.columnOrder, dndData.columns, selectedItems],
  );

  const onDragEnd = useCallback(
    (result) => {
      setInvalidLayout({});

      const { destination, source, draggableId } = result;

      if (!destination) return;

      const isFromFirstColToThirdCol =
        source.droppableId === 'column-1' && destination.droppableId === 'column-3';

      if (isFromFirstColToThirdCol) {
        setInvalidCol(destination.droppableId);

        return;
      }

      const startColumn = dndData.columns[source.droppableId];
      const finishColumn = dndData.columns[destination.droppableId];
      const itemIds = startColumn.itemIds;

      const isMultiDrag =
        selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId);
      const isSameCol = startColumn === finishColumn;

      if (isMultiDrag) {
        if (isSameCol) {
          const isItemInterCepting = checkIsItemIntercepting(
            selectedItems,
            itemIds,
            destination.index,
          );

          if (isItemInterCepting) {
            setInvalidCol(destination.droppableId);

            return;
          }

          const isEven = checkIsEvenForMultiReorderingSameCol(
            startColumn,
            selectedItems,
            source.index,
            destination.index,
          );

          if (isEven) {
            setInvalidCol(destination.droppableId);

            return;
          }

          const newColumn = multiReorderSameColumn(
            startColumn,
            selectedItems,
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
          const isEven = checkIsEvenForMultiReorderingDifferentCol(
            startColumn,
            finishColumn,
            selectedItems,
            destination.index,
          );

          if (isEven) {
            setInvalidCol(destination.droppableId);

            return;
          }

          const { newStartColumn, newFinishColumn } = multiReorderDifferentColumn(
            startColumn,
            finishColumn,
            selectedItems,
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
        if (isSameCol) {
          const isEven = checkIsEvenForReorderingSameCol(
            startColumn,
            source.index,
            destination.index,
            draggableId,
          );

          if (isEven) {
            setInvalidCol(destination.droppableId);

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
        } else {
          const isEven =
            Number(draggableId.split('-')[1]) % 2 === 0 &&
            Number(finishColumn.itemIds[destination.index]?.split('-')[1]) % 2 === 0;

          if (isEven) {
            setInvalidCol(destination.droppableId);

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
      }
    },
    [dndData.columns, selectedItems],
  );

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

  const resetBoard = useCallback(() => {
    setDndData(initialDnd);
    setSelectedItems([]);
  }, [initialDnd]);

  return {
    dndData,
    invalidLayout,
    selectedItems,
    handleSelectItem,
    onDragUpdate,
    onDragEnd,
    resetBoard,
    invalidCol,
  };
};
