import { useState, useCallback } from 'react';
import { getDndData, reorderSameColumn, reorderDifferentColumn } from '@/utils/dndUtils';

export const useDnd = (initialItems, initialColumns) => {
  const initialDnd = getDndData(initialItems, initialColumns);
  const [dndData, setDndData] = useState(getDndData(initialItems, initialColumns));

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
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
    [dndData],
  );

  const resetBoard = useCallback(() => {
    setDndData(initialDnd);
  }, [initialDnd]);

  return { dndData, onDragEnd, resetBoard };
};
