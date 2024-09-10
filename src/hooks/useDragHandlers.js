import { useCallback } from 'react';
import {
  reorderSameColumn,
  reorderDifferentColumn,
  multiReorderSameColumn,
  multiReorderDifferentColumn,
} from '@/utils/reorderUtils';
import {
  checkIsTwoItemsEven,
  checkIsItemIntercepting,
  checkIsEvenForMultiReorderingSameCol,
  checkIsEvenForMultiReorderingDifferentCol,
  checkIsEvenForReorderingSameCol,
} from '@/utils/validateUtils';

export const useDragHandlers = (
  dndData,
  selectedItems,
  setDndData,
  setInvalidLayout,
  setInvalidCol,
  setSelectedItems,
) => {
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
      const isMultiDrag =
        selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId);
      const isSameCol = startColumn === finishColumn;
      let isIntercept = false;
      let isInFrontEven = false;

      if (isMultiDrag) {
        if (isSameCol) {
          isIntercept = checkIsItemIntercepting(
            selectedItems,
            startColumn.itemIds,
            destination.index,
          );
          isInFrontEven = checkIsEvenForMultiReorderingSameCol(
            startColumn,
            selectedItems,
            source.index,
            destination.index,
          );
        } else {
          isInFrontEven = checkIsEvenForMultiReorderingDifferentCol(
            startColumn,
            finishColumn,
            selectedItems,
            destination.index,
          );
        }
      } else {
        if (isSameCol) {
          isInFrontEven = checkIsEvenForReorderingSameCol(
            startColumn,
            source.index,
            destination.index,
            draggableId,
          );
        } else {
          isInFrontEven = checkIsTwoItemsEven(draggableId, finishColumn.itemIds[destination.index]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const isMultiDrag =
        selectedItems.length > 0 && selectedItems.map((item) => item.id).includes(draggableId);
      const isSameCol = startColumn === finishColumn;

      if (isMultiDrag) {
        if (isSameCol) {
          const isItemIntercepting = checkIsItemIntercepting(
            selectedItems,
            startColumn.itemIds,
            destination.index,
          );

          if (isItemIntercepting) {
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
          const isEven = checkIsTwoItemsEven(draggableId, finishColumn.itemIds[destination.index]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dndData.columns, selectedItems],
  );

  return { onDragUpdate, onDragEnd };
};
