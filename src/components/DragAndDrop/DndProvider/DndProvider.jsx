import { useState, useCallback, createContext } from 'react';
import { getItems, reorder } from '@/utils/dndUtils';

export const DndContext = createContext();

export function DndProvider({ children }) {
  const [items, setItems] = useState(getItems(10));

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const newItems = reorder(items, result.source.index, result.destination.index);

      setItems(newItems);
    },
    [items],
  );

  return <DndContext.Provider value={{ items, onDragEnd }}>{children}</DndContext.Provider>;
}

export default DndProvider;
