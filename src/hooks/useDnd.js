import { useState, useCallback } from 'react';
import { getDndData, reorderSameColumn, reorderDifferentColumn } from '@/utils/dndUtils';

export const useDnd = (initialItems, initialColumns) => {
  const initialDnd = getDndData(initialItems, initialColumns);
  const [dndData, setDndData] = useState(getDndData(initialItems, initialColumns));
  const [invalidItem, setInvalidItem] = useState(null);

  const onDragUpdate = useCallback(
    (update) => {
      const { destination, source, draggableId } = update;

      if (!destination) {
        setInvalidItem(null);

        return;
      }

      const startColumnIdx = dndData.columnOrder.indexOf(source.droppableId);
      const finishColumnIdx = dndData.columnOrder.indexOf(destination.droppableId);

      if (finishColumnIdx === 2 && startColumnIdx === 0) {
        setInvalidItem(draggableId);
      } else {
        setInvalidItem(null);
      }
    },
    [dndData.columnOrder],
  );

  const onDragEnd = useCallback(
    (result) => {
      setInvalidItem(null);
      const { destination, source } = result;

      if (!destination) return;

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      if (source.droppableId === 'column-1' && destination.droppableId === 'column-3') {
        return;
      }

      const startColumn = dndData.columns[source.droppableId];
      const finishColumn = dndData.columns[destination.droppableId];

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
    },
    [dndData.columns],
  );

  const resetBoard = useCallback(() => {
    setDndData(initialDnd);
  }, [initialDnd]);

  return { dndData, invalidItem, onDragUpdate, onDragEnd, resetBoard };
};
